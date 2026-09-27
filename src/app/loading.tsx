import { Logo } from "@/components/brand/Logo";

/**
 * Route-level loading state. Deliberately quiet — it should be gone before
 * anyone reads it.
 */
export default function Loading() {
  return (
    <div className="flex min-h-[70svh] flex-col items-center justify-center gap-6">
      <Logo href={null} />

      <p className="text-sm text-espresso/50">Preparing your coffee…</p>

      <div
        role="progressbar"
        aria-label="Loading"
        className="h-px w-40 overflow-hidden bg-espresso/10"
      >
        <span className="block h-full w-1/3 animate-[slide_1.4s_ease-in-out_infinite] bg-caramel" />
      </div>

      <style>{`
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
}
