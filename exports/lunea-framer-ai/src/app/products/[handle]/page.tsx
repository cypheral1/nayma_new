import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getShopifyProductByHandle, getShopifyProducts } from "@/lib/shopify/queries/products";
import { ProductHeroStage, GalleryItem } from "@/components/ProductsGlowRenewSerum/ProductHeroStage";
import { siteUrl } from "@/config/site";

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

export async function generateStaticParams() {
  const products = await getShopifyProducts(25);
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = await getShopifyProductByHandle(handle);

  if (!product) {
    return {
      title: "Product Not Found - Nayma",
    };
  }

  return {
    title: `${product.title} - Nayma Everyday Care`,
    description: product.description || "Discover Nayma clinically backed organic skincare essentials.",
    alternates: { canonical: siteUrl(`/products/${handle}`) },
    openGraph: {
      title: `${product.title} - Nayma`,
      description: product.description,
      images: product.featuredImage ? [{ url: product.featuredImage.url }] : [],
    },
  };
}

export default async function ShopifyProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = await getShopifyProductByHandle(handle);

  if (!product) {
    notFound();
  }

  const firstVariant = product.variants?.edges?.[0]?.node;
  const price = parseFloat(firstVariant?.price?.amount || product.priceRange?.minVariantPrice?.amount || "0");

  const images: GalleryItem[] =
    product.images?.edges?.length > 0
      ? product.images.edges.map((edge, idx) => ({
          id: `img-${idx}`,
          label: `${product.title} View ${idx + 1}`,
          src: edge.node.url,
          badge: idx === 0 ? "Featured" : undefined,
        }))
      : [
          {
            id: "main",
            label: product.title,
            src: product.featuredImage?.url || "/assets/JivU9vaqZ97c42i17xIYoEXk78-a3950403df.png",
            badge: "Live Catalog",
          },
        ];

  return (
    <main style={{ minHeight: "100vh", background: "#f5f5f9" }}>
      <ProductHeroStage
        productTitle={product.title}
        productPrice={price}
        categoryName="Shopify Formulation"
        description={product.description || "Thoughtfully formulated combining clean ingredients, proven science, and everyday rituals."}
        images={images}
      />
    </main>
  );
}
