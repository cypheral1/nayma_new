import type { Metadata } from "next";
import { JournalsSeasonalSkincareSwapsWhatToChangeAndWhen } from "@/components/JournalsSeasonalSkincareSwapsWhatToChangeAndWhen";
import { siteAssetUrl, siteJsonLd, siteUrl } from "@/config/site";
import { MotionRuntime } from "@/ui/MotionRuntime";
import {
  motionDefinitions,
  interactionDefinitions,
} from "@/components/JournalsSeasonalSkincareSwapsWhatToChangeAndWhen/JournalsSeasonalSkincareSwapsWhatToChangeAndWhen/JournalsSeasonalSkincareSwapsWhatToChangeAndWhen.motion";

const structuredData: any[] = [];

export const metadata: Metadata = {
  title: "Seasonal Skincare Swaps: What to Change and When - Nayma",
  description:
    "Advanced skincare made simple. Nayma harnesses science and nature to create effective formulas that repair, protect, and elevate your skin.",
  alternates: { canonical: siteUrl("/journals/seasonal-skincare-swaps-what-to-change-and-when") },
  openGraph: {
    title: "Seasonal Skincare Swaps: What to Change and When - Nayma",
    description:
      "Advanced skincare made simple. Nayma harnesses science and nature to create effective formulas that repair, protect, and elevate your skin.",
    url: siteUrl("/journals/seasonal-skincare-swaps-what-to-change-and-when"),
    images: [siteAssetUrl("https://framerusercontent.com/images/Dzs7LaERPdtkGT7X95bSjvPmmtU.jpg")],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seasonal Skincare Swaps: What to Change and When - Nayma",
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
      <JournalsSeasonalSkincareSwapsWhatToChangeAndWhen />
      <MotionRuntime definitions={motionDefinitions} interactions={interactionDefinitions} />
    </>
  );
}
