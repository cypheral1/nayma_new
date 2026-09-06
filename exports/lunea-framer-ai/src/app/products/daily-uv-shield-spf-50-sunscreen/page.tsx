import type { Metadata } from "next";
import { ProductsDailyUvShieldSpf50Sunscreen } from "@/components/ProductsDailyUvShieldSpf50Sunscreen";
import { siteAssetUrl, siteJsonLd, siteUrl } from "@/config/site";
import { MotionRuntime } from "@/ui/MotionRuntime";
import {
  motionDefinitions,
  interactionDefinitions,
} from "@/components/ProductsDailyUvShieldSpf50Sunscreen/ProductsDailyUvShieldSpf50Sunscreen/ProductsDailyUvShieldSpf50Sunscreen.motion";

const structuredData: any[] = [];

export const metadata: Metadata = {
  title: "Daily UV Shield SPF 50 Sunscreen - Nayma - Everyday Care. Timeless Confidence",
  description:
    "Advanced skincare made simple. Nayma harnesses science and nature to create effective formulas that repair, protect, and elevate your skin.",
  alternates: { canonical: siteUrl("/products/daily-uv-shield-spf-50-sunscreen") },
  openGraph: {
    title: "Daily UV Shield SPF 50 Sunscreen - Nayma - Everyday Care. Timeless Confidence",
    description:
      "Advanced skincare made simple. Nayma harnesses science and nature to create effective formulas that repair, protect, and elevate your skin.",
    url: siteUrl("/products/daily-uv-shield-spf-50-sunscreen"),
    images: [siteAssetUrl("https://framerusercontent.com/images/Dzs7LaERPdtkGT7X95bSjvPmmtU.jpg")],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily UV Shield SPF 50 Sunscreen - Nayma - Everyday Care. Timeless Confidence",
    description:
      "Advanced skincare made simple. Nayma harnesses science and nature to create effective formulas that repair, protect, and elevate your skin.",
    images: [siteAssetUrl("https://framerusercontent.com/images/Dzs7LaERPdtkGT7X95bSjvPmmtU.jpg")],
  },
};

export default function Page() {
  return (
    <>
      {structuredData.map((value, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: siteJsonLd(value) }}
        />
      ))}
      <ProductsDailyUvShieldSpf50Sunscreen />
      <MotionRuntime definitions={motionDefinitions} interactions={interactionDefinitions} />
    </>
  );
}
