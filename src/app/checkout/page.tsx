import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Review your order and choose a pickup time.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <div className="pt-[calc(var(--header-h)+3rem)]">
      <header className="shell">
        <p className="eyebrow text-caramel">Almost there</p>
        <h1 className="mt-5 text-[clamp(2.5rem,7vw,4.5rem)] leading-[1.0]">
          Checkout
        </h1>
      </header>

      <CheckoutForm />
    </div>
  );
}
