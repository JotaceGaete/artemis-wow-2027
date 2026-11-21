import { describe, expect, it } from "vitest";
import { extractImages, mapWalinkaCatalog, slugifyText, type WalinkaProductRow } from "./mapping";

function row(overrides: Partial<WalinkaProductRow> = {}): WalinkaProductRow {
  return {
    id: "11111111-aaaa-bbbb-cccc-000000000001",
    name: "Pieza de prueba",
    slug: "pieza-de-prueba",
    description: "Descripción simulada.",
    price: 68000,
    compare_at_price: null,
    on_sale: false,
    is_sold_out: false,
    image_url: null,
    card_image_url: null,
    show_price: true,
    images: [],
    category: "Tiempo",
    sort_order: 1,
    created_at: "2026-01-01T00:00:00Z",
    ...overrides,
  };
}

describe("mapWalinkaCatalog", () => {
  it("omite productos sin precio válido o sin nombre y cuenta cada caso", () => {
    const result = mapWalinkaCatalog(
      [row(), row({ id: "2", slug: "b", price: "no es numero" }), row({ id: "3", slug: "c", name: "  " }), row({ id: "4", slug: "d", show_price: false })],
      [],
    );
    expect(result.products.map((p) => p.id)).toEqual(["11111111-aaaa-bbbb-cccc-000000000001"]);
    expect(result.omittedCount).toBe(2);
    expect(result.hiddenPriceCount).toBe(1);
  });

  it("redondea el precio a pesos enteros", () => {
    const [product] = mapWalinkaCatalog([row({ price: "68000.4" })], []).products;
    expect(product.price).toBe(68000);
  });

  it("informa precio anterior solo con oferta activa y mayor que el precio", () => {
    const onSale = mapWalinkaCatalog([row({ on_sale: true, compare_at_price: 80000 })], []).products[0];
    expect(onSale.compareAtPrice).toBe(80000);
    const notOnSale = mapWalinkaCatalog([row({ on_sale: false, compare_at_price: 80000 })], []).products[0];
    expect(notOnSale.compareAtPrice).toBeNull();
    const lower = mapWalinkaCatalog([row({ on_sale: true, compare_at_price: 50000 })], []).products[0];
    expect(lower.compareAtPrice).toBeNull();
  });

  it("marca agotados según is_sold_out", () => {
    const [product] = mapWalinkaCatalog([row({ is_sold_out: true })], []).products;
    expect(product.soldOut).toBe(true);
  });

  it("deja imágenes vacías cuando Walinka no informa ninguna URL válida", () => {
    const [product] = mapWalinkaCatalog([row({ images: ["no-es-url", 42] })], []).products;
    expect(product.images).toEqual([]);
  });

  it("disambigua slugs repetidos con el id", () => {
    const result = mapWalinkaCatalog(
      [row({ id: "aaaaaaaa-1", slug: "vaso" }), row({ id: "bbbbbbbb-2", slug: "vaso" })],
      [],
    );
    expect(result.products.map((p) => p.slug)).toEqual(["vaso", "vaso-bbbbbbbb"]);
  });

  it("agrupa categorías en el orden de Walinka y usa la primera fotografía real", () => {
    const rows = [
      row({ id: "1", slug: "a", category: "Luz", images: [] }),
      row({ id: "2", slug: "b", category: "Tiempo", card_image_url: "https://img.example/tiempo.jpg" }),
      row({ id: "3", slug: "c", category: "Tiempo", card_image_url: "https://img.example/otra.jpg" }),
    ];
    const { categories } = mapWalinkaCatalog(rows, [
      { name: "Tiempo", sort_order: 1 },
      { name: "Luz", sort_order: 2 },
    ]);
    expect(categories.map((c) => [c.name, c.count])).toEqual([["Tiempo", 2], ["Luz", 1]]);
    expect(categories[0].image).toBe("https://img.example/tiempo.jpg");
    expect(categories[1].image).toBeNull();
  });
});

describe("extractImages", () => {
  it("prioriza tarjeta, luego principal y luego galería, sin duplicados", () => {
    const images = extractImages(
      row({
        card_image_url: "https://img.example/a.jpg",
        image_url: "https://img.example/a.jpg",
        images: ["https://img.example/b.jpg", "javascript:alert(1)"],
      }),
    );
    expect(images).toEqual(["https://img.example/a.jpg", "https://img.example/b.jpg"]);
  });
});

describe("slugifyText", () => {
  it("quita tildes y normaliza separadores", () => {
    expect(slugifyText("Cerámica & Luz")).toBe("ceramica-luz");
  });
});
