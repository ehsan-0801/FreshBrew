import { ButtonLink } from "@/components/ui/Button";
import { STAGES } from "@/lib/stages";

/**
 * The copy that sits over the video. Rendered identically in both the
 * scrubbed and the stacked versions, so the words are always in the HTML
 * whether or not the video ever plays.
 */
export function HeroCopy() {
  return (
    <>
      <p className="eyebrow mb-6 text-tan/80">Dhaka · Est. 2026</p>

      <h1 className="font-display text-[clamp(2.75rem,9vw,6.5rem)] leading-[0.95] tracking-[-0.02em]">
        Coffee,
        <br />
        <em className="italic text-tan">crafted slowly.</em>
      </h1>

      <p className="mt-7 max-w-md text-base leading-relaxed text-cream/70 sm:text-lg">
        Thoughtfully sourced beans, carefully roasted, and brewed for moments
        worth staying for.
      </p>

      <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
        <ButtonLink
          href="/menu"
          size="lg"
          className="w-full bg-cream text-espresso hover:bg-warmwhite sm:w-auto"
          withArrow
        >
          Explore Menu
        </ButtonLink>
        <ButtonLink
          href="/menu"
          size="lg"
          variant="secondary"
          className="w-full border-cream/30 text-cream hover:border-cream/70 hover:bg-cream/10 sm:w-auto"
        >
          Order a Coffee
        </ButtonLink>
      </div>
    </>
  );
}

export function StageCopy({ stage }: { stage: (typeof STAGES)[number] }) {
  return (
    <>
      <div className="flex items-baseline gap-4">
        <span className="font-display text-2xl text-tan">{stage.index}</span>
        <span className="eyebrow text-cream/50">{stage.label}</span>
      </div>
      <p className="mt-4 max-w-sm text-lg leading-relaxed text-cream/80 sm:text-xl">
        {stage.copy}
      </p>
    </>
  );
}
