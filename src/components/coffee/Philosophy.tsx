import { Reveal } from "@/components/ui/Reveal";

export function Philosophy() {
  return (
    <section className="bg-cream py-28 sm:py-36 lg:py-44">
      <div className="shell flex flex-col items-center text-center">
        <Reveal>
          <p className="eyebrow text-caramel">Our philosophy</p>
        </Reveal>

        <Reveal delay={1}>
          {/* Held near 20 words a line so the statement reads as one breath. */}
          <h2 className="mt-8 max-w-[18ch] text-[clamp(2.5rem,6.5vw,5rem)] leading-[1.04]">
            We believe coffee{" "}
            <em className="italic text-caramel">deserves time.</em>
          </h2>
        </Reveal>

        <Reveal delay={2}>
          <span
            aria-hidden="true"
            className="mt-12 block h-px w-16 bg-espresso/25"
          />
        </Reveal>

        <Reveal delay={3}>
          <p className="mt-12 max-w-[52ch] text-lg leading-relaxed text-espresso/65 sm:text-xl">
            Great coffee isn&rsquo;t about rushing through a cup. It&rsquo;s
            about choosing better beans, respecting the process, and giving
            every detail the attention it deserves.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
