import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  className?: string;
  align?: "left" | "center";
  /** Heading level, so each page keeps a sane outline. */
  as?: "h2" | "h3";
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  className,
  align = "left",
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <p className="eyebrow text-caramel">{eyebrow}</p>
        </Reveal>
      )}
      <Reveal delay={1}>
        <Tag className="text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
          {title}
        </Tag>
      </Reveal>
      {body && (
        <Reveal delay={2}>
          <div
            className={cn(
              "max-w-xl text-base leading-relaxed text-espresso/70",
              align === "center" && "mx-auto",
            )}
          >
            {body}
          </div>
        </Reveal>
      )}
    </div>
  );
}
