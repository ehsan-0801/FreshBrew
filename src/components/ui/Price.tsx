import { cn } from "@/lib/utils";

/**
 * The Taka sign is missing from Instrument Serif, so a display-face price
 * falls back mid-number and the symbol arrives in a different weight. Setting
 * the symbol in the UI face on purpose keeps the pair deliberate.
 */
export function Price({
  amount,
  className,
}: {
  amount: number;
  className?: string;
}) {
  return (
    <span className={cn("tabular-nums", className)}>
      <span className="font-sans text-[0.62em] font-normal align-[0.12em] mr-[0.12em] opacity-70">
        ৳
      </span>
      {amount.toLocaleString("en-BD")}
    </span>
  );
}
