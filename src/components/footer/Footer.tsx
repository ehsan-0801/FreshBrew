import Link from "next/link";
import { BRAND, LOCATION, NAV_LINKS, SOCIAL_LINKS } from "@/lib/constants";
import { Logo } from "@/components/brand/Logo";

export function Footer() {
  return (
    <footer className="bg-coffee text-cream">
      <div className="shell py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Logo tone="light" />
            <p className="font-display text-2xl leading-snug text-cream/80">
              {BRAND.tagline}
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="eyebrow mb-5 font-sans text-cream/45">Explore</h2>
            <ul className="flex flex-col gap-3 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream/75 transition-colors hover:text-cream"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/visit"
                  className="text-cream/75 transition-colors hover:text-cream"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow mb-5 font-sans text-cream/45">Follow</h2>
            <ul className="flex flex-col gap-3 text-sm">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-cream/75 transition-colors hover:text-cream"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="eyebrow mb-5 font-sans text-cream/45">Find us</h2>
            <address className="flex flex-col gap-3 text-sm not-italic text-cream/75">
              <span>
                {LOCATION.street}
                <br />
                {LOCATION.city}, {LOCATION.country}
              </span>
              <a
                href={LOCATION.phoneHref}
                className="transition-colors hover:text-cream"
              >
                {LOCATION.phone}
              </a>
              <span className="text-cream/55">{LOCATION.hours}</span>
            </address>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-cream/12 pt-7 text-xs text-cream/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {BRAND.name}</p>
          <p>Dhaka, Bangladesh</p>
        </div>
      </div>
    </footer>
  );
}
