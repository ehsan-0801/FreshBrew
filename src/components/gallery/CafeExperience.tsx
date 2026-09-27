import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function CafeExperience() {
  return (
    <section
      data-dark-media
      className="relative isolate flex min-h-[85svh] items-end overflow-hidden bg-coffee text-cream"
    >
      <Image
        src="/images/editorial/cafe-night.webp"
        alt="The FreshBrew room in the evening, warm light over the counter"
        fill
        sizes="100vw"
        className="object-cover opacity-70"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-coffee via-coffee/55 to-coffee/15"
      />

      <div className="shell relative z-10 py-20 sm:py-28">
        <div className="max-w-2xl">
          <Reveal>
            <p className="eyebrow text-tan/70">The café</p>
          </Reveal>

          <Reveal delay={1}>
            <h2 className="mt-6 text-[clamp(2.5rem,7vw,5rem)] leading-[1.02]">
              Stay a little longer.
            </h2>
          </Reveal>

          <Reveal delay={2}>
            <p className="mt-8 font-display text-2xl leading-snug text-tan sm:text-3xl">
              Good coffee.
              <br />
              Good music.
              <br />
              Good conversations.
            </p>
          </Reveal>

          <Reveal delay={3}>
            <p className="mt-7 max-w-md leading-relaxed text-cream/65">
              A space to work, meet, read, think, or simply disappear for an
              hour.
            </p>
          </Reveal>

          <Reveal delay={4}>
            <ButtonLink
              href="/visit"
              size="lg"
              className="mt-9 bg-cream text-espresso hover:bg-warmwhite"
              withArrow
            >
              Explore the Café
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
