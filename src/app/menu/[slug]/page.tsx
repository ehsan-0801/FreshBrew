import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BRAND } from "@/lib/constants";
import { PRODUCTS, getProductBySlug } from "@/lib/products";
import { ProductDetail } from "@/components/menu/ProductDetail";
import { formatPrice } from "@/lib/utils";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/menu/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) return { title: "Not found" };

  return {
    title: product.name,
    description: product.detail,
    alternates: { canonical: `/menu/${product.slug}` },
    openGraph: {
      title: `${product.name} — ${BRAND.name}`,
      description: product.detail,
      url: `/menu/${product.slug}`,
    },
  };
}

export default async function ProductPage({ params }: PageProps<"/menu/[slug]">) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.detail,
    brand: { "@type": "Brand", name: BRAND.name },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "BDT",
      availability: product.available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${BRAND.url}/menu/${product.slug}`,
    },
  };

  return (
    <div className="pt-[calc(var(--header-h)+2rem)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav aria-label="Breadcrumb" className="shell">
        <ol className="flex items-center gap-2 text-sm text-espresso/50">
          <li>
            <Link href="/menu" className="transition-colors hover:text-espresso">
              Menu
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-espresso/80">{product.name}</li>
        </ol>
      </nav>

      <ProductDetail product={product} />

      <section className="shell border-t border-espresso/10 py-16">
        <h2 className="font-display text-2xl">More from the menu</h2>
        <ul className="mt-8 flex flex-wrap gap-3">
          {PRODUCTS.filter(
            (p) => p.category === product.category && p.id !== product.id,
          )
            .slice(0, 5)
            .map((p) => (
              <li key={p.id}>
                <Link
                  href={`/menu/${p.slug}`}
                  className="inline-flex items-center gap-3 rounded-full border border-espresso/15 px-5 py-2.5 text-sm transition-colors hover:border-espresso/45"
                >
                  {p.name}
                  <span className="tabular-nums text-espresso/50">
                    {formatPrice(p.price)}
                  </span>
                </Link>
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
}
