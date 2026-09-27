"use client";

import { useCart, selectCount } from "@/lib/cart-store";
import { useHydrated } from "@/hooks/useHydrated";
import { cn } from "@/lib/utils";

export function CartButton({ onDark }: { onDark: boolean }) {
  const openCart = useCart((s) => s.openCart);
  const count = useCart(selectCount);
  const hydrated = useHydrated();

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={
        hydrated && count > 0
          ? `Open your order, ${count} item${count === 1 ? "" : "s"}`
          : "Open your order"
      }
      className={cn(
        "relative grid h-11 w-11 place-items-center rounded-full transition-colors",
        onDark ? "text-cream hover:bg-cream/10" : "text-espresso hover:bg-espresso/5",
      )}
    >
      <svg width="19" height="19" viewBox="0 0 20 20" aria-hidden="true" fill="none">
        <path
          d="M4 6h12l-1.1 10.2a1.5 1.5 0 0 1-1.5 1.3H6.6a1.5 1.5 0 0 1-1.5-1.3L4 6Z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M7.2 6V4.9a2.8 2.8 0 0 1 5.6 0V6"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>

      {hydrated && count > 0 && (
        <span
          className={cn(
            "absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full px-1 text-[0.625rem] font-medium tabular-nums",
            onDark ? "bg-cream text-espresso" : "bg-caramel text-warmwhite",
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
}
