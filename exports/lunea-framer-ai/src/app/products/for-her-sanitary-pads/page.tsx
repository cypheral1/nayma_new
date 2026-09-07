import type { Metadata } from "next";
import { ProductsForHerSanitaryPads } from "@/components/ProductsForHerSanitaryPads";
import { siteAssetUrl, siteJsonLd, siteUrl } from "@/config/site";
import { MotionRuntime } from "@/ui/MotionRuntime";
import {
  motionDefinitions,
  interactionDefinitions,
} from "@/components/ProductsForHerSanitaryPads/ProductsForHerSanitaryPads/ProductsForHerSanitaryPads.motion";

const structuredData: any[] = [];

export const metadata: Metadata = {
  title: '"For Her" Sanitary Pads - Nayma - Everyday Care. Timeless Confidence',
  description:
    "100% Certified Organic Cotton Sanitary Pads with secure wings and multi-layer absorbency. Hypoallergenic, breathable, and chlorine-free protection for all-day confidence.",
  alternates: { canonical: siteUrl("/products/for-her-sanitary-pads") },
  openGraph: {
    title: '"For Her" Sanitary Pads - Nayma - Everyday Care. Timeless Confidence',
    description:
      "100% Certified Organic Cotton Sanitary Pads with secure wings and multi-layer absorbency. Hypoallergenic, breathable, and chlorine-free protection for all-day confidence.",
    url: siteUrl("/products/for-her-sanitary-pads"),
    images: [siteAssetUrl("/assets/nayma-sanitary-pad-box.png")],
  },
  twitter: {
    card: "summary_large_image",
    title: '"For Her" Sanitary Pads - Nayma - Everyday Care. Timeless Confidence',
    description:
      "100% Certified Organic Cotton Sanitary Pads with secure wings and multi-layer absorbency. Hypoallergenic, breathable, and chlorine-free protection for all-day confidence.",
    images: [siteAssetUrl("/assets/nayma-sanitary-pad-box.png")],
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
      <ProductsForHerSanitaryPads />
      <MotionRuntime definitions={motionDefinitions} interactions={interactionDefinitions} />
    </>
  );
}
