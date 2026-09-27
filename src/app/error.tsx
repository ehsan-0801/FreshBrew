"use client";

import { useEffect } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surfaced to the console only — the page never shows a stack trace.
    console.error(error);
  }, [error]);

  return (
    <div className="shell flex min-h-[70svh] flex-col items-start justify-center gap-6 py-24">
      <p className="eyebrow text-caramel">Something went wrong</p>

      <h1 className="max-w-2xl text-[clamp(2.25rem,6vw,4rem)] leading-[1.05]">
        We couldn&rsquo;t brew that one.
      </h1>

      <p className="max-w-md leading-relaxed text-espresso/60">
        Something went wrong on our side. Try again, and if it keeps happening,
        the counter is always open.
      </p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <Button size="lg" onClick={reset} withArrow>
          Try Again
        </Button>
        <ButtonLink href="/" size="lg" variant="secondary">
          Back Home
        </ButtonLink>
      </div>
    </div>
  );
}
