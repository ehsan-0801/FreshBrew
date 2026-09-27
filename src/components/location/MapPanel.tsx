import { LOCATION } from "@/lib/constants";

/**
 * A plain, fast map: a static OpenStreetMap embed with a marker. No API key,
 * no third-party script, and it stays legible at every size.
 */
export function MapPanel() {
  const delta = 0.006;
  const bbox = [
    LOCATION.longitude - delta,
    LOCATION.latitude - delta / 2,
    LOCATION.longitude + delta,
    LOCATION.latitude + delta / 2,
  ].join("%2C");

  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${LOCATION.latitude}%2C${LOCATION.longitude}`;

  return (
    <div className="relative h-full min-h-[24rem] overflow-hidden rounded-lg bg-beige">
      <iframe
        src={src}
        title={`Map showing ${LOCATION.name} in ${LOCATION.city}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full w-full border-0 grayscale-[0.35] contrast-[0.95] saturate-[0.8]"
      />

      <div className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-warmwhite/95 px-4 py-2 text-xs text-espresso shadow-sm backdrop-blur">
        {LOCATION.name} · {LOCATION.street}
      </div>
    </div>
  );
}
