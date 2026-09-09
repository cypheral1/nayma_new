import { revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const secret = process.env.SHOPIFY_REVALIDATION_SECRET;
  const headerList = await headers();
  const authHeader = headerList.get("x-shopify-hmac-sha256") || req.nextUrl.searchParams.get("secret");

  // In production, verify Shopify HMAC or secret parameter
  if (secret && authHeader !== secret && !headerList.get("x-shopify-topic")) {
    return NextResponse.json({ message: "Invalid authorization secret" }, { status: 401 });
  }

  try {
    const topic = headerList.get("x-shopify-topic") || "products";
    console.log(`[Shopify Webhook] Revalidating on topic: ${topic}`);

    // Invalidate product tags
    revalidateTag("products", "max");

    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      topic,
    });
  } catch (err: any) {
    return NextResponse.json({ message: "Error revalidating", error: err.message }, { status: 500 });
  }
}
