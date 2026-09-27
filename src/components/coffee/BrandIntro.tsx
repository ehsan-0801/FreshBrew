import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

export function BrandIntro() {
  return (
    <section className="shell py-24 sm:py-32 lg:py-40">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-20">
        <div>
          <Reveal>
            <p className="eyebrow text-caramel">More than coffee</p>
          </Reveal>

          <Reveal delay={1}>
            <h2 className="mt-6 text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02]">
              A place for
              <br />
              <em className="italic text-caramel">slow mornings.</em>
            </h2>
          </Reveal>

          <Reveal delay={2}>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-espresso/65">
              FreshBrew is a place for slow mornings, late conversations, focused
              afternoons, and everything in between.
            </p>
          </Reveal>

          <Reveal delay={3}>
            <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-espresso/10 pt-8 sm:grid-cols-3">
              {[
                { term: "Roasted", detail: "In Dhaka, weekly" },
                { term: "Open", detail: "08:00 — 23:00" },
                { term: "Seats", detail: "48, two floors" },
              ].map((item) => (
                <div key={item.term}>
                  <dt className="eyebrow text-espresso/40">{item.term}</dt>
                  <dd className="mt-2 text-sm text-espresso/75">{item.detail}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal variant="image" className="relative aspect-[4/5] overflow-hidden rounded-lg bg-beige lg:aspect-[3/4]">
          <Image
            src="/images/editorial/brand-intro.webp"
            alt="Morning light across a table in the FreshBrew café"
            fill
            sizes="(min-width: 1024px) 50vw, 92vw"
            className="object-cover"
          />
        </Reveal>
      </div>
    </section>
  );
}
