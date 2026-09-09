import React from "react";
import { ShopifyProduct } from "@/lib/shopify/types";
import { ShopifyProductGrid } from "../ShopifyProductGrid";
import { Section } from "../Section";

interface ProductsProps {
  products?: ShopifyProduct[];
}

export function Products({ products = [] }: ProductsProps) {
  return (
    <div>
      {/* Live Shopify Products Catalog */}
      <div style={{ paddingTop: "60px", background: "linear-gradient(180deg, #f7f7fc 0%, #ffffff 100%)" }}>
        <ShopifyProductGrid products={products} />
      </div>

      {/* Brand & Editorial Experience Section */}
      <Section />
    </div>
  );
}
