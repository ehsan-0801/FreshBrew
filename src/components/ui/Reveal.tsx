"use client";

import type { ComponentPropsWithRef, ElementType, ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** 0–4, matching the reveal-delay-* steps. */
  delay?: 0 | 1 | 2 | 3 | 4;
  /** Wipe an image in from the bottom instead of fading text up. */
  variant?: "fade" | "image";
  as?: ElementType;
}

export function Reveal({
  children,
  className,
  delay = 0,
  variant = "fade",
  as = "div",
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  // Polymorphic tag, narrowed to the div-like props we actually pass.
  const Tag = as as ElementType<ComponentPropsWithRef<"div">>;
  const delayClass = delay > 0 ? `reveal-delay-${delay}` : undefined;

  // The image variant animates `clip-path`, and a fully clipped element never
  // reports as intersecting — so the clip goes on an inner layer and the
  // observed element keeps its real size.
  if (variant === "image") {
    return (
      <Tag ref={ref} className={className}>
        <div
          data-visible={inView}
          className={cn("img-reveal absolute inset-0", delayClass)}
        >
          {children}
        </div>
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref}
      data-visible={inView}
      className={cn("reveal", delayClass, className)}
    >
      {children}
    </Tag>
  );
}
