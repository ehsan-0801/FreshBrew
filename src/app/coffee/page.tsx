import type { Metadata } from "next";
import Image from "next/image";
import { STAGES } from "@/lib/stages";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Coffee",
  description:
    "How FreshBrew sources, roasts and brews. Origins, roast profiles and the brew methods we use on the bar every day.",
  alternates: { canonical: "/coffee" },
  openGraph: {
    title: "Coffee — FreshBrew",
    description: "Origins, roast profiles and the brew methods we use daily.",
    url: "/coffee",
  },
};

const ORIGINS = [
  {
    region: "Sidamo, Ethiopia",
    notes: "Bergamot, peach, black tea",
    process: "Washed",
  },
  {
    region: "Huila, Colombia",
    notes: "Red apple, cane sugar, cocoa",
    process: "Washed",
  },
  {
    region: "Karnataka, India",
    notes: "Dark chocolate, walnut, clove",
    process: "Natural",
  },
];

export default function CoffeePage() {
  return (
    <>
      <header data-dark-media className="relative isolate flex min-h-[70svh] items-end overflow-hidden bg-coffee text-cream">
        <Image
          src="/images/editorial/beans-hero.webp"
          alt="Roasted coffee beans filling the frame"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-65"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-coffee via-coffee/55 to-coffee/20"
        />

        <div className="shell relative z-10 py-20">
          <p className="eyebrow text-tan/70">The coffee</p>
          <h1 className="mt-6 max-w-3xl text-[clamp(2.75rem,8vw,6rem)] leading-[0.98]">
            Better beans,
            <br />
            <em className="italic text-tan">respected.</em>
          </h1>
        </div>
      </header>

      {/* Process */}
      <section className="shell py-24 sm:py-32">
        <SectionHeading
          eyebrow="The process"
          title="From bean to cup."
          body="Five steps, and none of them are rushed."
        />

        <ol className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
          {STAGES.map((stage, i) => (
            <li key={stage.id}>
              <Reveal delay={(i % 4) as 0 | 1 | 2 | 3}>
                <p className="font-display text-3xl text-caramel">
                  {stage.index}
                </p>
                <h3 className="mt-4 eyebrow font-sans text-espresso/45">
                  {stage.label}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-espresso/70">
                  {stage.copy}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* Origins */}
      <section className="bg-cream py-24 sm:py-32">
        <div className="shell">
          <SectionHeading
            eyebrow="On the bar now"
            title="Three origins."
            body="The list changes with the season. These are pouring this month."
          />

          <ul className="mt-14 divide-y divide-espresso/10 border-y border-espresso/10">
            {ORIGINS.map((origin, i) => (
              <li key={origin.region}>
                <Reveal delay={(i % 3) as 0 | 1 | 2}>
                  <div className="grid gap-2 py-7 sm:grid-cols-[1.2fr_1.4fr_auto] sm:items-baseline sm:gap-8">
                    <h3 className="font-display text-2xl">{origin.region}</h3>
                    <p className="text-espresso/60">{origin.notes}</p>
                    <p className="eyebrow text-espresso/40">{origin.process}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="shell py-24 text-center sm:py-32">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-[clamp(2rem,5vw,3.5rem)] leading-[1.05]">
            Come and taste the difference.
          </h2>
        </Reveal>
        <Reveal delay={1}>
          <ButtonLink href="/menu" size="lg" className="mt-10" withArrow>
            Explore Menu
          </ButtonLink>
        </Reveal>
      </section>
    </>
  );
}
