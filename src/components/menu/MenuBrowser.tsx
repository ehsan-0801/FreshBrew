"use client";

import { useState } from "react";
import { CATEGORIES, PRODUCTS, type CategoryId } from "@/lib/products";
import { ProductCard } from "@/components/menu/ProductCard";
import { cn } from "@/lib/utils";

type Filter = CategoryId | "all";

export function MenuBrowser() {
  const [filter, setFilter] = useState<Filter>("all");

  const visible =
    filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);

  const activeCategory = CATEGORIES.find((c) => c.id === filter);

  return (
    <div className="shell pb-24 pt-12 sm:pb-32">
      {/* Category filter */}
      <div className="sticky top-[var(--header-h)] z-30 -mx-[clamp(1.25rem,5vw,5rem)] border-b border-espresso/10 bg-warmwhite/90 px-[clamp(1.25rem,5vw,5rem)] py-4 backdrop-blur-xl">
        <div
          role="tablist"
          aria-label="Menu categories"
          className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1"
        >
          {([{ id: "all", label: "All" }, ...CATEGORIES] as const).map((cat) => {
            const selected = filter === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setFilter(cat.id as Filter)}
                className={cn(
                  "shrink-0 rounded-full px-5 py-2.5 text-sm transition-colors duration-300",
                  selected
                    ? "bg-espresso text-cream"
                    : "border border-espresso/15 text-espresso/70 hover:border-espresso/40 hover:text-espresso",
                )}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {activeCategory && (
        <p className="mt-10 max-w-md font-display text-2xl text-espresso/70">
          {activeCategory.blurb}
        </p>
      )}

      {/* Keeps the outline h1 -> h2 -> h3; the product cards are h3. */}
      <h2 className="sr-only">
        {activeCategory ? activeCategory.label : "All items"}
      </h2>

      <p aria-live="polite" className="sr-only">
        {visible.length} item{visible.length === 1 ? "" : "s"} shown
      </p>

      <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-8">
        {visible.map((product, i) => (
          <li key={product.id}>
            <ProductCard product={product} priority={i < 4} />
          </li>
        ))}
      </ul>
    </div>
  );
}
