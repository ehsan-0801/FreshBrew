export const BRAND = {
  name: "FreshBrew",
  tagline: "Slow coffee. Deep moments.",
  description:
    "Thoughtfully sourced beans, carefully roasted, and brewed for moments worth staying for.",
  url: "https://freshbrew.coffee",
} as const;

export const NAV_LINKS = [
  { label: "Menu", href: "/menu" },
  { label: "Our Story", href: "/story" },
  { label: "Coffee", href: "/coffee" },
  { label: "Visit Us", href: "/visit" },
] as const;

export const MOBILE_NAV_LINKS = [
  { label: "Home", href: "/" },
  ...NAV_LINKS,
] as const;

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Facebook", href: "https://facebook.com" },
  { label: "TikTok", href: "https://tiktok.com" },
] as const;

export const LOCATION = {
  name: "FreshBrew",
  street: "House 42, Road 11, Banani",
  city: "Dhaka",
  region: "Dhaka Division",
  postalCode: "1213",
  country: "Bangladesh",
  phone: "+880 1700 000000",
  phoneHref: "tel:+8801700000000",
  email: "hello@freshbrew.coffee",
  hours: "Open every day · 08:00 — 23:00",
  opens: "08:00",
  closes: "23:00",
  latitude: 23.7936,
  longitude: 90.4043,
  directionsUrl:
    "https://www.google.com/maps/search/?api=1&query=23.7936,90.4043",
  amenities: [
    { label: "Wi-Fi", detail: "Free, fast, no password walls" },
    { label: "Seating", detail: "48 seats across two floors" },
    { label: "Parking", detail: "Street parking on Road 11" },
    { label: "Power", detail: "Outlets at every table" },
  ],
} as const;
