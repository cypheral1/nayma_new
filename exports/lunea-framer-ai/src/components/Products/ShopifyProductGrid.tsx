"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShopifyProduct } from "@/lib/shopify/types";
import { useCart } from "@/context/CartContext";
import styles from "./ShopifyProductGrid.module.css";

interface ShopifyProductGridProps {
  products: ShopifyProduct[];
}

export function ShopifyProductGrid({ products }: ShopifyProductGridProps) {
  const { addItem, isLoading } = useCart();
  const [addingId, setAddingId] = useState<string | null>(null);

  const handleAddToCart = async (product: ShopifyProduct) => {
    const firstVariant = product.variants?.edges?.[0]?.node;
    if (!firstVariant?.id) return;

    setAddingId(firstVariant.id);
    try {
      await addItem(firstVariant.id, 1);
    } finally {
      setAddingId(null);
    }
  };

  if (!products || products.length === 0) {
    return (
      <div className={styles.gridContainer}>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>✨</div>
          <h3 className={styles.emptyTitle}>No products found</h3>
          <p className={styles.emptyText}>Add products in your Shopify Admin to see them appear here instantly.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.gridContainer}>
      <div className={styles.headerSection}>
        <div className={styles.categoryBadge}>
          <span>✦</span>
          <span>Shopify Live Catalog</span>
        </div>
        <h2 className={styles.title}>All Formulations & Products</h2>
        <p className={styles.subtitle}>
          Thoughtfully crafted essentials powered directly by our live inventory.
        </p>
      </div>

      <div className={styles.productsGrid}>
        {products.map((product) => {
          const firstVariant = product.variants?.edges?.[0]?.node;
          const price = firstVariant?.price?.amount || product.priceRange?.minVariantPrice?.amount || "0";
          const currency = firstVariant?.price?.currencyCode || product.priceRange?.minVariantPrice?.currencyCode || "INR";
          const imageUrl = product.featuredImage?.url || product.images?.edges?.[0]?.node?.url || "/assets/JivU9vaqZ97c42i17xIYoEXk78-a3950403df.png";
          const isAvailable = product.availableForSale && (firstVariant ? firstVariant.availableForSale : true);
          const isAdding = addingId === firstVariant?.id;

          return (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.imageWrapper}>
                <img
                  src={imageUrl}
                  alt={product.featuredImage?.altText || product.title}
                  className={styles.productImage}
                  loading="lazy"
                />
                <div className={`${styles.badgeOverlay} ${!isAvailable ? styles.soldOutBadge : ""}`}>
                  {isAvailable ? "In Stock" : "Sold Out"}
                </div>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.ratingRow}>
                  <span className={styles.stars}>★★★★★</span>
                  <span className={styles.ratingText}>4.9 (Verified)</span>
                </div>

                <h3 className={styles.productTitle}>
                  <Link href={`/products/${product.handle}`}>
                    {product.title}
                  </Link>
                </h3>

                <p className={styles.productDesc}>
                  {product.description || "Clinically backed organic skincare formula designed for daily nourishment and barrier support."}
                </p>

                <div className={styles.priceAndAction}>
                  <div className={styles.priceWrapper}>
                    <span className={styles.price}>
                      {currency === "INR" ? "₹" : "$"}{parseFloat(price).toFixed(2)}
                    </span>
                    <span className={styles.currencyLabel}>{currency} • Tax Included</span>
                  </div>

                  <button
                    type="button"
                    className={styles.actionBtn}
                    onClick={() => handleAddToCart(product)}
                    disabled={!isAvailable || isAdding || isLoading}
                  >
                    {isAdding ? "Adding..." : isAvailable ? "Add to Bag" : "Sold Out"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
