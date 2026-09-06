import type { Metadata } from "next";
import { JournalsTheRiseOfCleanBeautyWhatItReallyMeans } from "@/components/JournalsTheRiseOfCleanBeautyWhatItReallyMeans";
import { siteAssetUrl, siteJsonLd, siteUrl } from "@/config/site";
import { MotionRuntime } from "@/ui/MotionRuntime";
import {
  motionDefinitions,
  interactionDefinitions,
} from "@/components/JournalsTheRiseOfCleanBeautyWhatItReallyMeans/JournalsTheRiseOfCleanBeautyWhatItReallyMeans/JournalsTheRiseOfCleanBeautyWhatItReallyMeans.motion";

const structuredData: any[] = [];

export const metadata: Metadata = {
  title: "The Rise of Clean Beauty: What It Really Means - Nayma",
  description:
    "Advanced skincare made simple. Nayma harnesses science and nature to create effective formulas that repair, protect, and elevate your skin.",
  alternates: { canonical: siteUrl("/journals/the-rise-of-clean-beauty-what-it-really-means") },
  openGraph: {
    title: "The Rise of Clean Beauty: What It Really Means - Nayma",
    description:
      "Advanced skincare made simple. Nayma harnesses science and nature to create effective formulas that repair, protect, and elevate your skin.",
    url: siteUrl("/journals/the-rise-of-clean-beauty-what-it-really-means"),
    images: [siteAssetUrl("https://framerusercontent.com/images/Dzs7LaERPdtkGT7X95bSjvPmmtU.jpg")],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Rise of Clean Beauty: What It Really Means - Nayma",
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
      <JournalsTheRiseOfCleanBeautyWhatItReallyMeans />
      <MotionRuntime definitions={motionDefinitions} interactions={interactionDefinitions} />
    </>
  );
}
