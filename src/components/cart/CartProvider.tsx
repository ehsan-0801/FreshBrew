"use client";

import { type ReactNode } from "react";
import { CartDrawer } from "@/components/cart/CartDrawer";

/**
 * The cart itself lives in a zustand store, so this only mounts the drawer
 * once for the whole app and keeps that detail out of the layout.
 */
export function CartProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <CartDrawer />
    </>
  );
}
