import { LOCATION } from "@/lib/constants";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { MapPanel } from "@/components/location/MapPanel";

export function Location() {
  return (
    <section
      aria-labelledby="location-heading"
      className="shell py-24 sm:py-32"
    >
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <p className="eyebrow text-caramel">Visit us</p>
          </Reveal>

          <Reveal delay={1}>
            <h2
              id="location-heading"
              className="mt-6 text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02]"
            >
              Come find us.
            </h2>
          </Reveal>

          <Reveal delay={2}>
            <address className="mt-9 flex flex-col gap-1 text-lg not-italic leading-relaxed text-espresso/70">
              <span className="font-display text-2xl text-espresso">
                {LOCATION.name}
              </span>
              <span>{LOCATION.street}</span>
              <span>
                {LOCATION.city}, {LOCATION.country}
              </span>
            </address>
          </Reveal>

          <Reveal delay={3}>
            <p className="mt-6 text-espresso/60">
              Open every day
              <br />
              <span className="tabular-nums">
                {LOCATION.opens} — {LOCATION.closes}
              </span>
            </p>
          </Reveal>

          <Reveal delay={3}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href={LOCATION.directionsUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="w-full sm:w-auto"
                withArrow
              >
                Get Directions
              </ButtonLink>
              <ButtonLink
                href={LOCATION.phoneHref}
                variant="secondary"
                className="w-full sm:w-auto"
              >
                Call Us
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={4}>
            <dl className="mt-12 grid gap-6 border-t border-espresso/10 pt-8 sm:grid-cols-2">
              {LOCATION.amenities.map((item) => (
                <div key={item.label}>
                  <dt className="eyebrow text-espresso/40">{item.label}</dt>
                  <dd className="mt-2 text-sm text-espresso/70">{item.detail}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={1} className="min-h-[24rem] lg:min-h-0">
          <MapPanel />
        </Reveal>
      </div>
    </section>
  );
}
