import type { HeroSlide, ProductCard, ProductView, StoreFacts } from "../view-types";
import type { WalinkaCatalog, WalinkaCategory, WalinkaProduct } from "./types";

/** Color de fondo de la tarjeta sin fotografía: token del diseño ROSA MODERNO. */
const TONE = "var(--c-soft)";

export const CATALOG_GREETING = "Hola, soy Musa. Te ayudo con las piezas del catálogo y sus precios.";
export const CATALOG_CHIPS = ["¿Qué categorías hay?", "¿Cuánto cuestan las piezas?", "¿Qué hay disponible?"];

export function formatCLP(value: number): string {
  return new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(value);
}

/** Minúsculas y sin tildes, para comparar textos en español. */
function norm(text: string): string {
  return text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

export function productCard(p: WalinkaProduct): ProductCard {
  return {
    id: p.id,
    name: p.name,
    category: p.categoryName,
    alt: p.name,
    meta: p.compareAtPrice ? `Antes ${formatCLP(p.compareAtPrice)}` : "",
    priceText: formatCLP(p.price),
    image: p.images[0] ?? null,
    tone: TONE,
    href: `/producto/${p.slug}`,
    soldOut: p.soldOut,
  };
}

/** Una diapositiva por categoría publicada, con precio mínimo real. */
export function heroSlides(
  categories: WalinkaCategory[],
  products: WalinkaProduct[],
  colors: string[],
): HeroSlide[] {
  return categories.map((category, index) => {
    const inCategory = products.filter((p) => p.categorySlug === category.slug);
    const min = Math.min(...inCategory.map((p) => p.price));
    return {
      key: category.slug,
      kicker: "Categoría",
      title: category.name,
      text: `${plural(category.count, "pieza", "piezas")} en la tienda`,
      price: inCategory.length ? `Desde ${formatCLP(min)}` : "",
      color: colors[index % colors.length] ?? TONE,
      photo: category.image,
      thumb: category.name,
    };
  });
}

export function storeFacts(catalog: WalinkaCatalog): StoreFacts {
  const { products, categories } = catalog;
  return {
    count: products.length,
    categories: categories.map((c) => c.name),
    prices: products.map((p) => p.price),
    available: products.filter((p) => !p.soldOut).length,
    soldOut: products.filter((p) => p.soldOut).length,
  };
}

/** Respuestas de Musa para la portada: solo datos del catálogo. */
export function storeAnswer(question: string, facts: StoreFacts): string {
  if (facts.count === 0) return "Todavía no hay piezas publicadas en el catálogo.";
  const k = norm(question);
  if (/categor|seccion|tipo/.test(k)) {
    return facts.categories.length
      ? `Las categorías publicadas son: ${facts.categories.join(", ")}.`
      : "Las piezas publicadas no tienen categoría asignada.";
  }
  if (/precio|cuesta|cuanto|vale/.test(k)) {
    const min = Math.min(...facts.prices);
    const max = Math.max(...facts.prices);
    return `Las piezas publicadas van desde ${formatCLP(min)} hasta ${formatCLP(max)}.`;
  }
  if (/disponib|stock|agot|queda/.test(k)) {
    return `${plural(facts.available, "pieza disponible", "piezas disponibles")} y ${facts.soldOut} agotadas, según el catálogo.`;
  }
  return "No tengo ese dato en el catálogo. Revisá la ficha de la pieza o consultá con el equipo.";
}

export function productView(p: WalinkaProduct): ProductView {
  return {
    id: p.id,
    name: p.name,
    kicker: p.categoryName || "Pieza",
    description: p.description,
    price: formatCLP(p.price),
    priceNote: p.compareAtPrice ? `Antes ${formatCLP(p.compareAtPrice)}` : undefined,
    status: p.soldOut ? "Agotado" : "Disponible",
    tone: TONE,
    gallery: p.images.map((src) => ({ kind: "remote", src, caption: p.name })),
    specs: [],
    trust: [],
    musaIntro: "Musa responde solo con lo que figura en el catálogo de esta pieza.",
    musaGreeting: `Preguntame sobre ${p.name}: precio, disponibilidad o lo que dice su descripción.`,
    musaChips: ["¿Cuánto cuesta?", "¿Está disponible?"],
    category: p.categoryName,
    soldOut: p.soldOut,
  };
}

/** Respuestas de Musa en la ficha: precio, disponibilidad, categoría o frases de la descripción. */
export function productAnswer(v: ProductView, question: string): string {
  const k = norm(question);
  if (/precio|cuesta|cuanto|vale/.test(k)) return v.priceNote ? `${v.price}. ${v.priceNote}.` : `${v.price}.`;
  if (/disponib|stock|agot|queda|comprar/.test(k)) {
    return v.soldOut ? "Figura como agotada en el catálogo." : "Figura como disponible en el catálogo.";
  }
  if (/categor|tipo/.test(k)) {
    return v.category ? `Está en la categoría ${v.category}.` : "No tiene categoría asignada en el catálogo.";
  }
  const words = k.replace(/[^\p{L}\p{N}\s]/gu, " ").split(/\s+/).filter((w) => w.length >= 5);
  const sentences = v.description.split(/(?<=[.!?])\s+/);
  const hit = sentences.find((s) => words.some((w) => norm(s).includes(w)));
  return hit ?? "No tengo ese dato en la ficha de esta pieza. Consultá con el equipo.";
}
