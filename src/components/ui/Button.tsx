import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-sans font-medium tracking-tight transition-[background-color,color,border-color,transform] duration-300 ease-[var(--ease-out-soft)] disabled:pointer-events-none disabled:opacity-45";

const variants: Record<Variant, string> = {
  primary:
    "bg-espresso text-cream hover:bg-coffee active:scale-[0.985]",
  secondary:
    "border border-espresso/25 text-espresso hover:border-espresso/60 hover:bg-espresso/5 active:scale-[0.985]",
  ghost: "text-espresso hover:text-caramel",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[0.8125rem]",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-[0.9375rem]",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  /** Renders a chevron that slides on hover. */
  withArrow?: boolean;
}

function Inner({ children, withArrow }: Pick<CommonProps, "children" | "withArrow">) {
  return (
    <>
      {children}
      {withArrow && (
        <span
          aria-hidden="true"
          className="transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:translate-x-1"
        >
          →
        </span>
      )}
    </>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  withArrow,
  ...props
}: CommonProps & ComponentProps<"button">) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      <Inner withArrow={withArrow}>{children}</Inner>
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  withArrow,
  ...props
}: CommonProps & ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      <Inner withArrow={withArrow}>{children}</Inner>
    </Link>
  );
}
