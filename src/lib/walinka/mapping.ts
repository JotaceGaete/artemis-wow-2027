import type { WalinkaCatalog, WalinkaCategory, WalinkaProduct } from "./types";

/**
 * Mapeo puro de filas públicas de Walinka al modelo de Artemis. Sin red: testeable.
 * Adaptado de artemis-store/lib/data/walinka-store-data.ts.
 * - No inventa datos. Producto sin precio válido o con precio oculto se omite y se cuenta.
 * - Sin fotografía: images queda vacío y la interfaz muestra fondo, no una imagen falsa.
 */

export interface WalinkaProductRow {
  id: string;
  name: string;
  slug: string | null;
  description: string | null;
  price: number | string;
  compare_at_price: number | string | null;
  on_sale: boolean | null;
  is_sold_out: boolean | null;
  image_url: string | null;
  card_image_url: string | null;
  show_price: boolean | null;
  images: unknown;
  category: string | null;
  sort_order: number | null;
  created_at: string;
}

export interface WalinkaBusinessCategoryRow {
  name: string;
  sort_order: number | null;
}

/** Columnas explícitas: nunca se pide `*`, para no exponer campos internos. */
export const PRODUCT_COLUMNS = [
  "id", "name", "slug", "description", "price", "compare_at_price", "on_sale", "is_sold_out",
  "image_url", "card_image_url", "show_price", "images", "category", "sort_order", "created_at",
].join(",");

export function slugifyText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function isHttpUrl(value: unknown): value is string {
  if (typeof value !== "string" || !value.trim()) return false;
  try {
    const { protocol } = new URL(value.trim());
    return protocol === "https:" || protocol === "http:";
  } catch {
    return false;
  }
}

/** Orden: tarjeta, foto principal, galería. Sin duplicados. */
export function extractImages(row: WalinkaProductRow): string[] {
  const raw: unknown[] = [
    row.card_image_url,
    row.image_url,
    ...(Array.isArray(row.images) ? row.images : []),
  ];
  return [...new Set(raw.filter(isHttpUrl).map((url) => url.trim()))];
}

export function parseWholePrice(value: number | string | null | undefined): number | null {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.round(parsed) : null;
}

export function mapWalinkaCatalog(
  rows: WalinkaProductRow[],
  businessCategories: WalinkaBusinessCategoryRow[],
): WalinkaCatalog {
  const products: WalinkaProduct[] = [];
  const usedSlugs = new Set<string>();
  let omittedCount = 0;
  let hiddenPriceCount = 0;

  for (const row of rows) {
    if (row.show_price === false) {
      hiddenPriceCount += 1;
      continue;
    }
    const name = row.name?.trim() ?? "";
    const price = parseWholePrice(row.price);
    if (!name || price === null) {
      omittedCount += 1;
      continue;
    }

    const categoryName = row.category?.trim() ?? "";
    const compareAt = parseWholePrice(row.compare_at_price);
    const baseSlug = row.slug?.trim() || slugifyText(name) || row.id;
    const slug = usedSlugs.has(baseSlug) ? `${baseSlug}-${row.id.slice(0, 8)}` : baseSlug;
    usedSlugs.add(slug);

    products.push({
      id: row.id,
      slug,
      name,
      description: row.description?.trim() ?? "",
      categorySlug: slugifyText(categoryName),
      categoryName,
      price,
      compareAtPrice: row.on_sale === true && compareAt !== null && compareAt > price ? compareAt : null,
      soldOut: row.is_sold_out === true,
      images: extractImages(row),
      createdAt: row.created_at,
    });
  }

  return {
    products,
    categories: buildCategories(products, businessCategories),
    omittedCount,
    hiddenPriceCount,
  };
}

function buildCategories(
  products: WalinkaProduct[],
  businessCategories: WalinkaBusinessCategoryRow[],
): WalinkaCategory[] {
  const order = new Map(businessCategories.map((c, index) => [slugifyText(c.name), index]));
  const groups = new Map<string, { name: string; items: WalinkaProduct[] }>();
  for (const product of products) {
    if (!product.categorySlug) continue;
    const group = groups.get(product.categorySlug) ?? { name: product.categoryName, items: [] };
    group.items.push(product);
    groups.set(product.categorySlug, group);
  }
  const categories: WalinkaCategory[] = [...groups].map(([slug, group]) => ({
    slug,
    name: group.name,
    count: group.items.length,
    image: group.items.flatMap((p) => p.images)[0] ?? null,
  }));
  return categories.sort(
    (a, b) => (order.get(a.slug) ?? Number.MAX_SAFE_INTEGER) - (order.get(b.slug) ?? Number.MAX_SAFE_INTEGER),
  );
}
