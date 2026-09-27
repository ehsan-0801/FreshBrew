import type { Metadata } from "next";
import { MenuBrowser } from "@/components/menu/MenuBrowser";

export const metadata: Metadata = {
  title: "Menu — Coffee, Cold Drinks & Bakery",
  description:
    "Espresso, cold brew, matcha and pastries baked in-house every morning. Browse the full FreshBrew menu and order ahead.",
  alternates: { canonical: "/menu" },
  openGraph: {
    title: "FreshBrew Menu — Coffee, Cold Drinks & Bakery",
    description:
      "Espresso, cold brew, matcha and pastries baked in-house every morning.",
    url: "/menu",
  },
};

export default function MenuPage() {
  return (
    <div className="pt-[calc(var(--header-h)+3rem)]">
      <header className="shell">
        <p className="eyebrow text-caramel">The menu</p>
        <h1 className="mt-5 text-[clamp(3rem,10vw,7rem)] leading-[0.95]">
          Menu
        </h1>
        <p className="mt-6 max-w-md leading-relaxed text-espresso/60">
          Everything is made to order. Prices include one milk of your
          choosing.
        </p>
      </header>

      <MenuBrowser />
    </div>
  );
}
