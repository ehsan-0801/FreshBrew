"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Desktop-only pointer. Elements opt in with `data-cursor="View"` and the
 * label is what the ring says while hovering them.
 */
export function CustomCursor() {
  const reduced = useReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [pressed, setPressed] = useState(false);
  // Stay hidden until the pointer actually moves, otherwise the ring sits
  // parked in the middle of the page on load.
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    // Only for real pointing devices — never on touch.
    const fine = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(fine.matches && !reduced);
    update();
    fine.addEventListener("change", update);
    return () => fine.removeEventListener("change", update);
  }, [reduced]);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("custom-cursor-active");

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { ...target };
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      setSeen(true);

      const hit = (e.target as HTMLElement | null)?.closest?.("[data-cursor]");
      setLabel(hit ? hit.getAttribute("data-cursor") : null);
    };

    const render = () => {
      // Trailing lerp keeps the ring just behind the true pointer.
      current.x += (target.x - current.x) * 0.18;
      current.y += (target.y - current.y) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%)`;
      }
      frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);

    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className={`pointer-events-none fixed left-0 top-0 z-[90] hidden transition-opacity duration-300 md:block ${
        seen ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className="grid place-items-center rounded-full border border-espresso/40 bg-espresso/5 backdrop-blur-[1px] transition-[width,height,background-color] duration-300 ease-[var(--ease-out-soft)]"
        style={{
          width: label ? 72 : pressed ? 16 : 24,
          height: label ? 72 : pressed ? 16 : 24,
          backgroundColor: label ? "rgba(42,29,22,0.9)" : undefined,
        }}
      >
        {label && (
          <span className="eyebrow text-[0.625rem] text-cream">{label}</span>
        )}
      </div>
    </div>
  );
}
