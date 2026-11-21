import type { ObjectKey } from "./objects";
import type { GalleryItem, StoryChapter } from "./product-detail";

/** Tarjeta de producto para la grilla y las piezas relacionadas. Datos planos: se pasan del servidor al cliente. */
export type ProductCard = {
  id: string;
  name: string;
  category: string;
  alt: string;
  /** Texto secundario; vacío si no hay nada que mostrar. */
  meta: string;
  priceText: string;
  /** Fotografía remota. Si falta, la tarjeta muestra solo el fondo o la ilustración. */
  image?: string | null;
  art?: ObjectKey;
  tone: string;
  href?: string;
  soldOut: boolean;
};

/** Diapositiva del carrusel de portada. */
export type HeroSlide = {
  key: string;
  kicker: string;
  title: string;
  text: string;
  price: string;
  color: string;
  photo?: string | null;
  art?: ObjectKey;
  thumb: string;
};

/** Datos agregados del catálogo que Musa usa para responder sin inventar. */
export type StoreFacts = {
  count: number;
  categories: string[];
  prices: number[];
  available: number;
  soldOut: number;
};

/** Vista completa de la portada con datos reales. Null en modo demo. */
export type CatalogView = {
  slides: HeroSlide[];
  cards: ProductCard[];
  filters: string[];
  facts: StoreFacts;
};

/** Contenido de la página de producto. Campos opcionales: si faltan, la sección no se muestra. */
export type ProductView = {
  id: string;
  name: string;
  kicker: string;
  shortDescription?: string;
  description: string;
  price: string;
  priceNote?: string;
  status?: string;
  stock?: string;
  shipping?: string;
  tone: string;
  watch?: ObjectKey;
  gallery: GalleryItem[];
  story?: StoryChapter[];
  specs: { k: string; v: string }[];
  condition?: { grade: string; notes: string[] };
  trust: string[];
  musaIntro: string;
  musaGreeting: string;
  musaChips: string[];
  category: string;
  soldOut: boolean;
};
