import { musaAnswer } from "@/lib/data";
import type { ObjectKey } from "@/lib/objects";

/** Una vista de la galería: fotografía verificada o ilustración SVG de respaldo. */
export type GalleryItem =
  | { kind: "photo"; photo: string; caption: string }
  | { kind: "art"; caption: string };

export type StoryChapter = { n: string; t: string; p: string };

/**
 * Contenido textual del producto. Contrato propuesto para Walinka:
 * los nombres se verifican contra la API real antes de conectarla.
 * - short_description: resumen comercial de 2 o 3 líneas (panel de compra).
 * - description: descripción completa; párrafos separados por una línea en blanco.
 */
export type ProductContent = {
  short_description: string;
  description: string;
};

export type ProductDetail = ProductContent & {
  slug: string;
  /** Id de la pieza en PRODUCTS (ver data.ts) para enlazar con la portada. */
  id: string;
  name: string;
  kicker: string;
  price: string;
  priceNote: string;
  status: string;
  stock: string;
  shipping: string;
  tone: string;
  watch: ObjectKey;
  gallery: GalleryItem[];
  /** Historia documentada de la pieza. Opcional: si falta, la sección no se muestra. */
  story?: StoryChapter[];
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
 * al backend (sin tocar los componentes de la página). Artemis no edita productos.
 */
const FIXTURES: Record<string, ProductDetail> = {
  "reloj-vintage": {
    slug: "reloj-vintage",
    id: "reloj",
    name: "Reloj de bolsillo",
    kicker: "Tiempo · Segunda selección",
    short_description:
      "Latón patinado, esfera crema y una dedicatoria que no borramos. Una pieza que tuvo dueño antes que vos y que todavía tiene tiempo para dar.",
    description: [
      "Reloj de bolsillo de latón con carcasa lisa y esfera de papel crema. El mecanismo es de cuerda manual y fue revisado, limpiado y lubricado antes de salir a la venta. La pátina natural del metal se conserva en los bordes y en el reverso, porque forma parte del objeto.",
      "La esfera no tiene fisuras ni manchas. La tapa presenta rayones finos en el borde, detallados en la ficha de estado. La cuerda fue reemplazada por una nueva para que la pieza funcione desde el primer día.",
      "Es una pieza pensada para quien busca un objeto con uso previo y carácter propio. Puede llevarse en el bolsillo del chaleco, colgarse de una cadena o quedar sobre un escritorio.",
      "Antes de comprar, conviene revisar la ficha técnica y el estado de conservación. Si tenés una duda concreta sobre el funcionamiento o las medidas, preguntale a Musa o consultá con el equipo.",
    ].join("\n\n"),
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
      "Esta pieza tiene una historia larga. Preguntame por la cuerda, la limpieza, el estado o si sirve de regalo.",
    musaChips: ["¿Cómo le doy cuerda?", "¿Qué estado tiene?", "¿Sirve de regalo?"],
  },
};

/** Obtiene el detalle de una pieza. Hoy: fixture local. Mañana: backend de Walinka. */
export async function getProductDetail(slug: string): Promise<ProductDetail | null> {
  return FIXTURES[slug] ?? null;
}

/** Quita acentos y pasa a minúsculas para comparar palabras. */
const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

const specValue = (d: ProductDetail, k: string) => d.specs.find((s) => s.k === k)?.v;

/** Temas que Musa puede responder desde los datos de la ficha. Cada uno devuelve undefined si no hay dato. */
const TOPICS: { words: string[]; answer: (d: ProductDetail) => string | undefined }[] = [
  { words: ["cuerda"], answer: (d) => d.care.winding },
  { words: ["limpi"], answer: (d) => d.care.cleaning },
  { words: ["regal"], answer: (d) => d.care.gift },
  { words: ["envio", "entrega", "llega"], answer: (d) => d.care.shipping },
  { words: ["precio", "vale", "cuesta"], answer: (d) => `${d.price}. ${d.priceNote}.` },
  { words: ["garantia"], answer: (d) => specValue(d, "Garantía") },
  { words: ["material", "latón", "bronce", "vidrio", "papel"], answer: (d) => specValue(d, "Materiales") },
  { words: ["medida", "tamano", "mide", "diametro", "grosor", "peso", "pesa"], answer: (d) => specValue(d, "Medidas") },
  {
    words: ["estado", "rayon", "conservacion", "fisura", "funciona", "gastad"],
    answer: (d) => `Estado ${d.condition.grade}. ${d.condition.notes.join(". ")}.`,
  },
  { words: ["procedencia", "origen", "donde"], answer: (d) => specValue(d, "Procedencia") },
  {
    words: ["historia"],
    answer: (d) =>
      d.story?.length
        ? "Sí: la pieza tiene una historia documentada. Está en la sección «La historia de esta pieza»."
        : "Esta pieza no tiene una historia documentada.",
  },
];

/** Palabras demasiado comunes para usarlas como clave al buscar en la descripción. */
const STOP = new Set(["quien", "cuando", "tiene", "tengo", "sobre", "pieza", "producto", "quiero", "puedo", "tambien", "como", "donde", "reloj", "hacer"]);

/** Busca la primera oración de la descripción que comparta una palabra clave con la pregunta. */
function sentenceFor(d: ProductDetail, q: string): string | undefined {
  const keys = norm(q)
    .split(/[^a-z0-9ñ]+/)
    .filter((w) => w.length >= 5 && !STOP.has(w));
  if (!keys.length) return undefined;
  const text = [d.short_description, d.description].join("\n\n");
  const sentences = text.split(/(?<=[.!?])\s+/);
  return sentences.find((s) => keys.some((k) => norm(s).includes(k)));
}

/**
 * Respuestas de Musa para esta pieza. Solo usa datos de la ficha (descripción, técnica, estado, cuidados).
 * Si no hay dato, lo dice en lugar de inventarlo.
 */
export function productAnswer(d: ProductDetail, q: string): string {
  const k = norm(q);
  for (const t of TOPICS) {
    if (t.words.some((w) => k.includes(w))) {
      const a = t.answer(d);
      if (a) return a;
    }
  }
  const s = sentenceFor(d, q);
  if (s) return s;
  // Preguntas generales de Artemis (no sobre la pieza) siguen usando las respuestas comunes.
  if (/segunda|vintage|hola|buenas/.test(k)) return musaAnswer(q);
  return "No tengo ese dato en la ficha de esta pieza. Si lo necesitás para decidir, consultalo con el equipo de Artemis antes de comprar.";
}
