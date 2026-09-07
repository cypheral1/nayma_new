"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import styles from "./ProductHeroStage.module.css";
import { Image } from "@/ui/Image";

export interface GalleryItem {
  id: string;
  label: string;
  src: string;
  badge?: string;
  tagLeft?: { icon: string; title: string; desc: string };
  tagRight?: { icon: string; title: string; desc: string };
}

export interface MetricItem {
  value: string;
  label: string;
  desc: string;
}

export interface IngredientItem {
  name: string;
  role: string;
}

interface ProductHeroStageProps {
  productTitle?: string;
  productPrice?: number;
  categoryName?: string;
  description?: string;
  ratingScore?: string;
  reviewCount?: string;
  images?: GalleryItem[];
  model3dUrl?: string;
  initial3D?: boolean;
  overviewText?: string;
  ingredientsList?: IngredientItem[];
  usageSteps?: string[];
  clinicalMetrics?: MetricItem[];
  tabLabels?: {
    overview?: string;
    ingredients?: string;
    usage?: string;
    clinical?: string;
  };
  onAddToCart?: () => void;
}

const DEFAULT_PRODUCT_GALLERY: GalleryItem[] = [
  {
    id: "main",
    label: "Formula & Bottle",
    src: "/assets/JivU9vaqZ97c42i17xIYoEXk78-a3950403df.png",
    badge: "Primary Formula",
    tagLeft: { icon: "✨", title: "5% Bio-Active Niacinamide", desc: "Cellular radiance" },
    tagRight: { icon: "💧", title: "Triple Hyaluronic Acid", desc: "Deep 24h moisture" },
  },
  {
    id: "texture",
    label: "Texture & Dropper",
    src: "/assets/qbzUUvm1TnH0qwSIp5ymV66JpVo-944544a5d6.png",
    badge: "Micro-Dropper",
    tagLeft: { icon: "🌿", title: "Weightless Absorption", desc: "Zero sticky residue" },
    tagRight: { icon: "✨", title: "Glass-Skin Glow", desc: "Instant dewy radiance" },
  },
  {
    id: "botanical",
    label: "Botanical Extracts",
    src: "/assets/0YnjeaKQtbAwl773wGKnJUdqYQ-65f1877a28.png",
    badge: "Pure Actives",
    tagLeft: { icon: "🌱", title: "Centella Asiatica", desc: "Barrier soothing" },
    tagRight: { icon: "🛡️", title: "Fermented Squalane", desc: "Lipid replenishment" },
  },
  {
    id: "box",
    label: "Eco Packaging Box",
    src: "/assets/nayma-sanitary-pad-box.png",
    badge: "FSC Certified",
    tagLeft: { icon: "📦", title: "100% Recyclable", desc: "Zero single-use plastic" },
    tagRight: { icon: "🌿", title: "Pure Organic Line", desc: "Dermatologically tested" },
  },
  {
    id: "application",
    label: "Daily Ritual Routine",
    src: "/assets/uT5HH04dh1RQB4FRjfUxnTkaHc-e3bcbb6d55.png",
    badge: "AM & PM Ritual",
    tagLeft: { icon: "☀️", title: "Morning Shield", desc: "Antioxidant defense" },
    tagRight: { icon: "🌙", title: "Night Recovery", desc: "Cellular renewal" },
  },
];

const DEFAULT_CLINICAL_METRICS: MetricItem[] = [
  { value: "98%", label: "Hydration Boost", desc: "Instant cellular moisture surge" },
  { value: "94%", label: "Barrier Repair", desc: "Strengthened microbiome defense in 14 days" },
  { value: "89%", label: "Luminous Tone", desc: "Visible reduction in redness & dullness" },
];

const DEFAULT_INGREDIENTS: IngredientItem[] = [
  { name: "5% Niacinamide", role: "Cellular renewal, pore refinement, and barrier reinforcement." },
  { name: "Triple Hyaluronic Acid", role: "Multi-depth epidermal hydration locking in 24h moisture." },
  { name: "Centella Asiatica (Cica)", role: "Calms inflammation and accelerates cellular recovery." },
  { name: "Bio-Fermented Squalane", role: "Mimics natural skin lipids for a silky, weightless glow." },
];

const DEFAULT_USAGE_STEPS = [
  "Cleanse skin thoroughly with Gentle Cream Cleanser.",
  "Dispense 3–4 drops directly onto face and neck.",
  "Smooth with gentle upward motions until fully absorbed.",
  "Follow with Daily UV Shield SPF 50 (AM) or Recovery Mask (PM).",
];

export function ProductHeroStage({
  productTitle = "Glow Renew Serum",
  productPrice = 22.0,
  categoryName = "Flagship Elixir",
  description = "A concentrated bi-phase serum formulated with clinically backed actives and pure botanicals to illuminate, repair, and sustain healthy skin resilience.",
  ratingScore = "4.8 / 5.0",
  reviewCount = "(420+ Verified Reviews)",
  images = DEFAULT_PRODUCT_GALLERY,
  overviewText,
  ingredientsList = DEFAULT_INGREDIENTS,
  usageSteps = DEFAULT_USAGE_STEPS,
  clinicalMetrics = DEFAULT_CLINICAL_METRICS,
  tabLabels = {
    overview: "Formula",
    ingredients: "Key Actives",
    usage: "How to Use",
    clinical: "Clinical Results",
  },
  model3dUrl,
  initial3D = false,
  onAddToCart,
}: ProductHeroStageProps) {
  const [is3DMode, setIs3DMode] = useState(initial3D);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"overview" | "ingredients" | "usage" | "clinical">("overview");
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isHoveredOnStage, setIsHoveredOnStage] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const thumbnailsScrollRef = useRef<HTMLDivElement>(null);

  const gallery = images && images.length > 0 ? images : DEFAULT_PRODUCT_GALLERY;
  const currentItem = gallery[activeImageIndex] || gallery[0];

  // Navigation handlers
  const handlePrevImage = useCallback(() => {
    setIs3DMode(false);
    setActiveImageIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  }, [gallery.length]);

  const handleNextImage = useCallback(() => {
    setIs3DMode(false);
    setActiveImageIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  }, [gallery.length]);

  // Keyboard arrow keys for gallery navigation & Escape for zoom
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrevImage();
      } else if (e.key === "ArrowRight") {
        handleNextImage();
      } else if (e.key === "Escape" && isZoomOpen) {
        setIsZoomOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrevImage, handleNextImage, isZoomOpen]);

  // Scroll active thumbnail into view
  useEffect(() => {
    if (thumbnailsScrollRef.current) {
      const activeEl = thumbnailsScrollRef.current.children[activeImageIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  }, [activeImageIndex]);

  // Parallax mouse movement tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!stageRef.current) return;
      const rect = stageRef.current.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      setMousePos({ x, y });
    };

    const container = stageRef.current;
    if (container) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleAdd = () => {
    setAddedSuccess(true);
    if (onAddToCart) onAddToCart();
    setTimeout(() => setAddedSuccess(false), 2400);
  };

  const defaultOverview = overviewText || `The ${productTitle} utilizes a premium, hypoallergenic formulation to deliver optimal comfort, resilience, and maximum protection without irritation or compromised performance.`;

  return (
    <div className={styles.productStageWrapper} ref={stageRef}>
      {/* Dynamic 3D Parallax Hero Stage */}
      <div className={styles.heroParallaxContainer}>
        {/* Background Gradient Image */}
        <div className={styles.heroBackground}>
          <Image
            className={styles.bgImage}
            src="/assets/jVv4NbADBp0gALuAyWELDfvTsaA-720f4c242a.png"
            alt="Hero background gradient"
            width={2880}
            height={1866}
            priority
          />
        </div>

        {/* Floating Clouds Layer 1 (Top Left) */}
        <div
          className={`${styles.cloudLayer} ${styles.cloud1}`}
          style={{
            transform: `translate3d(${mousePos.x * -25}px, ${mousePos.y * -18}px, 0)`,
          }}
        >
          <img
            src="https://framerusercontent.com/images/1ndcuDegEnGUBfzx2Nj9uggXBE.png?width=734&height=402"
            alt="Atmospheric cloud"
            className={styles.cloudImg}
          />
        </div>

        {/* Floating Clouds Layer 2 (Top Right) */}
        <div
          className={`${styles.cloudLayer} ${styles.cloud2}`}
          style={{
            transform: `translate3d(${mousePos.x * 30}px, ${mousePos.y * 22}px, 0)`,
          }}
        >
          <img
            src="/assets/9RhTCwsHfKi8X6BzFNEwnwEZFcQ-4eca13928a.png"
            alt="Atmospheric cloud"
            className={styles.cloudImg}
          />
        </div>

        {/* Floating Clouds Layer 3 (Bottom Left) */}
        <div
          className={`${styles.cloudLayer} ${styles.cloud3}`}
          style={{
            transform: `translate3d(${mousePos.x * 20}px, ${mousePos.y * -15}px, 0)`,
          }}
        >
          <img
            src="https://framerusercontent.com/images/a5O2zgpjk7dpSRywZk2WFA6yvk.png?width=746&height=581"
            alt="Atmospheric cloud"
            className={styles.cloudImg}
          />
        </div>

        {/* Floating Clouds Layer 4 (Bottom Right / Foreground) */}
        <div
          className={`${styles.cloudLayer} ${styles.cloud4}`}
          style={{
            transform: `translate3d(${mousePos.x * -35}px, ${mousePos.y * 25}px, 0)`,
          }}
        >
          <img
            src="https://framerusercontent.com/images/jAGSUTL93CEWkmnaWHTxb8Ao.png?width=1002&height=882"
            alt="Atmospheric cloud"
            className={styles.cloudImg}
          />
        </div>

        {/* Main In-Cloud Stage Content (Breadcrumb + 2-Column Hero) */}
        <div className={styles.stageContentBox}>
          {/* Breadcrumb Navigation */}
          <div className={styles.breadcrumbBar}>
            <Link href="/products" className={styles.breadcrumbLink}>
              All Products
            </Link>
            <span className={styles.breadcrumbDivider}>›</span>
            <span className={styles.breadcrumbCurrent}>{productTitle}</span>
          </div>

          <div className={styles.cloudGrid}>
            {/* Left Column: Multi-Image Interactive 3D Showcase */}
            <div className={styles.leftProductShowcase}>
              {/* Mode Switcher Pill (Photos vs 3D) */}
              {model3dUrl && (
                <div className={styles.stageModeSwitch}>
                  <button
                    type="button"
                    className={`${styles.modeSwitchBtn} ${!is3DMode ? styles.modeSwitchBtnActive : ""}`}
                    onClick={() => setIs3DMode(false)}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                    <span>Photos ({gallery.length})</span>
                  </button>
                  <button
                    type="button"
                    className={`${styles.modeSwitchBtn} ${is3DMode ? styles.modeSwitchBtnActive : ""}`}
                    onClick={() => setIs3DMode(true)}
                  >
                    <span className={styles.modeIcon3D}>🧊</span>
                    <span>3D Interactive</span>
                    <span className={styles.mode3DPulseDot} />
                  </button>
                </div>
              )}

              {/* Image Stage Container with 3D Tilt & Controls */}
              <div
                className={styles.stageViewport}
                onMouseEnter={() => setIsHoveredOnStage(true)}
                onMouseLeave={() => setIsHoveredOnStage(false)}
              >
                {/* 3D Model Stage or Photo Carousel */}
                {is3DMode && model3dUrl ? (
                  <div className={styles.model3DStageWrapper}>
                    <div className={styles.ambientGlow} />
                    <iframe
                      src={model3dUrl}
                      title="3D Interactive Packaging Model"
                      className={styles.model3DIframe}
                      allow="accelerometer; autoplay; encrypted-media; gyroscope"
                    />
                  </div>
                ) : (
                  <div
                    className={styles.floatingBottleStage}
                    style={{
                      transform: `perspective(1000px) rotateY(${mousePos.x * 10}deg) rotateX(${
                        mousePos.y * -8
                      }deg) translate3d(0, ${mousePos.y * 8}px, 30px)`,
                    }}
                  >
                    {/* Radiant Ambient Glow */}
                    <div className={styles.ambientGlow} />

                    {/* Active Product Image Display */}
                    <div
                      className={styles.bottleContainer}
                      onClick={() => setIsZoomOpen(true)}
                      title="Click to view full size"
                    >
                      <img
                        key={currentItem.src}
                        src={currentItem.src}
                        alt={currentItem.label}
                        className={styles.bottleImage}
                      />
                      <div className={styles.zoomHintPill}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="11" cy="11" r="8" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                          <line x1="11" y1="8" x2="11" y2="14" />
                          <line x1="8" y1="11" x2="14" y2="11" />
                        </svg>
                        <span>Click to zoom</span>
                      </div>
                    </div>

                    {/* Dynamic Floating Feature Badges */}
                    {currentItem.tagLeft && (
                      <div className={`${styles.floatingTag} ${styles.tagLeft}`}>
                        <span className={styles.tagIcon}>{currentItem.tagLeft.icon}</span>
                        <div className={styles.tagText}>
                          <strong>{currentItem.tagLeft.title}</strong>
                          <span>{currentItem.tagLeft.desc}</span>
                        </div>
                      </div>
                    )}

                    {currentItem.tagRight && (
                      <div className={`${styles.floatingTag} ${styles.tagRight}`}>
                        <span className={styles.tagIcon}>{currentItem.tagRight.icon}</span>
                        <div className={styles.tagText}>
                          <strong>{currentItem.tagRight.title}</strong>
                          <span>{currentItem.tagRight.desc}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Left & Right Carousel Navigation Arrows (only in photo mode) */}
                {!is3DMode && gallery.length > 1 && (
                  <>
                    <button
                      type="button"
                      className={`${styles.galleryNavArrow} ${styles.arrowLeft} ${
                        isHoveredOnStage ? styles.arrowVisible : ""
                      }`}
                      onClick={handlePrevImage}
                      aria-label="Previous image"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </button>

                    <button
                      type="button"
                      className={`${styles.galleryNavArrow} ${styles.arrowRight} ${
                        isHoveredOnStage ? styles.arrowVisible : ""
                      }`}
                      onClick={handleNextImage}
                      aria-label="Next image"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </>
                )}

                {/* Counter & Indicator Badge (only in photo mode to prevent overlap with 3D controls) */}
                {!is3DMode && (
                  <div className={styles.galleryMetaBadge}>
                    <span className={styles.metaCurrentIdx}>{activeImageIndex + 1}</span>
                    <span className={styles.metaDivider}>/</span>
                    <span className={styles.metaTotal}>{gallery.length}</span>
                    {currentItem.badge && <span className={styles.metaLabel}>• {currentItem.badge}</span>}
                  </div>
                )}

                {/* Dot Pagination Track (only in photo mode) */}
                {!is3DMode && (
                  <div className={styles.dotTrack}>
                    {gallery.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`${styles.dotIndicator} ${activeImageIndex === idx ? styles.dotActive : ""}`}
                        onClick={() => setActiveImageIndex(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Multi-Image & 3D Interactive Thumbnail Selector Ribbon */}
              <div className={styles.cloudThumbnailsWrapper}>
                <div className={styles.cloudThumbnails} ref={thumbnailsScrollRef}>
                  {/* Photo Thumbnails */}
                  {gallery.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`${styles.cloudThumbBtn} ${!is3DMode && activeImageIndex === idx ? styles.activeCloudThumb : ""}`}
                      onClick={() => {
                        setActiveImageIndex(idx);
                        setIs3DMode(false);
                      }}
                    >
                      <div className={styles.thumbImgBox}>
                        <img src={item.src} alt={item.label} className={styles.cloudThumbImg} />
                      </div>
                      <div className={styles.thumbInfo}>
                        <span className={styles.cloudThumbText}>{item.label}</span>
                        {item.badge && <span className={styles.thumbSubText}>{item.badge}</span>}
                      </div>
                    </button>
                  ))}

                  {/* 3D Model Thumbnail */}
                  {model3dUrl && (
                    <button
                      type="button"
                      className={`${styles.cloudThumbBtn} ${styles.cloudThumbBtn3D} ${is3DMode ? styles.activeCloudThumb : ""}`}
                      onClick={() => setIs3DMode(true)}
                    >
                      <div className={styles.thumbImgBox}>
                        <div className={styles.thumb3DIconBox}>
                          <span>🧊</span>
                        </div>
                      </div>
                      <div className={styles.thumbInfo}>
                        <span className={styles.cloudThumbText}>3D Model</span>
                        <span className={styles.thumbSubText}>360° Rotate</span>
                      </div>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Glassmorphic Floating Product Buy & Details Panel */}
            <div className={styles.rightProductPanel}>
              {/* Product Header */}
              <div className={styles.panelHeader}>
                <div className={styles.categoryPill}>
                  <span className={styles.sparkle}>✦</span>
                  <span>{categoryName}</span>
                </div>

                <h1 className={styles.productMainTitle}>{productTitle}</h1>

                <div className={styles.ratingRow}>
                  <div className={styles.stars}>★★★★★</div>
                  <span className={styles.ratingScore}>{ratingScore}</span>
                  <span className={styles.reviewCount}>{reviewCount}</span>
                </div>
              </div>

              {/* Price & Stock */}
              <div className={styles.priceRow}>
                <div className={styles.priceContainer}>
                  <span className={styles.currency}>$</span>
                  <span className={styles.priceNumber}>{productPrice.toFixed(2)}</span>
                  <span className={styles.taxLabel}>USD • Tax Included</span>
                </div>
                <span className={styles.stockBadge}>In Stock • Ready to Ship</span>
              </div>

              {/* Brief Overview */}
              <p className={styles.panelDescription}>{description}</p>

              {/* Action Row: Quantity + Add to Bag + Buy Now */}
              <div className={styles.ctaSection}>
                <div className={styles.actionRow}>
                  <div className={styles.qtyControl}>
                    <button
                      type="button"
                      className={styles.qtyBtn}
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className={styles.qtyValue}>{quantity}</span>
                    <button
                      type="button"
                      className={styles.qtyBtn}
                      onClick={() => setQuantity((q) => q + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className={`${styles.addToCartBtn} ${addedSuccess ? styles.btnSuccess : ""}`}
                    onClick={handleAdd}
                  >
                    {addedSuccess ? (
                      <span className={styles.addedNotice}>✓ Added to Bag!</span>
                    ) : (
                      <span>Add to Bag • ${(productPrice * quantity).toFixed(2)}</span>
                    )}
                  </button>
                </div>

                <button
                  type="button"
                  className={styles.buyNowBtn}
                  onClick={handleAdd}
                >
                  Instant Checkout
                </button>
              </div>

              {/* Guarantees */}
              <div className={styles.guaranteeGrid}>
                <div className={styles.guaranteeItem}>
                  <span className={styles.gIcon}>🌿</span>
                  <span>100% Organic & Clean</span>
                </div>
                <div className={styles.guaranteeItem}>
                  <span className={styles.gIcon}>🔬</span>
                  <span>Hypoallergenic</span>
                </div>
                <div className={styles.guaranteeItem}>
                  <span className={styles.gIcon}>📦</span>
                  <span>Free Carbon-Neutral Shipping</span>
                </div>
              </div>

              {/* In-Cloud Tabbed In-Depth Information */}
              <div className={styles.tabsSection}>
                <div className={styles.tabHeaderNav}>
                  <button
                    type="button"
                    className={`${styles.tabLink} ${activeTab === "overview" ? styles.tabLinkActive : ""}`}
                    onClick={() => setActiveTab("overview")}
                  >
                    {tabLabels.overview || "Overview"}
                  </button>
                  <button
                    type="button"
                    className={`${styles.tabLink} ${activeTab === "ingredients" ? styles.tabLinkActive : ""}`}
                    onClick={() => setActiveTab("ingredients")}
                  >
                    {tabLabels.ingredients || "Materials"}
                  </button>
                  <button
                    type="button"
                    className={`${styles.tabLink} ${activeTab === "usage" ? styles.tabLinkActive : ""}`}
                    onClick={() => setActiveTab("usage")}
                  >
                    {tabLabels.usage || "How to Use"}
                  </button>
                  <button
                    type="button"
                    className={`${styles.tabLink} ${activeTab === "clinical" ? styles.tabLinkActive : ""}`}
                    onClick={() => setActiveTab("clinical")}
                  >
                    {tabLabels.clinical || "Certifications"}
                  </button>
                </div>

                <div className={styles.tabContentBody}>
                  {activeTab === "overview" && (
                    <div className={styles.tabPane}>
                      <p>{defaultOverview}</p>
                    </div>
                  )}

                  {activeTab === "ingredients" && (
                    <div className={styles.tabPane}>
                      <div className={styles.ingredientsGrid}>
                        {ingredientsList.map((ing) => (
                          <div key={ing.name} className={styles.ingCard}>
                            <h4 className={styles.ingName}>{ing.name}</h4>
                            <p className={styles.ingRole}>{ing.role}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "usage" && (
                    <div className={styles.tabPane}>
                      <ol className={styles.stepList}>
                        {usageSteps.map((step, idx) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {activeTab === "clinical" && (
                    <div className={styles.tabPane}>
                      <div className={styles.clinicalGrid}>
                        {clinicalMetrics.map((metric) => (
                          <div key={metric.label} className={styles.metricCard}>
                            <span className={styles.metricVal}>{metric.value}</span>
                            <strong className={styles.metricLabel}>{metric.label}</strong>
                            <span className={styles.metricDesc}>{metric.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen High-Resolution Lightbox Modal */}
      {isZoomOpen && (
        <div
          className={styles.lightboxBackdrop}
          onClick={() => setIsZoomOpen(false)}
          aria-modal="true"
          role="dialog"
        >
          <div
            className={styles.lightboxContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.lightboxCloseBtn}
              onClick={() => setIsZoomOpen(false)}
              aria-label="Close high-res view"
            >
              ✕
            </button>

            <div className={styles.lightboxImgWrapper}>
              <img
                src={currentItem.src}
                alt={currentItem.label}
                className={styles.lightboxImage}
              />
            </div>

            <div className={styles.lightboxFooter}>
              <div className={styles.lightboxCaption}>
                <h3>{productTitle}</h3>
                <span>{currentItem.label} — {currentItem.badge || "Detailed View"}</span>
              </div>

              {gallery.length > 1 && (
                <div className={styles.lightboxControls}>
                  <button
                    type="button"
                    className={styles.lightboxNavBtn}
                    onClick={handlePrevImage}
                    aria-label="Previous photo"
                  >
                    ← Previous
                  </button>
                  <span className={styles.lightboxCounter}>
                    {activeImageIndex + 1} / {gallery.length}
                  </span>
                  <button
                    type="button"
                    className={styles.lightboxNavBtn}
                    onClick={handleNextImage}
                    aria-label="Next photo"
                  >
                    Next →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
