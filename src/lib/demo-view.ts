import { CAMPAIGNS, CATEGORIES, MUSA_CHIPS, MUSA_GREETING, PRODUCTS, type Product } from "./data";
import { PRODUCT_ROUTES, type ProductDetail } from "./product-detail";
import { photoUrl } from "./photos";
import type { HeroSlide, ProductCard, ProductView } from "./view-types";

/** Datos de demostración expresados con las mismas formas que el catálogo real. Solo modo demo. */
export function demoHomeListing(): { slides: HeroSlide[]; cards: ProductCard[]; filters: string[] } {
  return {
    slides: CAMPAIGNS.map((c) => ({
      key: c.t,
      kicker: c.k,
      title: c.t,
      text: c.p,
      price: c.pr,
      color: c.c,
      art: c.o,
      thumb: c.k.split("— ")[1] ?? c.k,
    })),
    cards: PRODUCTS.map(demoCard),
    filters: CATEGORIES.filter((c) => c !== "Todo"),
  };
}

export const DEMO_GREETING = MUSA_GREETING;
export const DEMO_CHIPS = MUSA_CHIPS;

function demoCard(p: Product): ProductCard {
  return {
    id: p.id,
    name: p.t,
    category: p.cat,
    alt: p.alt,
    meta: p.m,
    priceText: p.p,
    image: photoUrl(p.id) ?? null,
    art: p.o,
    tone: p.bg,
    href: PRODUCT_ROUTES[p.id],
    soldOut: false,
  };
}

export function demoRelatedCards(products: Product[]): ProductCard[] {
  return products.map(demoCard);
}

export function demoProductView(d: ProductDetail): ProductView {
  return {
    id: d.id,
    name: d.name,
    kicker: d.kicker,
    shortDescription: d.short_description,
    description: d.description,
    price: d.price,
    priceNote: d.priceNote,
    status: d.status,
    stock: d.stock,
    shipping: d.shipping,
    tone: d.tone,
    watch: d.watch,
    gallery: d.gallery,
    story: d.story,
    specs: d.specs,
    condition: d.condition,
    trust: d.trust,
    musaIntro: "Musa conoce su historia, su cuerda y su estado. Preguntale lo que quieras antes de comprar.",
    musaGreeting: d.musaGreeting,
    musaChips: d.musaChips,
    category: "",
    soldOut: false,
  };
}
