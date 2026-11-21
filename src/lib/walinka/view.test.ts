import { describe, expect, it } from "vitest";
import type { WalinkaProduct } from "./types";
import { formatCLP, heroSlides, productAnswer, productCard, productView, storeAnswer, storeFacts } from "./view";

const base: WalinkaProduct = {
  id: "p1",
  slug: "reloj",
  name: "Reloj",
  description: "Latón patinado con esfera crema. La cuerda se revisó antes de la venta.",
  categorySlug: "tiempo",
  categoryName: "Tiempo",
  price: 68000,
  compareAtPrice: null,
  soldOut: false,
  images: ["https://img.example/reloj.jpg"],
  createdAt: "2026-01-01T00:00:00Z",
};
const other: WalinkaProduct = { ...base, id: "p2", slug: "lampara", name: "Lámpara", price: 45000, soldOut: true, categorySlug: "luz", categoryName: "Luz", images: [] };

describe("formatCLP", () => {
  it("formatea pesos chilenos sin decimales", () => {
    expect(formatCLP(68000)).toMatch(/68\.000/);
  });
});

describe("productCard", () => {
  it("apunta a la ficha por slug y no inventa texto secundario", () => {
    const card = productCard(base);
    expect(card.href).toBe("/producto/reloj");
    expect(card.meta).toBe("");
    expect(card.image).toBe("https://img.example/reloj.jpg");
  });

  it("muestra el precio anterior solo cuando existe", () => {
    expect(productCard({ ...base, compareAtPrice: 80000 }).meta).toMatch(/Antes .*80\.000/);
  });
});

describe("heroSlides", () => {
  it("usa el precio mínimo real de cada categoría", () => {
    const categories = [{ slug: "tiempo", name: "Tiempo", count: 1, image: null }];
    const [slide] = heroSlides(categories, [base, { ...base, id: "p3", price: 52000, categorySlug: "tiempo" }], ["#000"]);
    expect(slide.price).toMatch(/Desde .*52\.000/);
    expect(slide.text).toBe("1 pieza en la tienda");
  });
});

describe("storeAnswer", () => {
  const facts = storeFacts({
    products: [base, other],
    categories: [
      { slug: "tiempo", name: "Tiempo", count: 1, image: null },
      { slug: "luz", name: "Luz", count: 1, image: null },
    ],
    omittedCount: 0,
    hiddenPriceCount: 0,
  });

  it("responde categorías y rangos de precio desde el catálogo", () => {
    expect(storeAnswer("¿Qué categorías hay?", facts)).toBe("Las categorías publicadas son: Tiempo, Luz.");
    expect(storeAnswer("¿Cuánto cuestan?", facts)).toMatch(/desde .*45\.000 hasta .*68\.000/);
  });

  it("cuenta disponibles y agotadas", () => {
    expect(storeAnswer("¿Qué hay disponible?", facts)).toBe("1 pieza disponible y 1 agotadas, según el catálogo.");
  });

  it("no responde con datos inventados ante una pregunta fuera del catálogo", () => {
    expect(storeAnswer("¿Dan garantía de por vida?", facts)).toMatch(/No tengo ese dato/);
  });

  it("indica catálogo vacío", () => {
    expect(storeAnswer("hola", storeFacts({ products: [], categories: [], omittedCount: 0, hiddenPriceCount: 0 }))).toMatch(/Todavía no hay piezas/);
  });
});

describe("productAnswer", () => {
  const view = productView(base);

  it("responde precio y disponibilidad desde los datos del producto", () => {
    expect(productAnswer(view, "¿Cuánto cuesta?")).toMatch(/68\.000/);
    expect(productAnswer(view, "¿Está disponible?")).toBe("Figura como disponible en el catálogo.");
    expect(productAnswer(productView(other), "¿Está disponible?")).toBe("Figura como agotada en el catálogo.");
  });

  it("busca la frase de la descripción que comparte palabras con la pregunta", () => {
    expect(productAnswer(view, "¿Cómo está la esfera?")).toBe("Latón patinado con esfera crema.");
  });

  it("no inventa garantías ni medidas que la ficha no tiene", () => {
    expect(productAnswer(view, "¿Tiene garantía de 30 días?")).toMatch(/No tengo ese dato/);
  });

  it("no muestra secciones vacías en la vista de producto", () => {
    expect(view.specs).toEqual([]);
    expect(view.trust).toEqual([]);
    expect(view.condition).toBeUndefined();
    expect(view.gallery[0]).toEqual({ kind: "remote", src: "https://img.example/reloj.jpg", caption: "Reloj" });
  });
});
