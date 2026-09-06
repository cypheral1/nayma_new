import type { Metadata } from "next";
import { ProductsHydratingEssenceMist } from "@/components/ProductsHydratingEssenceMist";
import { siteAssetUrl, siteJsonLd, siteUrl } from "@/config/site";
import { MotionRuntime } from "@/ui/MotionRuntime";
import {
  motionDefinitions,
  interactionDefinitions,
} from "@/components/ProductsHydratingEssenceMist/ProductsHydratingEssenceMist/ProductsHydratingEssenceMist.motion";

const structuredData: any[] = [];

export const metadata: Metadata = {
  title: "Hydrating Essence Mist - Nayma - Everyday Care. Timeless Confidence",
  description:
    "Advanced skincare made simple. Nayma harnesses science and nature to create effective formulas that repair, protect, and elevate your skin.",
  alternates: { canonical: siteUrl("/products/hydrating-essence-mist") },
  openGraph: {
    title: "Hydrating Essence Mist - Nayma - Everyday Care. Timeless Confidence",
    description:
      "Advanced skincare made simple. Nayma harnesses science and nature to create effective formulas that repair, protect, and elevate your skin.",
    url: siteUrl("/products/hydrating-essence-mist"),
    images: [siteAssetUrl("https://framerusercontent.com/images/Dzs7LaERPdtkGT7X95bSjvPmmtU.jpg")],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hydrating Essence Mist - Nayma - Everyday Care. Timeless Confidence",
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
      <ProductsHydratingEssenceMist />
      <MotionRuntime definitions={motionDefinitions} interactions={interactionDefinitions} />
    </>
  );
}
