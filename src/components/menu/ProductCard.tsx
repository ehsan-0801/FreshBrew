"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/products";

/**
 * Restrained hover: the image lifts and scales a touch, and the add button
 * fades up. No card tilt, no shadow bloom.
 */
export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const addItem = useCart((s) => s.addItem);

  const quickAdd = () =>
    addItem(product, {
      size: product.sizes?.[1] ?? product.sizes?.[0],
      milk: product.milkOptions?.[0],
      extras: [],
    });

  return (
    <article className="group relative flex flex-col">
      <Link
        href={`/menu/${product.slug}`}
        data-cursor="View"
        className="relative block aspect-[4/5] overflow-hidden rounded-lg bg-beige"
      >
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 45vw"
          className="object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
        />

        {!product.available && (
          <span className="absolute left-3 top-3 rounded-full bg-coffee/85 px-3 py-1 text-[0.6875rem] tracking-wide text-cream">
            Sold out today
          </span>
        )}
      </Link>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-display text-[1.3rem] leading-tight">
            <Link
              href={`/menu/${product.slug}`}
              className="after:absolute after:inset-0 after:content-['']"
            >
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-espresso/55">
            {product.description}
          </p>
        </div>

        <span className="shrink-0 pt-0.5 text-sm tabular-nums text-espresso/70">
          {formatPrice(product.price)}
        </span>
      </div>

      {product.available && (
        <button
          type="button"
          onClick={quickAdd}
          // Sits above the card-wide link so it stays clickable.
          className="relative z-10 mt-3 self-start rounded-full border border-espresso/20 px-4 py-2 text-[0.8125rem] text-espresso/80 opacity-100 transition-[opacity,transform,border-color,background-color] duration-300 ease-[var(--ease-out-soft)] hover:border-espresso/50 hover:bg-espresso hover:text-cream focus-visible:opacity-100 lg:translate-y-1 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
        >
          Add to order
        </button>
      )}
    </article>
  );
}
