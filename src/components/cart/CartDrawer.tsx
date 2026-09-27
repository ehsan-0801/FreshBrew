"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useCart, selectSubtotal, type CartItem } from "@/lib/cart-store";
import { useHydrated } from "@/hooks/useHydrated";
import { formatPrice } from "@/lib/utils";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Price } from "@/components/ui/Price";

function optionSummary(item: CartItem) {
  return [item.size?.label, item.milk?.label, ...item.extras.map((e) => e.label)]
    .filter(Boolean)
    .join(" · ");
}

function QuantityStepper({ item }: { item: CartItem }) {
  const setQuantity = useCart((s) => s.setQuantity);

  return (
    <div className="inline-flex items-center rounded-full border border-espresso/15">
      <button
        type="button"
        onClick={() => setQuantity(item.lineId, item.quantity - 1)}
        aria-label={`Decrease quantity of ${item.name}`}
        className="grid h-8 w-8 place-items-center rounded-full text-espresso/70 transition-colors hover:text-espresso"
      >
        −
      </button>
      <span
        aria-live="polite"
        className="w-7 text-center text-sm tabular-nums"
      >
        {item.quantity}
      </span>
      <button
        type="button"
        onClick={() => setQuantity(item.lineId, item.quantity + 1)}
        aria-label={`Increase quantity of ${item.name}`}
        className="grid h-8 w-8 place-items-center rounded-full text-espresso/70 transition-colors hover:text-espresso"
      >
        +
      </button>
    </div>
  );
}

export function CartDrawer() {
  const isOpen = useCart((s) => s.isOpen);
  const closeCart = useCart((s) => s.closeCart);
  const items = useCart((s) => s.items);
  const removeItem = useCart((s) => s.removeItem);
  const subtotal = useCart(selectSubtotal);
  const hydrated = useHydrated();

  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previous = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    // Wait for the panel to be painted as visible; focusing a still-hidden
    // element is a no-op in every browser.
    const focusFrame = requestAnimationFrame(() => closeRef.current?.focus());

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const onClose = () => closeCart();

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [isOpen, closeCart]);

  const empty = hydrated && items.length === 0;

  return (
    <div
      // Same reason as the mobile menu: never animate `visibility`, or the
      // panel cannot take focus while it is opening.
      inert={!isOpen}
      className={`fixed inset-0 z-[80] ${isOpen ? "" : "pointer-events-none"}`}
    >
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-coffee/45 backdrop-blur-[2px] transition-opacity duration-400 ease-[var(--ease-out-soft)] ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Your order"
        className={`absolute right-0 top-0 flex h-full w-full max-w-[26rem] flex-col bg-warmwhite shadow-2xl transition-transform duration-500 ease-[var(--ease-out-soft)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-espresso/10 px-6 py-5">
          <h2 className="font-display text-2xl">Your Order</h2>
          <button
            ref={closeRef}
            type="button"
            onClick={closeCart}
            aria-label="Close your order"
            className="-mr-2 grid h-10 w-10 place-items-center rounded-full text-espresso/60 transition-colors hover:text-espresso"
          >
            <svg width="15" height="15" viewBox="0 0 18 18" aria-hidden="true">
              <path
                d="M1 1l16 16M17 1L1 17"
                stroke="currentColor"
                strokeWidth="1.4"
                fill="none"
              />
            </svg>
          </button>
        </div>

        {empty ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <h3 className="font-display text-3xl">Your cup is empty.</h3>
            <p className="text-sm text-espresso/60">
              Find something worth brewing.
            </p>
            <ButtonLink href="/menu" onClick={closeCart} className="mt-2" withArrow>
              Explore Menu
            </ButtonLink>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-espresso/8 overflow-y-auto px-6">
              {items.map((item) => (
                <li key={item.lineId} className="flex gap-4 py-5">
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-md bg-beige">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-lg leading-tight">
                        {item.name}
                      </h3>
                      <span className="text-sm tabular-nums text-espresso/80">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </span>
                    </div>

                    {optionSummary(item) && (
                      <p className="text-xs leading-relaxed text-espresso/55">
                        {optionSummary(item)}
                      </p>
                    )}

                    <div className="mt-1 flex items-center justify-between gap-3">
                      <QuantityStepper item={item} />
                      <button
                        type="button"
                        onClick={() => removeItem(item.lineId)}
                        className="text-xs text-espresso/45 underline-offset-4 transition-colors hover:text-espresso hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-espresso/10 px-6 py-6">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-espresso/65">Subtotal</span>
                <span className="font-display text-2xl">
                  <Price amount={subtotal} />
                </span>
              </div>
              <p className="mt-1.5 text-xs text-espresso/45">
                Taxes are calculated at checkout.
              </p>

              <ButtonLink
                href="/checkout"
                onClick={closeCart}
                size="lg"
                className="mt-5 w-full"
                withArrow
              >
                Checkout
              </ButtonLink>

              <Button
                variant="ghost"
                size="sm"
                onClick={closeCart}
                className="mt-1 w-full"
              >
                Keep browsing
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
