import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="shell flex min-h-[70svh] flex-col items-start justify-center gap-6 py-24">
      <p className="eyebrow text-caramel">404</p>

      <h1 className="max-w-2xl text-[clamp(2.5rem,7vw,5rem)] leading-[1.02]">
        Looks like this cup
        <br />
        <em className="italic text-caramel">went missing.</em>
      </h1>

      <p className="max-w-md leading-relaxed text-espresso/60">
        The page you&rsquo;re looking for doesn&rsquo;t exist.
      </p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/" size="lg" withArrow>
          Back Home
        </ButtonLink>
        <ButtonLink href="/menu" size="lg" variant="secondary">
          Explore Menu
        </ButtonLink>
      </div>
    </div>
  );
}
