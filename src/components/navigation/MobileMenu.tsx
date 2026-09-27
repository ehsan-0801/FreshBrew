"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { MOBILE_NAV_LINKS } from "@/lib/constants";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  activePath: string;
}

export function MobileMenu({ open, onClose, activePath }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Lock the page, move focus in, and trap Tab inside the panel.
  useEffect(() => {
    if (!open) return;

    const previous = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    // Wait for the panel to be painted as visible; focusing a still-hidden
    // element is a no-op in every browser.
    const focusFrame = requestAnimationFrame(() => closeRef.current?.focus());

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [open, onClose]);

  return (
    <div
      ref={panelRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      // `inert` takes the closed panel out of the tab order and the
      // accessibility tree without animating `visibility`, which would
      // otherwise make the panel unfocusable during the fade.
      inert={!open}
      className={cn(
        "fixed inset-0 z-[70] flex flex-col bg-coffee text-cream transition-opacity duration-500 ease-[var(--ease-out-soft)] lg:hidden",
        open ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <div className="shell flex h-[var(--header-h)] shrink-0 items-center justify-between">
        <Logo tone="light" />
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="-mr-2 grid h-11 w-11 place-items-center rounded-full text-cream/80 transition-colors hover:text-cream"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path
              d="M1 1l16 16M17 1L1 17"
              stroke="currentColor"
              strokeWidth="1.25"
              fill="none"
            />
          </svg>
        </button>
      </div>

      <nav className="shell flex flex-1 flex-col justify-center gap-1 pb-24">
        {MOBILE_NAV_LINKS.map((link, i) => {
          const active =
            link.href === "/"
              ? activePath === "/"
              : activePath.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              aria-current={active ? "page" : undefined}
              style={{ transitionDelay: open ? `${120 + i * 55}ms` : "0ms" }}
              className={cn(
                "border-b border-cream/10 py-5 font-display text-[2.5rem] leading-none transition-[opacity,transform] duration-500 ease-[var(--ease-out-soft)] sm:text-5xl",
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                active ? "text-tan" : "text-cream",
              )}
            >
              {link.label}
            </Link>
          );
        })}

        <Link
          href="/menu"
          onClick={onClose}
          style={{ transitionDelay: open ? "450ms" : "0ms" }}
          className={cn(
            "mt-9 inline-flex h-13 items-center justify-center rounded-full bg-cream px-8 text-sm font-medium text-espresso transition-[opacity,transform] duration-500 ease-[var(--ease-out-soft)]",
            open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
          )}
        >
          Order Now
        </Link>
      </nav>
    </div>
  );
}
