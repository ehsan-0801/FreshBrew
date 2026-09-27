"use client";

import { useState } from "react";
import { useCart, selectSubtotal } from "@/lib/cart-store";
import { useHydrated } from "@/hooks/useHydrated";
import { formatPrice } from "@/lib/utils";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Price } from "@/components/ui/Price";

const PICKUP_TIMES = ["As soon as possible", "In 15 minutes", "In 30 minutes"];

function Field({
  id,
  label,
  type = "text",
  required,
  autoComplete,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="eyebrow text-espresso/45">
        {label}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="h-12 rounded-lg border border-espresso/15 bg-warmwhite px-4 text-base transition-colors placeholder:text-espresso/30 hover:border-espresso/30 focus:border-espresso/50"
      />
    </div>
  );
}

export function CheckoutForm() {
  const items = useCart((s) => s.items);
  const subtotal = useCart(selectSubtotal);
  const clear = useCart((s) => s.clear);
  const hydrated = useHydrated();
  const [placed, setPlaced] = useState(false);

  if (hydrated && items.length === 0 && !placed) {
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

  if (placed) {
    return (
      <div className="shell flex flex-col items-start gap-5 py-20">
        <h2 className="font-display text-4xl">Order received.</h2>
        <p className="max-w-md leading-relaxed text-espresso/65">
          We are pulling your shots now. Come to the counter and give your name
          when you arrive.
        </p>
        <ButtonLink href="/" variant="secondary" className="mt-2">
          Back home
        </ButtonLink>
      </div>
    );
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // No payment provider yet — the flow ends at confirmation.
    clear();
    setPlaced(true);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="shell grid gap-12 py-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20 lg:py-16"
    >
      <div className="flex flex-col gap-8">
        <fieldset className="flex flex-col gap-5">
          <legend className="font-display text-2xl">Your details</legend>
          <Field id="name" label="Name" required autoComplete="name" />
          <Field id="phone" label="Phone" type="tel" required autoComplete="tel" />
        </fieldset>

        <fieldset className="border-t border-espresso/10 pt-8">
          <legend className="font-display text-2xl">Pickup</legend>
          <div className="mt-5 flex flex-wrap gap-2">
            {PICKUP_TIMES.map((time, i) => (
              <label
                key={time}
                className="cursor-pointer rounded-full border border-espresso/15 px-5 py-2.5 text-sm transition-colors hover:border-espresso/45 has-checked:border-espresso has-checked:bg-espresso has-checked:text-cream"
              >
                <input
                  type="radio"
                  name="pickup"
                  value={time}
                  defaultChecked={i === 0}
                  className="sr-only"
                />
                {time}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <aside className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
        <div className="rounded-lg bg-cream p-7">
          <h2 className="font-display text-2xl">Your order</h2>

          <ul className="mt-6 flex flex-col gap-4 border-b border-espresso/10 pb-6">
            {hydrated &&
              items.map((item) => (
                <li key={item.lineId} className="flex justify-between gap-4 text-sm">
                  <span className="text-espresso/75">
                    {item.quantity} × {item.name}
                    {item.size && (
                      <span className="text-espresso/45"> · {item.size.label}</span>
                    )}
                  </span>
                  <span className="shrink-0 tabular-nums">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>
                </li>
              ))}
          </ul>

          <div className="mt-6 flex items-baseline justify-between">
            <span className="text-sm text-espresso/65">Total</span>
            <span className="font-display text-3xl">
              {hydrated ? <Price amount={subtotal} /> : "—"}
            </span>
          </div>

          <Button type="submit" size="lg" className="mt-7 w-full" withArrow>
            Place Order
          </Button>

          <p className="mt-4 text-xs leading-relaxed text-espresso/45">
            Pay at the counter when you collect. No card details are taken here.
          </p>
        </div>
      </aside>
    </form>
  );
}
