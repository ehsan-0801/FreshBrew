"use client";

import { useState } from "react";
import Image from "next/image";
import { LATTE_VARIANTS, getProductBySlug } from "@/lib/products";
import { useCart } from "@/lib/cart-store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Price } from "@/components/ui/Price";
import { Reveal } from "@/components/ui/Reveal";

export function SignatureCoffee() {
  const [activeId, setActiveId] = useState(LATTE_VARIANTS[1].id);
  const addItem = useCart((s) => s.addItem);

  const active =
    LATTE_VARIANTS.find((v) => v.id === activeId) ?? LATTE_VARIANTS[0];

  const addToOrder = () => {
    const product = getProductBySlug("house-latte");
    if (!product) return;

    const flavour = product.extras?.find((e) => e.id === active.id);
    addItem(product, {
      size: product.sizes?.[1],
      milk: product.milkOptions?.[0],
      extras: flavour ? [flavour] : [],
    });
  };

  return (
    <section
      aria-labelledby="signature-heading"
      data-dark-media
      className="relative isolate overflow-hidden bg-coffee py-24 text-cream sm:py-32"
    >
      {/* The flavour tints a pool of light behind the cup rather than
          flooding the whole panel, so the section keeps its depth. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-1/2 h-[46rem] w-[46rem] -translate-y-1/2 rounded-full opacity-45 blur-3xl transition-[background-color] duration-700 ease-[var(--ease-out-soft)] lg:right-[2%]"
        style={{ backgroundColor: active.tone }}
      />

      <div className="shell relative grid gap-14 lg:grid-cols-[0.95fr_1fr] lg:items-center lg:gap-24">
        <div className="order-2 lg:order-1">
          <Reveal>
            <p className="eyebrow text-tan">Signature</p>
          </Reveal>

          <Reveal delay={1}>
            <h2
              id="signature-heading"
              className="mt-6 text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02]"
            >
              Meet the
              <br />
              <em className="italic text-tan">House Latte.</em>
            </h2>
          </Reveal>

          <Reveal delay={2}>
            <div
              role="tablist"
              aria-label="Latte flavours"
              className="mt-10 flex flex-wrap gap-2"
            >
              {LATTE_VARIANTS.map((variant) => {
                const selected = variant.id === active.id;
                return (
                  <button
                    key={variant.id}
                    role="tab"
                    type="button"
                    aria-selected={selected}
                    aria-controls="signature-panel"
                    onClick={() => setActiveId(variant.id)}
                    className={cn(
                      "rounded-full px-5 py-2.5 text-sm transition-[background-color,border-color,color] duration-300",
                      selected
                        ? "bg-cream text-espresso"
                        : "border border-cream/25 text-cream/70 hover:border-cream/60 hover:text-cream",
                    )}
                  >
                    {variant.name}
                  </button>
                );
              })}
            </div>
          </Reveal>

          <div id="signature-panel" role="tabpanel" aria-live="polite">
            <p className="mt-9 max-w-sm text-lg leading-relaxed text-cream/70">
              {active.description}
            </p>

            <p className="mt-8 font-display text-[clamp(2.5rem,5vw,3.5rem)] leading-none">
              <Price amount={active.price} />
            </p>
          </div>

          <Reveal delay={3}>
            <Button
              onClick={addToOrder}
              size="lg"
              className="mt-10 bg-cream text-espresso hover:bg-warmwhite"
              withArrow
            >
              Add to Order
            </Button>
          </Reveal>
        </div>

        {/* A tall editorial frame beats a circle: it matches the photography
            elsewhere on the page and never crops the glass awkwardly. */}
        <Reveal
          variant="image"
          className="relative order-1 aspect-[4/5] overflow-hidden rounded-lg bg-espresso lg:order-2 lg:aspect-[4/4.8]"
        >
          {LATTE_VARIANTS.map((variant) => (
            <Image
              key={variant.id}
              src={variant.image}
              alt={variant.id === active.id ? variant.imageAlt : ""}
              aria-hidden={variant.id !== active.id}
              fill
              sizes="(min-width: 1024px) 48vw, 92vw"
              className={cn(
                "object-cover transition-[opacity,transform] duration-700 ease-[var(--ease-out-soft)]",
                variant.id === active.id
                  ? "scale-100 opacity-100"
                  : "scale-[1.04] opacity-0",
              )}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
