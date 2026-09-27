"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart, selectSubtotal, type CartItem } from "@/lib/cart-store";
import { useHydrated } from "@/hooks/useHydrated";
import { formatPrice } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { Price } from "@/components/ui/Price";

function options(item: CartItem) {
  return [item.size?.label, item.milk?.label, ...item.extras.map((e) => e.label)]
    .filter(Boolean)
    .join(" · ");
}

export function CartPageContent() {
  const items = useCart((s) => s.items);
  const setQuantity = useCart((s) => s.setQuantity);
  const removeItem = useCart((s) => s.removeItem);
  const subtotal = useCart(selectSubtotal);
  const hydrated = useHydrated();

  if (!hydrated) {
    return <div className="shell py-20" aria-hidden="true" />;
  }

  if (items.length === 0) {
    return (
      <div className="shell flex flex-col items-start gap-5 py-20">
        <h2 className="font-display text-3xl">Your cup is empty.</h2>
        <p className="text-espresso/60">Find something worth brewing.</p>
        <ButtonLink href="/menu" withArrow>
          Explore Menu
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="shell grid gap-12 py-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20 lg:py-16">
      <ul className="divide-y divide-espresso/10 border-y border-espresso/10">
        {items.map((item) => (
          <li key={item.lineId} className="flex gap-5 py-6">
            <Link
              href={`/menu/${item.slug}`}
              className="relative h-28 w-24 shrink-0 overflow-hidden rounded-md bg-beige"
            >
              <Image
                src={item.image}
                alt=""
                fill
                sizes="96px"
                className="object-cover"
              />
            </Link>

            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="font-display text-xl">
                  <Link href={`/menu/${item.slug}`}>{item.name}</Link>
                </h2>
                <span className="tabular-nums">
                  {formatPrice(item.unitPrice * item.quantity)}
                </span>
              </div>

              {options(item) && (
                <p className="text-sm text-espresso/55">{options(item)}</p>
              )}

              <div className="mt-auto flex items-center justify-between gap-4 pt-2">
                <div className="inline-flex items-center rounded-full border border-espresso/15">
                  <button
                    type="button"
                    onClick={() => setQuantity(item.lineId, item.quantity - 1)}
                    aria-label={`Decrease quantity of ${item.name}`}
                    className="grid h-9 w-9 place-items-center rounded-full text-espresso/70 hover:text-espresso"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-sm tabular-nums">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(item.lineId, item.quantity + 1)}
                    aria-label={`Increase quantity of ${item.name}`}
                    className="grid h-9 w-9 place-items-center rounded-full text-espresso/70 hover:text-espresso"
                  >
                    +
                  </button>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <Link
                    href={`/menu/${item.slug}`}
                    className="text-espresso/50 underline-offset-4 hover:text-espresso hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => removeItem(item.lineId)}
                    className="text-espresso/45 underline-offset-4 hover:text-espresso hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <aside className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
        <div className="rounded-lg bg-cream p-7">
          <h2 className="font-display text-2xl">Summary</h2>

          <div className="mt-6 flex items-baseline justify-between border-t border-espresso/10 pt-6">
            <span className="text-sm text-espresso/65">Subtotal</span>
            <span className="font-display text-3xl">
              <Price amount={subtotal} />
            </span>
          </div>

          <ButtonLink href="/checkout" size="lg" className="mt-7 w-full" withArrow>
            Checkout
          </ButtonLink>
        </div>
      </aside>
    </div>
  );
}
