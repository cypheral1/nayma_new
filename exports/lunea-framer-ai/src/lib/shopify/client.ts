const domain = process.env.SHOPIFY_STORE_DOMAIN || "";
const endpoint = domain.startsWith("http")
  ? `${domain}/api/${process.env.SHOPIFY_API_VERSION || "2025-01"}/graphql.json`
  : `https://${domain}/api/${process.env.SHOPIFY_API_VERSION || "2025-01"}/graphql.json`;

const storefrontToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || "";
const adminSecret = process.env.SHOPIFY_API_SECRET || "";

export async function shopifyFetch<T>({
  query,
  variables,
  tags,
  cache = "force-cache",
}: {
  query: string;
  variables?: Record<string, any>;
  tags?: string[];
  cache?: RequestCache;
}): Promise<T> {
  if (!domain || domain.includes("your-store.myshopify.com")) {
    console.warn("[Shopify] Store domain is not configured in .env.local yet.");
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (storefrontToken) {
    headers["X-Shopify-Storefront-Access-Token"] = storefrontToken;
  } else if (adminSecret) {
    headers["X-Shopify-Access-Token"] = adminSecret;
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({ query, variables }),
      cache,
      next: tags ? { tags } : undefined,
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Shopify API HTTP error ${res.status}: ${errorText}`);
    }

    const body = await res.json();
    if (body.errors) {
      throw new Error(body.errors.map((e: any) => e.message).join(", ") || "Shopify GraphQL error");
    }

    return body.data;
  } catch (error: any) {
    console.error("[Shopify Fetch Error]:", error);
    throw error;
  }
}
