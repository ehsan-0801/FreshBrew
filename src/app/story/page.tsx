import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Why FreshBrew exists: where it started, what we believe, and how we source, roast and serve our coffee in Dhaka.",
  alternates: { canonical: "/story" },
  openGraph: {
    title: "Our Story — FreshBrew Coffee",
    description:
      "Where it started, what we believe, and how we source, roast and serve.",
    url: "/story",
  },
};

const CHAPTERS = [
  {
    id: "start",
    label: "Where it started",
    copy: "One machine, a borrowed grinder, and a corner of a friend's shop in Banani. We opened because the coffee we wanted to drink was not being made anywhere near us.",
    image: "/images/story/where-it-started.webp",
    alt: "The original espresso machine on a small counter",
  },
  {
    id: "believe",
    label: "What we believe",
    copy: "Coffee is agricultural. It has a season, an origin, and a person behind it. Treating it like a commodity is the fastest way to make it taste like one.",
    image: "/images/story/what-we-believe.webp",
    alt: "Hands cupping a bowl of freshly ground coffee",
  },
  {
    id: "source",
    label: "How we source",
    copy: "We buy small lots and we buy them repeatedly. Paying above market for the same farms every season is the only way any of this holds up.",
    image: "/images/story/how-we-source.webp",
    alt: "Green coffee beans before roasting",
  },
  {
    id: "roast",
    label: "How we roast",
    copy: "Weekly, in small batches, in Dhaka. Light enough to keep the origin legible, dark enough to survive milk. Every batch is cupped before it reaches the bar.",
    image: "/images/story/how-we-roast.webp",
    alt: "Beans tumbling in the roaster drum",
  },
  {
    id: "serve",
    label: "How we serve",
    copy: "Without ceremony. If you want it black in a paper cup on the way to work, that is a good way to drink coffee too.",
    image: "/images/story/how-we-serve.webp",
    alt: "A barista passing a cup across the counter",
  },
];

export default function StoryPage() {
  return (
    <>
      <header data-dark-media className="relative isolate flex min-h-[70svh] items-end overflow-hidden bg-coffee text-cream">
        <Image
          src="/images/story/hero.webp"
          alt="The FreshBrew counter early in the morning"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-coffee via-coffee/60 to-coffee/20"
        />

        <div className="shell relative z-10 py-20">
          <p className="eyebrow text-tan/70">Our story</p>
          <h1 className="mt-6 max-w-3xl text-[clamp(2.75rem,8vw,6rem)] leading-[0.98]">
            Why <em className="italic text-tan">FreshBrew?</em>
          </h1>
          <p className="mt-7 max-w-md leading-relaxed text-cream/65">
            It began with a simple frustration and turned into a room people
            keep coming back to.
          </p>
        </div>
      </header>

      {CHAPTERS.map((chapter, i) => (
        <section
          key={chapter.id}
          aria-labelledby={`${chapter.id}-heading`}
          className={i % 2 === 1 ? "bg-cream" : undefined}
        >
          <div className="shell grid gap-10 py-20 lg:grid-cols-2 lg:items-center lg:gap-20 lg:py-28">
            <div className={i % 2 === 1 ? "lg:order-2" : undefined}>
              <Reveal>
                <p className="eyebrow text-caramel">
                  {String(i + 1).padStart(2, "0")}
                </p>
              </Reveal>
              <Reveal delay={1}>
                <h2
                  id={`${chapter.id}-heading`}
                  className="mt-5 text-[clamp(2rem,5vw,3.5rem)] leading-[1.05]"
                >
                  {chapter.label}
                </h2>
              </Reveal>
              <Reveal delay={2}>
                <p className="mt-7 max-w-md text-lg leading-relaxed text-espresso/65">
                  {chapter.copy}
                </p>
              </Reveal>
            </div>

            <Reveal
              variant="image"
              className={`relative aspect-[4/3] overflow-hidden rounded-lg bg-beige ${
                i % 2 === 1 ? "lg:order-1" : ""
              }`}
            >
              <Image
                src={chapter.image}
                alt={chapter.alt}
                fill
                sizes="(min-width: 1024px) 48vw, 92vw"
                className="object-cover"
              />
            </Reveal>
          </div>
        </section>
      ))}

      <section className="shell py-24 text-center sm:py-32">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-[clamp(2rem,5vw,3.5rem)] leading-[1.05]">
            The rest is easier to taste than to read.
          </h2>
        </Reveal>
        <Reveal delay={1}>
          <ButtonLink href="/visit" size="lg" className="mt-10" withArrow>
            Visit Us
          </ButtonLink>
        </Reveal>
      </section>
    </>
  );
}
