"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { Product, ProductOption } from "@/lib/products";
import { useCart, unitPriceFor } from "@/lib/cart-store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Price } from "@/components/ui/Price";

function OptionGroup({
  legend,
  options,
  selectedId,
  onSelect,
}: {
  legend: string;
  options: ProductOption[];
  selectedId?: string;
  onSelect: (option: ProductOption) => void;
}) {
  return (
    <fieldset className="border-t border-espresso/10 pt-6">
      <legend className="eyebrow text-espresso/40">{legend}</legend>
      <div className="mt-4 flex flex-wrap gap-2">
        {options.map((option) => (
          <label
            key={option.id}
            className={cn(
              "cursor-pointer rounded-full border px-5 py-2.5 text-sm transition-colors duration-300",
              option.id === selectedId
                ? "border-espresso bg-espresso text-cream"
                : "border-espresso/15 text-espresso/75 hover:border-espresso/45",
            )}
          >
            <input
              type="radio"
              name={legend}
              value={option.id}
              checked={option.id === selectedId}
              onChange={() => onSelect(option)}
              className="sr-only"
            />
            {option.label}
            {option.priceDelta > 0 && (
              <span
                className={cn(
                  "ml-2 tabular-nums",
                  option.id === selectedId ? "text-cream/60" : "text-espresso/40",
                )}
              >
                +{option.priceDelta}
              </span>
            )}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function ProductDetail({ product }: { product: Product }) {
  const addItem = useCart((s) => s.addItem);

  const [size, setSize] = useState(product.sizes?.[0]);
  const [milk, setMilk] = useState(product.milkOptions?.[0]);
  const [extras, setExtras] = useState<ProductOption[]>([]);
  const [added, setAdded] = useState(false);

  const price = useMemo(
    () => unitPriceFor(product, { size, milk, extras }),
    [product, size, milk, extras],
  );

  const toggleExtra = (extra: ProductOption) =>
    setExtras((current) =>
      current.some((e) => e.id === extra.id)
        ? current.filter((e) => e.id !== extra.id)
        : [...current, extra],
    );

  const handleAdd = () => {
    addItem(product, { size, milk, extras });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="shell grid gap-12 py-10 lg:grid-cols-2 lg:gap-20 lg:py-16">
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-beige lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:aspect-square lg:self-start">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          priority
          sizes="(min-width: 1024px) 46vw, 92vw"
          className="object-cover"
        />
      </div>

      <div>
        <h1 className="text-[clamp(2.5rem,6vw,4rem)] leading-[1.02]">
          {product.name}
        </h1>

        <p className="mt-5 max-w-md text-lg leading-relaxed text-espresso/65">
          {product.detail}
        </p>

        {!product.available && (
          <p className="mt-6 rounded-lg bg-beige px-5 py-4 text-sm text-espresso/70">
            Sold out for today. It will be back tomorrow morning.
          </p>
        )}

        <div className="mt-10 flex flex-col gap-6">
          {product.sizes && (
            <OptionGroup
              legend="Size"
              options={product.sizes}
              selectedId={size?.id}
              onSelect={setSize}
            />
          )}

          {product.milkOptions && (
            <OptionGroup
              legend="Milk"
              options={product.milkOptions}
              selectedId={milk?.id}
              onSelect={setMilk}
            />
          )}

          {product.extras && (
            <fieldset className="border-t border-espresso/10 pt-6">
              <legend className="eyebrow text-espresso/40">Extras</legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {product.extras.map((extra) => {
                  const on = extras.some((e) => e.id === extra.id);
                  return (
                    <label
                      key={extra.id}
                      className={cn(
                        "cursor-pointer rounded-full border px-5 py-2.5 text-sm transition-colors duration-300",
                        on
                          ? "border-espresso bg-espresso text-cream"
                          : "border-espresso/15 text-espresso/75 hover:border-espresso/45",
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={on}
                        onChange={() => toggleExtra(extra)}
                        className="sr-only"
                      />
                      {extra.label}
                      <span
                        className={cn(
                          "ml-2 tabular-nums",
                          on ? "text-cream/60" : "text-espresso/40",
                        )}
                      >
                        +{extra.priceDelta}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          )}
        </div>

        <div className="mt-10 flex items-center justify-between gap-6 border-t border-espresso/10 pt-8">
          <div>
            <p className="eyebrow text-espresso/40">Price</p>
            <p aria-live="polite" className="mt-2 font-display text-4xl">
              <Price amount={price} />
            </p>
          </div>

          <Button
            size="lg"
            onClick={handleAdd}
            disabled={!product.available}
            withArrow={!added}
          >
            {added ? "Added to cart" : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  );
}
