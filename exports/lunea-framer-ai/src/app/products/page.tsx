import type { Metadata } from "next";
import { Products } from "@/components/Products";
import { siteAssetUrl, siteJsonLd, siteUrl } from "@/config/site";
import { MotionRuntime } from "@/ui/MotionRuntime";
import {
  motionDefinitions,
  interactionDefinitions,
} from "@/components/Products/Products/Products.motion";

const structuredData: any[] = [];

export const metadata: Metadata = {
  title: "Nayma - Everyday Care. Timeless Confidence",
  description:
    "Advanced skincare made simple. Nayma harnesses science and nature to create effective formulas that repair, protect, and elevate your skin.",
  alternates: { canonical: siteUrl("/products") },
  openGraph: {
    title: "Nayma - Everyday Care. Timeless Confidence",
    description:
      "Advanced skincare made simple. Nayma harnesses science and nature to create effective formulas that repair, protect, and elevate your skin.",
    url: siteUrl("/products"),
    images: [siteAssetUrl("https://framerusercontent.com/images/Dzs7LaERPdtkGT7X95bSjvPmmtU.jpg")],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nayma - Everyday Care. Timeless Confidence",
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
      <Products />
      <MotionRuntime definitions={motionDefinitions} interactions={interactionDefinitions} />
    </>
  );
}
