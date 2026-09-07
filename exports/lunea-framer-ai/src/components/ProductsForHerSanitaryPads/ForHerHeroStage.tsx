"use client";

import React from "react";
import { ProductHeroStage, GalleryItem, MetricItem, IngredientItem } from "@/components/ProductsGlowRenewSerum/ProductHeroStage";

const FOR_HER_GALLERY: GalleryItem[] = [
  {
    id: "box",
    label: "Organic Cotton Box",
    src: "/assets/nayma-sanitary-pad-box.png",
    badge: "10 Pads • Wings • Regular",
    tagLeft: { icon: "🌿", title: "100% Organic Cotton", desc: "Pure hypoallergenic top sheet" },
    tagRight: { icon: "🛡️", title: "Leak-Lock Wings", desc: "360° Anti-leakage contour" },
  },
  {
    id: "softness",
    label: "Feather-Soft Core",
    src: "/assets/0YnjeaKQtbAwl773wGKnJUdqYQ-65f1877a28.png",
    badge: "Ultra-Soft Touch",
    tagLeft: { icon: "☁️", title: "Breathable Layer", desc: "Zero moisture trapping" },
    tagRight: { icon: "✨", title: "Dermatologist Tested", desc: "Safe for sensitive skin" },
  },
  {
    id: "absorbency",
    label: "Rapid-Absorb Core",
    src: "/assets/lNW2eqMnHfdGFRKQ340pYAcovc-b9216fa414.png",
    badge: "Flash-Dry Matrix",
    tagLeft: { icon: "💧", title: "Instant Absorption", desc: "Locks liquid in seconds" },
    tagRight: { icon: "🌸", title: "Natural Freshness", desc: "Chlorine & fragrance free" },
  },
  {
    id: "lifestyle",
    label: "All-Day Comfort",
    src: "/assets/uT5HH04dh1RQB4FRjfUxnTkaHc-e3bcbb6d55.png",
    badge: "Everyday Confidence",
    tagLeft: { icon: "🕊️", title: "Discreet & Slim", desc: "Zero bulk silhouette" },
    tagRight: { icon: "♻️", title: "Eco Wrappers", desc: "Biodegradable materials" },
  },
  {
    id: "seal",
    label: "Eco Quality Seal",
    src: "/assets/zMLGQMkKYKlZnCmZeuYwmerAYSY-426d4d030f.png",
    badge: "FSC & Vegan",
    tagLeft: { icon: "🌍", title: "Carbon Neutral", desc: "Sustainably produced" },
    tagRight: { icon: "🍃", title: "Toxin-Free", desc: "No bleach, dyes, or synthetics" },
  },
];

const FOR_HER_METRICS: MetricItem[] = [
  { value: "100%", label: "Organic Cotton", desc: "GOTS-certified pure natural fibers" },
  { value: "0%", label: "Toxins & Chlorine", desc: "Zero artificial fragrances, dyes, or harsh chemicals" },
  { value: "12h", label: "Leak Protection", desc: "Multi-channel ultra-absorbent core with flexi-wings" },
];

const FOR_HER_MATERIALS: IngredientItem[] = [
  { name: "Certified Organic Cotton", role: "Hypoallergenic, breathable top sheet gentle on intimate skin." },
  { name: "Plant-Based Core", role: "Sustainably sourced cellulose pulp with rapid moisture-locking gel." },
  { name: "Micro-Airflow Backsheet", role: "Allows continuous air circulation to eliminate irritation." },
  { name: "Non-Toxic Adhesive", role: "Food-grade polymer adhesive with secure stay-in-place wings." },
];

const FOR_HER_USAGE_STEPS = [
  "Unwrap the biodegradable pouch and unfold the sanitary pad.",
  "Peel off the center adhesive backing strip.",
  "Position the pad firmly onto the center of your underwear.",
  "Peel wing tabs, fold around the underside of your underwear, and press securely.",
];

export function ForHerHeroStage() {
  return (
    <ProductHeroStage
      productTitle={'"For Her" Sanitary Pads'}
      productPrice={14.0}
      categoryName="Intimate Care & Wellness"
      description="Crafted from 100% certified organic cotton, Nayma For Her Sanitary Pads provide ultra-absorbent, hypoallergenic, breathable protection with secure flexi-wings for effortless all-day and overnight confidence."
      ratingScore="4.9 / 5.0"
      reviewCount="(580+ Verified Reviews)"
      images={FOR_HER_GALLERY}
      model3dUrl="/assets/3d/for-her-3d-model.html"
      initial3D={true}
      overviewText='Designed specifically for sensitive skin, "For Her" Sanitary Pads combine breathable plant-based layers with a high-performance absorption core. Free from chlorine bleaching, dyes, synthetic fragrances, and pesticides.'
      ingredientsList={FOR_HER_MATERIALS}
      usageSteps={FOR_HER_USAGE_STEPS}
      clinicalMetrics={FOR_HER_METRICS}
      tabLabels={{
        overview: "Design & Quality",
        ingredients: "Pure Materials",
        usage: "Usage & Fit",
        clinical: "Certifications",
      }}
    />
  );
}
