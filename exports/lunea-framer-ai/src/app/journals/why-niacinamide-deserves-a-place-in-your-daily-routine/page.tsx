import type { Metadata } from "next";
import { JournalsWhyNiacinamideDeservesAPlaceInYourDailyRoutine } from "@/components/JournalsWhyNiacinamideDeservesAPlaceInYourDailyRoutine";
import { siteAssetUrl, siteJsonLd, siteUrl } from "@/config/site";
import { MotionRuntime } from "@/ui/MotionRuntime";
import {
  motionDefinitions,
  interactionDefinitions,
} from "@/components/JournalsWhyNiacinamideDeservesAPlaceInYourDailyRoutine/JournalsWhyNiacinamideDeservesAPlaceInYourDailyRoutine/JournalsWhyNiacinamideDeservesAPlaceInYourDailyRoutine.motion";

const structuredData: any[] = [];

export const metadata: Metadata = {
  title: "Why Niacinamide Deserves a Place in Your Daily Routine - Nayma",
  description:
    "Advanced skincare made simple. Nayma harnesses science and nature to create effective formulas that repair, protect, and elevate your skin.",
  alternates: {
    canonical: siteUrl("/journals/why-niacinamide-deserves-a-place-in-your-daily-routine"),
  },
  openGraph: {
    title: "Why Niacinamide Deserves a Place in Your Daily Routine - Nayma",
    description:
      "Advanced skincare made simple. Nayma harnesses science and nature to create effective formulas that repair, protect, and elevate your skin.",
    url: siteUrl("/journals/why-niacinamide-deserves-a-place-in-your-daily-routine"),
    images: [siteAssetUrl("https://framerusercontent.com/images/Dzs7LaERPdtkGT7X95bSjvPmmtU.jpg")],
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Niacinamide Deserves a Place in Your Daily Routine - Nayma",
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
      <JournalsWhyNiacinamideDeservesAPlaceInYourDailyRoutine />
      <MotionRuntime definitions={motionDefinitions} interactions={interactionDefinitions} />
    </>
  );
}
