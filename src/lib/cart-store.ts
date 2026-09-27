"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Product, ProductOption } from "@/lib/products";

export interface CartItem {
  /** Stable per product + option combination, so repeats stack. */
  lineId: string;
  productId: string;
  slug: string;
  name: string;
  image: string;
  /** Unit price with all option deltas already applied. */
  unitPrice: number;
  quantity: number;
  size?: ProductOption;
  milk?: ProductOption;
  extras: ProductOption[];
}

export interface Selection {
  size?: ProductOption;
  milk?: ProductOption;
  extras?: ProductOption[];
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, selection?: Selection, quantity?: number) => void;
  removeItem: (lineId: string) => void;
  setQuantity: (lineId: string, quantity: number) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
}

export function unitPriceFor(product: Product, selection: Selection = {}) {
  const extras = selection.extras ?? [];
  return (
    product.price +
    (selection.size?.priceDelta ?? 0) +
    (selection.milk?.priceDelta ?? 0) +
    extras.reduce((sum, e) => sum + e.priceDelta, 0)
  );
}

function lineIdFor(product: Product, selection: Selection = {}) {
  const extras = (selection.extras ?? []).map((e) => e.id).sort().join("+");
  return [product.id, selection.size?.id, selection.milk?.id, extras]
    .filter(Boolean)
    .join("__");
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,

      addItem: (product, selection = {}, quantity = 1) =>
        set((state) => {
          const lineId = lineIdFor(product, selection);
          const existing = state.items.find((i) => i.lineId === lineId);

          const items = existing
            ? state.items.map((i) =>
                i.lineId === lineId
                  ? { ...i, quantity: i.quantity + quantity }
                  : i,
              )
            : [
                ...state.items,
                {
                  lineId,
                  productId: product.id,
                  slug: product.slug,
                  name: product.name,
                  image: product.image,
                  unitPrice: unitPriceFor(product, selection),
                  quantity,
                  size: selection.size,
                  milk: selection.milk,
                  extras: selection.extras ?? [],
                } satisfies CartItem,
              ];

          return { items, isOpen: true };
        }),

      removeItem: (lineId) =>
        set((state) => ({ items: state.items.filter((i) => i.lineId !== lineId) })),

      setQuantity: (lineId, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.lineId !== lineId)
              : state.items.map((i) =>
                  i.lineId === lineId ? { ...i, quantity } : i,
                ),
        })),

      clear: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    }),
    {
      name: "freshbrew-cart",
      storage: createJSONStorage(() => localStorage),
      // The drawer should never be reopened by a page refresh.
      partialize: (state) => ({ items: state.items }) as CartState,
    },
  ),
);

export const selectCount = (state: CartState) =>
  state.items.reduce((n, i) => n + i.quantity, 0);

export const selectSubtotal = (state: CartState) =>
  state.items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
