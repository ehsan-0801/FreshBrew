import { FEATURED_PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/menu/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function MenuPreview() {
  return (
    <section className="shell py-24 sm:py-32">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow="The menu"
          title={
            <>
              Something for
              <br />
              every mood.
            </>
          }
        />

        <Reveal delay={2}>
          <ButtonLink href="/menu" variant="secondary" withArrow>
            See the full menu
          </ButtonLink>
        </Reveal>
      </div>

      <ul className="mt-14 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4 lg:gap-x-8">
        {FEATURED_PRODUCTS.map((product, i) => (
          <li key={product.id}>
            <Reveal delay={(i % 4) as 0 | 1 | 2 | 3}>
              <ProductCard product={product} />
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
