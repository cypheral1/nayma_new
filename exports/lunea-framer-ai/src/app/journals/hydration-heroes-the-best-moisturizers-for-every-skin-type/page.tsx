import type { Metadata } from "next";
import { JournalsHydrationHeroesTheBestMoisturizersForEverySkinType } from "@/components/JournalsHydrationHeroesTheBestMoisturizersForEverySkinType";
import { siteAssetUrl, siteJsonLd, siteUrl } from "@/config/site";
import { MotionRuntime } from "@/ui/MotionRuntime";
import {
  motionDefinitions,
  interactionDefinitions,
} from "@/components/JournalsHydrationHeroesTheBestMoisturizersForEverySkinType/JournalsHydrationHeroesTheBestMoisturizersForEverySkinType/JournalsHydrationHeroesTheBestMoisturizersForEverySkinType.motion";

const structuredData: any[] = [];

export const metadata: Metadata = {
  title: "Hydration Heroes: The Best Moisturizers for Every Skin Type - Nayma",
  description:
    "Advanced skincare made simple. Nayma harnesses science and nature to create effective formulas that repair, protect, and elevate your skin.",
  alternates: {
    canonical: siteUrl("/journals/hydration-heroes-the-best-moisturizers-for-every-skin-type"),
  },
  openGraph: {
    title: "Hydration Heroes: The Best Moisturizers for Every Skin Type - Nayma",
    description:
      "Advanced skincare made simple. Nayma harnesses science and nature to create effective formulas that repair, protect, and elevate your skin.",
    url: siteUrl("/journals/hydration-heroes-the-best-moisturizers-for-every-skin-type"),
    images: [siteAssetUrl("https://framerusercontent.com/images/Dzs7LaERPdtkGT7X95bSjvPmmtU.jpg")],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hydration Heroes: The Best Moisturizers for Every Skin Type - Nayma",
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
      <JournalsHydrationHeroesTheBestMoisturizersForEverySkinType />
      <MotionRuntime definitions={motionDefinitions} interactions={interactionDefinitions} />
    </>
  );
}
