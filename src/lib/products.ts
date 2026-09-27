export type CategoryId = "coffee" | "cold" | "non-coffee" | "bakery";

export interface ProductOption {
  id: string;
  label: string;
  /** Added to the base price, in BDT. */
  priceDelta: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategoryId;
  /** One line, shown on cards. */
  description: string;
  /** Fuller copy for the product page. */
  detail: string;
  price: number;
  image: string;
  imageAlt: string;
  available: boolean;
  /** Surfaced in the homepage menu preview. */
  featured?: boolean;
  sizes?: ProductOption[];
  milkOptions?: ProductOption[];
  extras?: ProductOption[];
}

export const CATEGORIES: { id: CategoryId; label: string; blurb: string }[] = [
  { id: "coffee", label: "Coffee", blurb: "Pulled fresh, one shot at a time." },
  { id: "cold", label: "Cold", blurb: "Slow-steeped and served over ice." },
  { id: "non-coffee", label: "Non-Coffee", blurb: "For the afternoons in between." },
  { id: "bakery", label: "Bakery", blurb: "Baked in-house every morning." },
];

const SIZES: ProductOption[] = [
  { id: "small", label: "Small", priceDelta: 0 },
  { id: "medium", label: "Medium", priceDelta: 40 },
  { id: "large", label: "Large", priceDelta: 80 },
];

const MILKS: ProductOption[] = [
  { id: "whole", label: "Whole", priceDelta: 0 },
  { id: "oat", label: "Oat", priceDelta: 40 },
  { id: "almond", label: "Almond", priceDelta: 40 },
];

const EXTRAS: ProductOption[] = [
  { id: "extra-shot", label: "Extra Shot", priceDelta: 60 },
  { id: "vanilla", label: "Vanilla", priceDelta: 30 },
  { id: "caramel", label: "Caramel", priceDelta: 30 },
];

/** Drinks share the same customisation set; bakery items have none. */
const drink = (
  p: Omit<Product, "sizes" | "milkOptions" | "extras" | "available"> &
    Partial<Pick<Product, "available" | "milkOptions">>,
): Product => ({
  available: true,
  sizes: SIZES,
  milkOptions: MILKS,
  extras: EXTRAS,
  ...p,
});

export const PRODUCTS: Product[] = [
  // ---------------- Coffee ----------------
  drink({
    id: "espresso",
    slug: "espresso",
    name: "Espresso",
    category: "coffee",
    description: "A single origin shot, pulled short.",
    detail:
      "Twenty-five seconds of pressure and nothing to hide behind. Dense, syrupy, and finished with a long caramel note.",
    price: 180,
    image: "/images/products/espresso.webp",
    imageAlt: "Espresso in a small ceramic cup on a wooden counter",
    milkOptions: undefined,
  }),
  drink({
    id: "americano",
    slug: "americano",
    name: "Americano",
    category: "coffee",
    description: "Espresso lengthened with hot water.",
    detail:
      "The same shot, given room to open up. Clean, warming, and easy to sit with for an hour.",
    price: 220,
    image: "/images/products/americano.webp",
    imageAlt: "Black americano in a ceramic cup",
  }),
  drink({
    id: "cappuccino",
    slug: "cappuccino",
    name: "Cappuccino",
    category: "coffee",
    description: "Double espresso, steamed milk.",
    detail:
      "Equal parts espresso, milk, and foam. Textured until it is glossy, never stiff.",
    price: 280,
    image: "/images/products/cappuccino.webp",
    imageAlt: "Cappuccino with latte art in a white cup",
    featured: true,
  }),
  drink({
    id: "house-latte",
    slug: "house-latte",
    name: "House Latte",
    category: "coffee",
    description: "Espresso, steamed milk, and a soft finish.",
    detail:
      "Our signature pour. Milk stretched to a velvet texture and poured slowly over a double shot.",
    price: 320,
    image: "/images/products/house-latte.webp",
    imageAlt: "Latte with a rosetta poured into the crema",
    featured: true,
  }),
  drink({
    id: "mocha",
    slug: "mocha",
    name: "Mocha",
    category: "coffee",
    description: "Espresso, dark chocolate, steamed milk.",
    detail:
      "Bitter chocolate melted into the shot before the milk goes in, so it never turns sweet.",
    price: 340,
    image: "/images/products/mocha.webp",
    imageAlt: "Mocha topped with cocoa dusting",
  }),
  drink({
    id: "flat-white",
    slug: "flat-white",
    name: "Flat White",
    category: "coffee",
    description: "Ristretto shots under thin microfoam.",
    detail:
      "Smaller, stronger, and quieter than a latte. The one the baristas order.",
    price: 300,
    image: "/images/products/flat-white.webp",
    imageAlt: "Flat white in a tulip cup",
    featured: true,
  }),

  // ---------------- Cold ----------------
  drink({
    id: "cold-brew",
    slug: "cold-brew",
    name: "Cold Brew",
    category: "cold",
    description: "Steeped eighteen hours, served over ice.",
    detail:
      "No heat, no rush. Eighteen hours in cold water pulls out sweetness without the edge.",
    price: 300,
    image: "/images/products/cold-brew.webp",
    imageAlt: "Cold brew coffee over ice in a tall glass",
    featured: true,
  }),
  drink({
    id: "iced-latte",
    slug: "iced-latte",
    name: "Iced Latte",
    category: "cold",
    description: "Espresso, cold milk, plenty of ice.",
    detail: "Poured over ice so the shot keeps its shape for the first few sips.",
    price: 320,
    image: "/images/products/iced-latte.webp",
    imageAlt: "Iced latte with milk settling through the coffee",
  }),
  drink({
    id: "iced-mocha",
    slug: "iced-mocha",
    name: "Iced Mocha",
    category: "cold",
    description: "Chocolate, espresso, cold milk.",
    detail: "Chocolate stirred through the shot while it is still warm, then chilled.",
    price: 360,
    image: "/images/products/iced-mocha.webp",
    imageAlt: "Iced mocha in a glass with dark chocolate swirls",
  }),
  drink({
    id: "espresso-tonic",
    slug: "espresso-tonic",
    name: "Espresso Tonic",
    category: "cold",
    description: "Tonic, ice, and a shot poured last.",
    detail:
      "Bright, bitter, and faintly citrus. Best in the afternoon when the room gets warm.",
    price: 340,
    image: "/images/products/espresso-tonic.webp",
    imageAlt: "Espresso tonic with espresso layered over tonic water",
    milkOptions: undefined,
  }),

  // ---------------- Non-Coffee ----------------
  drink({
    id: "matcha-latte",
    slug: "matcha-latte",
    name: "Matcha Latte",
    category: "non-coffee",
    description: "Ceremonial grade matcha, whisked to order.",
    detail: "Whisked by hand until it foams, then poured over milk. Grassy and clean.",
    price: 340,
    image: "/images/products/matcha-latte.webp",
    imageAlt: "Matcha latte with a green swirl through the milk",
  }),
  drink({
    id: "hot-chocolate",
    slug: "hot-chocolate",
    name: "Hot Chocolate",
    category: "non-coffee",
    description: "Dark chocolate melted into steamed milk.",
    detail: "Real chocolate, not powder. Thick enough to coat the spoon.",
    price: 300,
    image: "/images/products/hot-chocolate.webp",
    imageAlt: "Hot chocolate in a ceramic mug",
  }),
  drink({
    id: "chai",
    slug: "chai",
    name: "Chai",
    category: "non-coffee",
    description: "Whole spices, simmered with milk.",
    detail:
      "Cardamom, clove, and ginger simmered from whole spice every morning. Never a syrup.",
    price: 260,
    image: "/images/products/chai.webp",
    imageAlt: "Spiced chai in a glass cup",
  }),
  drink({
    id: "tea",
    slug: "tea",
    name: "Tea",
    category: "non-coffee",
    description: "Loose leaf, brewed by the pot.",
    detail: "A short rotating list of loose leaf, brewed to the minute and served by the pot.",
    price: 200,
    image: "/images/products/tea.webp",
    imageAlt: "Loose leaf tea brewing in a glass pot",
    milkOptions: undefined,
  }),

  // ---------------- Bakery ----------------
  {
    id: "croissant",
    slug: "croissant",
    name: "Croissant",
    category: "bakery",
    description: "Laminated over three days.",
    detail: "Butter folded through the dough over three days, baked dark and shattering.",
    price: 220,
    image: "/images/products/croissant.webp",
    imageAlt: "Golden croissant with visible flaky layers",
    available: true,
    featured: true,
  },
  {
    id: "cinnamon-roll",
    slug: "cinnamon-roll",
    name: "Cinnamon Roll",
    category: "bakery",
    description: "Soft centre, dark caramelised edge.",
    detail: "Rolled tight, proofed slowly, and baked until the outer turn goes to caramel.",
    price: 260,
    image: "/images/products/cinnamon-roll.webp",
    imageAlt: "Cinnamon roll with a glazed spiral top",
    available: true,
  },
  {
    id: "cookies",
    slug: "cookies",
    name: "Cookies",
    category: "bakery",
    description: "Brown butter and sea salt.",
    detail: "Browned butter, dark chocolate, and a pinch of salt across the top.",
    price: 180,
    image: "/images/products/cookies.webp",
    imageAlt: "Chocolate chip cookies cooling on a rack",
    available: true,
  },
  {
    id: "cheesecake",
    slug: "cheesecake",
    name: "Cheesecake",
    category: "bakery",
    description: "Baked slow, served cold.",
    detail: "Baked low and slow in a water bath, then rested overnight before it is cut.",
    price: 380,
    image: "/images/products/cheesecake.webp",
    imageAlt: "Slice of baked cheesecake on a plate",
    available: false,
  },
  {
    id: "banana-bread",
    slug: "banana-bread",
    name: "Banana Bread",
    category: "bakery",
    description: "Toasted, with salted butter.",
    detail: "Cut thick and toasted on the grill, finished with salted butter.",
    price: 240,
    image: "/images/products/banana-bread.webp",
    imageAlt: "Slice of banana bread on a ceramic plate",
    available: true,
  },
];

export const getProductBySlug = (slug: string) =>
  PRODUCTS.find((p) => p.slug === slug);

export const getProductsByCategory = (category: CategoryId) =>
  PRODUCTS.filter((p) => p.category === category);

export const FEATURED_PRODUCTS = PRODUCTS.filter((p) => p.featured);

/** Signature latte variants for the homepage product switcher. */
export interface LatteVariant {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  imageAlt: string;
  /** Backdrop that shifts as the variant changes. */
  tone: string;
}

export const LATTE_VARIANTS: LatteVariant[] = [
  {
    id: "vanilla",
    name: "Vanilla",
    description: "Espresso, steamed milk and Madagascar vanilla.",
    price: 320,
    image: "/images/signature/vanilla.webp",
    imageAlt: "Vanilla latte in a ceramic cup",
    tone: "#e6dbca",
  },
  {
    id: "caramel",
    name: "Caramel",
    description: "Espresso, steamed milk and house caramel.",
    price: 320,
    image: "/images/signature/caramel.webp",
    imageAlt: "Caramel latte with a caramel drizzle",
    tone: "#d9bb94",
  },
  {
    id: "hazelnut",
    name: "Hazelnut",
    description: "Espresso, steamed milk and toasted hazelnut.",
    price: 340,
    image: "/images/signature/hazelnut.webp",
    imageAlt: "Hazelnut latte in a wide cup",
    tone: "#c9b49a",
  },
  {
    id: "mocha",
    name: "Mocha",
    description: "Espresso, steamed milk and dark chocolate.",
    price: 340,
    image: "/images/signature/mocha.webp",
    imageAlt: "Mocha latte dusted with cocoa",
    tone: "#a06b46",
  },
];
