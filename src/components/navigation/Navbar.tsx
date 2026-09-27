"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";
import { Logo } from "@/components/brand/Logo";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { CartButton } from "@/components/cart/CartButton";
import { cn } from "@/lib/utils";

function subscribeScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);
  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
  };
}

/**
 * The bar never paints a background — it floats over whatever is behind it.
 * All that changes is the ink, so the wordmark and links stay legible over
 * both dark footage and pale paper.
 */
function isOverDarkMedia(): boolean {
  const headerHeight =
    parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--header-h"),
    ) * 16 || 72;

  // Any dark section still under the bar wins, so pages with more than one
  // (the homepage story, then the café section) stay legible throughout.
  return [...document.querySelectorAll("[data-dark-media]")].some((el) => {
    const { top, bottom } = el.getBoundingClientRect();
    return top <= headerHeight && bottom > headerHeight;
  });
}

export function Navbar() {
  const pathname = usePathname();
  // Storing the route the drawer was opened on means a navigation closes it
  // without needing an effect to watch the pathname.
  const [openForPath, setOpenForPath] = useState<string | null>(null);
  const menuOpen = openForPath === pathname;

  const onDark = useSyncExternalStore(
    subscribeScroll,
    isOverDarkMedia,
    () => true,
  );

  // Stable identity, so the drawer's focus trap is not torn down and rebuilt
  // on every parent render.
  const closeMenu = useCallback(() => setOpenForPath(null), []);


  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-[60] bg-transparent"
      >
        <div className="shell flex h-[var(--header-h)] items-center justify-between gap-6">
          <Logo tone={onDark ? "light" : "dark"} />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {NAV_LINKS.map((link) => {
                const active = pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative py-2 text-sm transition-colors duration-300",
                        onDark
                          ? "text-cream/80 hover:text-cream"
                          : "text-espresso/70 hover:text-espresso",
                        active && (onDark ? "text-cream" : "text-espresso"),
                      )}
                    >
                      {link.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 ease-[var(--ease-out-soft)]",
                          onDark ? "bg-cream" : "bg-caramel",
                          active && "scale-x-100",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <CartButton onDark={onDark} />

            <Link
              href="/menu"
              className={cn(
                "hidden h-10 items-center rounded-full px-5 text-sm font-medium transition-colors duration-300 lg:inline-flex",
                onDark
                  ? "bg-cream text-espresso hover:bg-warmwhite"
                  : "bg-espresso text-cream hover:bg-coffee",
              )}
            >
              Order Now
            </Link>

            <button
              type="button"
              onClick={() => setOpenForPath(pathname)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className={cn(
                "-mr-2 grid h-11 w-11 place-items-center rounded-full transition-colors lg:hidden",
                onDark ? "text-cream" : "text-espresso",
              )}
            >
              <svg width="20" height="12" viewBox="0 0 20 12" aria-hidden="true">
                <path
                  d="M0 1h20M0 11h13"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  fill="none"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={closeMenu}
        activePath={pathname}
      />
    </>
  );
}
