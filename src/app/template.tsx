/**
 * Remounts on every navigation, which gives each route a short fade-in.
 * Kept under 400ms so it never gets in the way.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-[page-in_0.35s_var(--ease-out-soft)_both]">{children}</div>;
}
