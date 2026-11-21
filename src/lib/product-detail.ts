import { musaAnswer } from "@/lib/data";
import type { ObjectKey } from "@/lib/objects";

/** Una vista de la galería: fotografía verificada o ilustración SVG de respaldo. */
export type GalleryItem =
  | { kind: "photo"; photo: string; caption: string }
  | { kind: "art"; caption: string };

export type StoryChapter = { n: string; t: string; p: string };

export type ProductDetail = {
  slug: string;
  /** Id de la pieza en PRODUCTS (ver data.ts) para enlazar con la portada. */
  id: string;
  name: string;
  kicker: string;
  intro: string;
  price: string;
  priceNote: string;
  status: string;
  stock: string;
  shipping: string;
  tone: string;
  watch: ObjectKey;
  gallery: GalleryItem[];
  story: StoryChapter[];
  specs: { k: string; v: string }[];
  condition: { grade: string; notes: string[] };
  /** Garantías y servicios de compra (datos de demostración). */
  trust: string[];
  care: { winding: string; cleaning: string; gift: string; shipping: string };
  musaGreeting: string;
  musaChips: string[];
};

/** Rutas de producto. Las piezas sin entrada siguen en la portada. */
export const PRODUCT_ROUTES: Record<string, string> = {
  reloj: "/producto/reloj-vintage",
};

/**
 * Datos ficticios de demostración.
 * Punto de integración con Walinka: hoy resuelve desde este fixture local.
 * Para conectar productos reales, reemplazar el cuerpo de getProductDetail por una consulta
 * al backend (sin tocar los componentes de la página).
 */
const FIXTURES: Record<string, ProductDetail> = {
  "reloj-vintage": {
    slug: "reloj-vintage",
    id: "reloj",
    name: "Reloj de bolsillo",
    kicker: "Tiempo · Segunda selección",
    intro:
      "Latón patinado, esfera crema y una dedicatoria que no borramos. Una pieza que tuvo dueño antes que vos y que todavía tiene tiempo para dar.",
    price: "$89.000",
    priceNote: "Precio final, impuestos incluidos",
    status: "Disponible",
    stock: "1 pieza · única, sin reposición",
    shipping: "Envío a todo el país con seguro incluido",
    tone: "#E6D3B8",
    watch: "watch",
    gallery: [
      { kind: "photo", photo: "reloj", caption: "Vista general del reloj abierto sobre fondo claro" },
      { kind: "photo", photo: "ed-reloj", caption: "Reloj de bolsillo plateado, detalle de la tapa" },
      { kind: "art", caption: "Ilustración de la pieza, de referencia" },
    ],
    story: [
      {
        n: "I",
        t: "El cajón",
        p: "Lo encontramos en un cajón de una casa de campo del sur. Llevaba años sin darle cuerda y la tapa tenía la marca de algo que alguna vez se apoyó encima.",
      },
      {
        n: "II",
        t: "La restauración",
        p: "Revisamos el mecanismo, limpiamos el latón sin borrar la pátina y reemplazamos la cuerda. La esfera crema quedó como estaba, con sus marcas de uso.",
      },
      {
        n: "III",
        t: "Lo que dejó",
        p: "En el interior hay una dedicatoria grabada con unas iniciales y una fecha. No las tocamos: son la parte de la historia que no nos corresponde contar.",
      },
      {
        n: "IV",
        t: "Hoy",
        p: "Funciona, marca la hora y conserva cada rayón que le dio su vida. Espera a alguien que quiera seguir la historia.",
      },
    ],
    specs: [
      { k: "Materiales", v: "Latón patinado, cristal mineral y esfera de papel crema" },
      { k: "Medidas", v: "Ø 46 mm · grosor 12 mm · 58 g" },
      { k: "Mecanismo", v: "Cuerda manual, revisado y lubricado" },
      { k: "Procedencia", v: "Casa de campo del sur, hallado en un cajón" },
      { k: "Época", v: "Hacia 1931 (estimada)" },
      { k: "Garantía", v: "30 días de funcionamiento" },
    ],
    condition: {
      grade: "B+",
      notes: [
        "Tapa con rayones finos en el borde",
        "Cuerda reemplazada por una nueva",
        "Esfera sin fisuras ni manchas",
        "Mecanismo revisado y lubricado",
      ],
    },
    trust: [
      "Revisión de mecanismo y limpieza antes de publicar",
      "Garantía de funcionamiento de 30 días",
      "Cambio o devolución dentro de 14 días",
    ],
    care: {
      winding: "Dale cuerda suave cada mañana, unas pocas vueltas, sin forzar la corona.",
      cleaning: "Un paño seco y suave. Nada de productos abrasivos sobre el latón.",
      gift: "Sí: es un regalo que dura. Te sugerimos una nota corta con la fecha en el envoltorio.",
      shipping: "Envío a todo el país con seguro incluido. Plazo estimado de 3 a 5 días hábiles.",
    },
    musaGreeting:
      "Esta pieza tiene una historia larga. Preguntame por la cuerda, la limpieza o si sirve de regalo.",
    musaChips: ["¿Cómo le doy cuerda?", "¿Sirve de regalo?", "¿Cómo lo limpio?"],
  },
};

/** Obtiene el detalle de una pieza. Hoy: fixture local. Mañana: backend de Walinka. */
export async function getProductDetail(slug: string): Promise<ProductDetail | null> {
  return FIXTURES[slug] ?? null;
}

/** Respuestas de Musa sobre esta pieza; lo que no conoce cae en la respuesta general. */
export function productAnswer(d: ProductDetail, q: string): string {
  const k = q.toLowerCase();
  if (k.includes("cuerda")) return d.care.winding;
  if (k.includes("limp")) return d.care.cleaning;
  if (k.includes("regal")) return d.care.gift;
  if (k.includes("envío") || k.includes("envio")) return d.care.shipping;
  return musaAnswer(q);
}
