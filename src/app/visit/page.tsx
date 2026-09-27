import type { Metadata } from "next";
import Image from "next/image";
import { LOCATION } from "@/lib/constants";
import { Location } from "@/components/location/Location";
import { Gallery } from "@/components/gallery/Gallery";

export const metadata: Metadata = {
  title: "Visit Us",
  description: `${LOCATION.name} in ${LOCATION.street}, ${LOCATION.city}. Open every day ${LOCATION.opens} — ${LOCATION.closes}. Free Wi-Fi, 48 seats, outlets at every table.`,
  alternates: { canonical: "/visit" },
  openGraph: {
    title: "Visit Us — FreshBrew",
    description: `${LOCATION.street}, ${LOCATION.city}. Open every day ${LOCATION.opens} — ${LOCATION.closes}.`,
    url: "/visit",
  },
};

export default function VisitPage() {
  return (
    <>
      <header data-dark-media className="relative isolate flex min-h-[60svh] items-end overflow-hidden bg-coffee text-cream">
        <Image
          src="/images/editorial/cafe-interior.webp"
          alt="The seating area at FreshBrew in afternoon light"
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
          <p className="eyebrow text-tan/70">Visit us</p>
          <h1 className="mt-6 text-[clamp(2.75rem,8vw,6rem)] leading-[0.98]">
            Come find us.
          </h1>
          <p className="mt-7 max-w-md leading-relaxed text-cream/65">
            {LOCATION.hours}
          </p>
        </div>
      </header>

      <Location />
      <Gallery />
    </>
  );
}
