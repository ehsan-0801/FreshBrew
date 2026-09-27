import type { Metadata } from "next";
import { CartPageContent } from "@/components/cart/CartPageContent";

export const metadata: Metadata = {
  title: "Your Order",
  description: "Review the drinks in your order before checking out.",
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return (
    <div className="pt-[calc(var(--header-h)+3rem)]">
      <header className="shell">
        <p className="eyebrow text-caramel">Your order</p>
        <h1 className="mt-5 text-[clamp(2.5rem,7vw,4.5rem)] leading-[1.0]">
          The cup so far
        </h1>
      </header>

      <CartPageContent />
    </div>
  );
}
