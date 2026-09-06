import type { Metadata } from "next";
import { JournalsTheScienceBehindRetinol } from "@/components/JournalsTheScienceBehindRetinol";
import { siteAssetUrl, siteJsonLd, siteUrl } from "@/config/site";
import { MotionRuntime } from "@/ui/MotionRuntime";
import {
  motionDefinitions,
  interactionDefinitions,
} from "@/components/JournalsTheScienceBehindRetinol/JournalsTheScienceBehindRetinol/JournalsTheScienceBehindRetinol.motion";

const structuredData: any[] = [];

export const metadata: Metadata = {
  title: "The Science Behind Retinol: What You Need to Know - Nayma",
  description:
    "Advanced skincare made simple. Nayma harnesses science and nature to create effective formulas that repair, protect, and elevate your skin.",
  alternates: { canonical: siteUrl("/journals/the-science-behind-retinol") },
  openGraph: {
    title: "The Science Behind Retinol: What You Need to Know - Nayma",
    description:
      "Advanced skincare made simple. Nayma harnesses science and nature to create effective formulas that repair, protect, and elevate your skin.",
    url: siteUrl("/journals/the-science-behind-retinol"),
    images: [siteAssetUrl("https://framerusercontent.com/images/Dzs7LaERPdtkGT7X95bSjvPmmtU.jpg")],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Science Behind Retinol: What You Need to Know - Nayma",
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
      <JournalsTheScienceBehindRetinol />
      <MotionRuntime definitions={motionDefinitions} interactions={interactionDefinitions} />
    </>
  );
}
