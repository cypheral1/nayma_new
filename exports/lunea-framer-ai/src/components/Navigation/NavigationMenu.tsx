"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./NavigationMenu.module.css";
import { Image } from "@/ui/Image";

interface NavProduct {
  title: string;
  category: string;
  price: string;
  href: string;
  image: string;
  tag?: string;
}

const FEATURED_PRODUCTS: NavProduct[] = [
  {
    title: '"For Her" Sanitary Pads',
    category: "Organic Intimate Care",
    price: "$14.00",
    href: "/products/for-her-sanitary-pads",
    image: "/assets/nayma-sanitary-pad-box.png",
    tag: "New",
  },
  {
    title: "Glow Renew Serum",
    category: "Radiance & Barrier",
    price: "$22.00",
    href: "/products/glow-renew-serum",
    image: "/assets/JivU9vaqZ97c42i17xIYoEXk78-a3950403df.png",
    tag: "Best Seller",
  },
  {
    title: "Daily UV Shield SPF 50",
    category: "Solar Protection",
    price: "$28.00",
    href: "/products/daily-uv-shield-spf-50-sunscreen",
    image: "/assets/dQQhp6zQac6z8ewXVPtEvwbk-a990b693c7.png",
  },
  {
    title: "Gentle Cream Cleanser",
    category: "Purifying Hydration",
    price: "$18.00",
    href: "/products/gentle-cream-cleanser",
    image: "/assets/ZyIMjezVAAMNdXJOczOFPOKYZ0-105c6e6545.png",
  },
  {
    title: "Hydrating Essence Mist",
    category: "Instant Refresh",
    price: "$24.00",
    href: "/products/hydrating-essence-mist",
    image: "/assets/NVKNxpEQTpZTxZrTViHqh632tY-054be1b35a.png",
  },
  {
    title: "Overnight Recovery Mask",
    category: "Deep Cellular Repair",
    price: "$32.00",
    href: "/products/overnight-recovery-mask",
    image: "/assets/7p0oNingCyeqC55GGVD6gCC9e1Q-54c06acfd4.png",
  },
];

const JOURNAL_LINKS = [
  {
    title: "The Science Behind Retinol",
    readTime: "4 min read",
    href: "/journals/the-science-behind-retinol",
  },
  {
    title: "Why Niacinamide Deserves a Place in Your Routine",
    readTime: "5 min read",
    href: "/journals/why-niacinamide-deserves-a-place-in-your-daily-routine",
  },
  {
    title: "Hydration Heroes: The Best Moisturizers",
    readTime: "3 min read",
    href: "/journals/hydration-heroes-the-best-moisturizers-for-every-skin-type",
  },
  {
    title: "Mastering the Art of Layering Skincare",
    readTime: "6 min read",
    href: "/journals/mastering-the-art-of-layering-skincare-effectively",
  },
];

export function NavigationMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const openMenu = useCallback(() => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = "";
  }, []);

  // Close menu automatically on route change
  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  // Handle global clicks on hamburger buttons
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check if clicked element or its parent matches the menu hamburger button
      const menuBtn = target.closest(
        '[class*="div15"], [aria-label="Open Menu"], button[data-menu-trigger]'
      );

      // Verify it's indeed the hamburger container (has 3 bars or matches div15)
      if (menuBtn && !menuBtn.closest(`.${styles.drawer}`)) {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen((prev) => {
          const next = !prev;
          document.body.style.overflow = next ? "hidden" : "";
          return next;
        });
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
      }
    };

    window.addEventListener("click", handleGlobalClick, true);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("click", handleGlobalClick, true);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeMenu]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropActive : ""}`}
        onClick={closeMenu}
        aria-hidden={!isOpen}
      />

      {/* Drawer */}
      <aside
        className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ""}`}
        aria-label="Main Navigation Menu"
        aria-hidden={!isOpen}
      >
        {/* Header inside drawer */}
        <div className={styles.drawerHeader}>
          <Link href="/" className={styles.brandLogo} onClick={closeMenu}>
            <span className={styles.brandTitle}>Nayma</span>
            <span className={styles.brandBadge}>Pure Science & Nature</span>
          </Link>

          <button
            type="button"
            className={styles.closeButton}
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Content Container */}
        <div className={styles.drawerContent}>
          {/* Primary Navigation Links */}
          <nav className={styles.primaryNav}>
            <div className={styles.navGroup}>
              <span className={styles.groupLabel}>Navigation</span>
              <ul className={styles.mainLinksList}>
                <li>
                  <Link
                    href="/"
                    className={`${styles.mainNavLink} ${pathname === "/" ? styles.activeNavLink : ""}`}
                    onClick={closeMenu}
                  >
                    <span>Home</span>
                    <span className={styles.arrowIcon}>→</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products"
                    className={`${styles.mainNavLink} ${pathname === "/products" ? styles.activeNavLink : ""}`}
                    onClick={closeMenu}
                  >
                    <span>All Products</span>
                    <span className={styles.countBadge}>6 Items</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/guideline"
                    className={`${styles.mainNavLink} ${pathname === "/guideline" ? styles.activeNavLink : ""}`}
                    onClick={closeMenu}
                  >
                    <span>Brand Guidelines</span>
                    <span className={styles.arrowIcon}>→</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Featured Products Showcase */}
            <div className={styles.navGroup}>
              <div className={styles.groupHeaderRow}>
                <span className={styles.groupLabel}>Featured Essentials</span>
                <Link href="/products" className={styles.viewAllSmall} onClick={closeMenu}>
                  View All
                </Link>
              </div>

              <div className={styles.productList}>
                {FEATURED_PRODUCTS.map((prod) => {
                  const isCurrent = pathname === prod.href;
                  return (
                    <Link
                      key={prod.href}
                      href={prod.href}
                      className={`${styles.productCard} ${isCurrent ? styles.activeProductCard : ""}`}
                      onClick={closeMenu}
                    >
                      <div className={styles.productThumbWrapper}>
                        <img
                          src={prod.image}
                          alt={prod.title}
                          className={styles.productThumb}
                        />
                      </div>
                      <div className={styles.productMeta}>
                        <div className={styles.productTitleRow}>
                          <span className={styles.productTitle}>{prod.title}</span>
                          {prod.tag && <span className={styles.tagBadge}>{prod.tag}</span>}
                        </div>
                        <span className={styles.productCategory}>{prod.category}</span>
                        <span className={styles.productPrice}>{prod.price}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Journals & Skincare Science */}
            <div className={styles.navGroup}>
              <span className={styles.groupLabel}>The Skincare Journal</span>
              <div className={styles.journalList}>
                {JOURNAL_LINKS.map((j) => (
                  <Link
                    key={j.href}
                    href={j.href}
                    className={styles.journalItem}
                    onClick={closeMenu}
                  >
                    <div className={styles.journalText}>
                      <span className={styles.journalTitle}>{j.title}</span>
                      <span className={styles.journalRead}>{j.readTime}</span>
                    </div>
                    <span className={styles.journalArrow}>↗</span>
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>

        {/* Drawer Footer */}
        <div className={styles.drawerFooter}>
          <div className={styles.footerRow}>
            <div className={styles.footerCol}>
              <span className={styles.footerLabel}>Region</span>
              <span className={styles.footerValue}>Global / USD ($)</span>
            </div>
            <div className={styles.footerCol}>
              <span className={styles.footerLabel}>Delivery</span>
              <span className={styles.footerValue}>Free Worldwide on $50+</span>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p className={styles.copyright}>© {new Date().getFullYear()} Nayma Care Inc. All rights reserved.</p>
          </div>
        </div>
      </aside>
    </>
  );
}
