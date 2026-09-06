import type { Metadata } from "next";
import { JournalsMasteringTheArtOfLayeringSkincareEffectively } from "@/components/JournalsMasteringTheArtOfLayeringSkincareEffectively";
import { siteAssetUrl, siteJsonLd, siteUrl } from "@/config/site";
import { MotionRuntime } from "@/ui/MotionRuntime";
import {
  motionDefinitions,
  interactionDefinitions,
} from "@/components/JournalsMasteringTheArtOfLayeringSkincareEffectively/JournalsMasteringTheArtOfLayeringSkincareEffectively/JournalsMasteringTheArtOfLayeringSkincareEffectively.motion";

const structuredData: any[] = [];

export const metadata: Metadata = {
  title: "Mastering the Art of Layering Skincare Effectively - Nayma",
  description:
    "Advanced skincare made simple. Nayma harnesses science and nature to create effective formulas that repair, protect, and elevate your skin.",
  alternates: {
    canonical: siteUrl("/journals/mastering-the-art-of-layering-skincare-effectively"),
  },
  openGraph: {
    title: "Mastering the Art of Layering Skincare Effectively - Nayma",
    description:
      "Advanced skincare made simple. Nayma harnesses science and nature to create effective formulas that repair, protect, and elevate your skin.",
    url: siteUrl("/journals/mastering-the-art-of-layering-skincare-effectively"),
    images: [siteAssetUrl("https://framerusercontent.com/images/Dzs7LaERPdtkGT7X95bSjvPmmtU.jpg")],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mastering the Art of Layering Skincare Effectively - Nayma",
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
      <JournalsMasteringTheArtOfLayeringSkincareEffectively />
      <MotionRuntime definitions={motionDefinitions} interactions={interactionDefinitions} />
    </>
  );
}
