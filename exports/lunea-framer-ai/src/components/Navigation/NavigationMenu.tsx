"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./NavigationMenu.module.css";

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
    tag: "3D View",
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

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      document.body.style.overflow = next ? "hidden" : "";
      return next;
    });
  }, []);

  // Close menu automatically on route change
  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  // Handle keyboard Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeMenu();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeMenu]);

  // Bind click handlers to the header hamburger button
  useEffect(() => {
    const isHamburgerElement = (el: HTMLElement | null): boolean => {
      if (!el) return false;
      if (el.closest(`.${styles.drawer}`)) return false;

      // Check for explicit trigger data attributes
      if (el.closest('[data-menu-trigger="true"], [aria-label*="Menu"], [aria-label*="menu"]')) {
        return true;
      }

      // Check if clicked the 3 hamburger lines (div11, div12, div13) or their wrapper (div14)
      if (el.closest('[class*="div11"], [class*="div12"], [class*="div13"], [class*="div14"]')) {
        return true;
      }

      // Check inside header navigation
      const header = el.closest('header, [class*="navbar"]');
      if (header) {
        // Ignore clicks on logo link
        if (el.closest('a[href="/"], [class*="luneaLink"], [class*="lunea4"]')) {
          return false;
        }
        // Ignore clicks on cart pill
        if (el.closest('[class*="p9"], [class*="p0"], [class*="div16"], [class*="div21"], [class*="variant1"]')) {
          return false;
        }
        // If clicking the brand pill (lunea3) or hamburger wrapper (div15)
        if (
          el.closest('[class*="lunea3"]') ||
          el.closest('[class*="div15"]:not([class*="div150"]):not([class*="div151"]):not([class*="div152"]):not([class*="div154"]):not([class*="div155"]):not([class*="div156"]):not([class*="div157"]):not([class*="div158"]):not([class*="div159"])')
        ) {
          return true;
        }
      }

      return false;
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (isHamburgerElement(target)) {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
      }
    };

    // Attach click listener
    document.addEventListener("click", handleClick, false);

    // Enhance header buttons with hover styling and accessible attributes
    const updateButtons = () => {
      const btns = document.querySelectorAll<HTMLElement>(
        'header [class*="lunea3"] > div, header [class*="div15"]:not([class*="div150"]):not([class*="div151"]):not([class*="div152"]):not([class*="div154"]):not([class*="div155"]):not([class*="div156"]):not([class*="div157"]):not([class*="div158"]):not([class*="div159"])'
      );
      btns.forEach((btn) => {
        btn.setAttribute("data-menu-trigger", "true");
        btn.setAttribute("aria-label", "Toggle Navigation Menu");
        btn.setAttribute("aria-expanded", String(isOpen));
        btn.setAttribute("role", "button");
        btn.style.cursor = "pointer";
      });
    };

    updateButtons();
    const timer = setTimeout(updateButtons, 300);

    return () => {
      document.removeEventListener("click", handleClick, false);
      clearTimeout(timer);
    };
  }, [toggleMenu, isOpen, pathname]);

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
            <span className={styles.brandBadge}>Everyday Care. Timeless Confidence</span>
          </Link>

          <button
            type="button"
            className={styles.closeButton}
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
