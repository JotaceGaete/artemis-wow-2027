/** Producto publicado en Walinka, ya normalizado para Artemis. Solo datos que Walinka informa. */
export type WalinkaProduct = {
  id: string;
  slug: string;
  name: string;
  description: string;
  categorySlug: string;
  categoryName: string;
  /** Precio entero en CLP. Siempre mayor que cero. */
  price: number;
  /** Precio anterior solo cuando la oferta está activa y es mayor que el precio actual. */
  compareAtPrice: number | null;
  soldOut: boolean;
  /** URLs https de fotografías, en orden. Vacío si Walinka no informa ninguna. */
  images: string[];
  createdAt: string;
};

export type WalinkaCategory = {
  slug: string;
  name: string;
  count: number;
  /** Primera fotografía real de la categoría, o null. */
  image: string | null;
};

export type WalinkaCatalog = {
  products: WalinkaProduct[];
  categories: WalinkaCategory[];
  /** Productos omitidos por no tener nombre o precio válido en CLP. */
  omittedCount: number;
  /** Productos omitidos porque Walinka oculta su precio. */
  hiddenPriceCount: number;
};
