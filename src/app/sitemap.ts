import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/constants";
import { PRODUCTS } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages = ["", "/menu", "/story", "/coffee", "/visit"].map((path) => ({
    url: `${BRAND.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const products = PRODUCTS.map((product) => ({
    url: `${BRAND.url}/menu/${product.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...pages, ...products];
}
