"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { ShopifyCart, CartLineItem } from "@/lib/shopify/types";
import {
  createShopifyCart,
  getShopifyCart,
  addToShopifyCart,
  removeFromShopifyCart,
  updateShopifyCartLine,
} from "@/lib/shopify/mutations/cart";

interface CartContextType {
  cart: ShopifyCart | null;
  isOpen: boolean;
  isLoading: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  checkout: () => void;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_ID_COOKIE = "shopify_cart_id";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize cart on client mount
  useEffect(() => {
    async function initCart() {
      try {
        const storedCartId = localStorage.getItem(CART_ID_COOKIE);
        if (storedCartId) {
          const existingCart = await getShopifyCart(storedCartId);
          if (existingCart) {
            setCart(existingCart);
            return;
          }
        }
      } catch (err) {
        console.warn("[CartContext] Could not restore existing cart session:", err);
      }
    }
    initCart();
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);

  const addItem = useCallback(
    async (variantId: string, quantity = 1) => {
      setIsLoading(true);
      try {
        let updatedCart: ShopifyCart | null = null;
        if (!cart?.id) {
          updatedCart = await createShopifyCart(variantId, quantity);
        } else {
          updatedCart = await addToShopifyCart(cart.id, variantId, quantity);
        }

        if (updatedCart) {
          setCart(updatedCart);
          localStorage.setItem(CART_ID_COOKIE, updatedCart.id);
          setIsOpen(true);
        }
      } catch (err) {
        console.error("[CartContext] Failed to add item to Shopify cart:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [cart?.id]
  );

  const removeItem = useCallback(
    async (lineId: string) => {
      if (!cart?.id) return;
      setIsLoading(true);
      try {
        const updatedCart = await removeFromShopifyCart(cart.id, lineId);
        if (updatedCart) setCart(updatedCart);
      } catch (err) {
        console.error("[CartContext] Failed to remove item:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [cart?.id]
  );

  const updateQuantity = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cart?.id) return;
      setIsLoading(true);
      try {
        if (quantity <= 0) {
          await removeItem(lineId);
        } else {
          const updatedCart = await updateShopifyCartLine(cart.id, lineId, quantity);
          if (updatedCart) setCart(updatedCart);
        }
      } catch (err) {
        console.error("[CartContext] Failed to update line quantity:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [cart?.id, removeItem]
  );

  const checkout = useCallback(() => {
    if (cart?.checkoutUrl) {
      window.location.href = cart.checkoutUrl;
    } else {
      console.warn("[CartContext] No checkout URL available");
    }
  }, [cart?.checkoutUrl]);

  const totalItems = cart?.totalQuantity || 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        isLoading,
        openCart,
        closeCart,
        toggleCart,
        addItem,
        removeItem,
        updateQuantity,
        checkout,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
