import type { ObjectKey } from "./objects";

/* Datos ficticios de demostración. */

export const WORDS = [
  "Segunda selección",
  "Vintage con criterio",
  "Diseño de ayer que sigue vigente",
  "Piezas únicas",
  "Curiosidades",
  "Objetos con historia",
];

export type Slide = { k: string; t: string; p: string; o: ObjectKey; c: string; pr: string };

export const SLIDES: Slide[] = [
  {
    k: "Campaña I — El tiempo",
    t: "La hora prestada",
    p: "Relojes de bolsillo y de mesa que perdieron a su dueño y encontraron otra casa. Cada uno marca una hora distinta.",
    o: "watch",
    c: "#2F4B57",
    pr: "Desde $89.000",
  },
  {
    k: "Campaña II — La luna",
    t: "Lo que guarda la noche",
    p: "Lámparas, espejos y objetos de nocturno. Una selección para quien mira el cielo desde el balcón.",
    o: "crescent",
    c: "#5A2E24",
    pr: "Desde $145.000",
  },
  {
    k: "Campaña III — Barro",
    t: "Cerámica que respira",
    p: "Vasijas hechas a mano, con las fallas que son la firma. Ninguna se repite.",
    o: "vase",
    c: "#6B3B2C",
    pr: "Desde $56.000",
  },
  {
    k: "Campaña IV — Lente",
    t: "Cámaras que nunca dispararon",
    p: "Equipos de los setenta con rollo sin usar. La primera foto puede ser la de ellas.",
    o: "camera",
    c: "#1E3138",
    pr: "Desde $210.000",
  },
];

export type Product = { n: string; t: string; m: string; p: string; o: ObjectKey; bg: string };

export const PRODUCTS: Product[] = [
  { n: "014", t: "Compás de latón", m: "Navegación · 1931", p: "$68.000", o: "compass", bg: "#D9CBB0" },
  { n: "022", t: "Esfera de vidrio", m: "Decoración · pieza única", p: "$124.000", o: "orb", bg: "#C9D6CF" },
  { n: "031", t: "Reloj de bolsillo", m: "Tiempo · segunda selección", p: "$89.000", o: "watch", bg: "#E6D3B8" },
  { n: "047", t: "Cámara de fuelle", m: "Foto · curiosidad", p: "$210.000", o: "camera", bg: "#CDD3D6" },
  { n: "058", t: "Jarrón de gres", m: "Cerámica · hecha a mano", p: "$56.000", o: "vase", bg: "#E3C7B6" },
  { n: "069", t: "Luna de bronce", m: "Objeto · diseño", p: "$145.000", o: "crescent", bg: "#DCCBA8" },
];

export type HeroObj = { k: ObjectKey; s: number; x: string; y: string; d: number; cls?: string };

export const HERO_OBJS: HeroObj[] = [
  { k: "orb", s: 230, x: "7%", y: "22%", d: 0.7 },
  { k: "watch", s: 300, x: "72%", y: "10%", d: 1.25, cls: "hide-m" },
  { k: "vase", s: 190, x: "18%", y: "62%", d: 0.95 },
  { k: "compass", s: 150, x: "70%", y: "60%", d: 0.45, cls: "hide-m" },
  { k: "camera", s: 150, x: "52%", y: "4%", d: 1.6, cls: "hide-m" },
  { k: "crescent", s: 130, x: "88%", y: "40%", d: 0.8 },
];

export const MUSA_GREETING =
  "Hola, soy Musa. Curo lo que entra a Artemis: si es de segunda mano pero todavía tiene algo para decir, pasa por mí. ¿Qué andás buscando?";

export const MUSA_CHIPS = ["¿Qué es la segunda selección?", "Busco un regalo", "¿Qué hay de vintage?"];

export function musaAnswer(q: string): string {
  const k = q.toLowerCase();
  if (k.includes("segunda"))
    return "Son piezas que tuvieron una vida antes. Las revisamos, las limpiamos y les contamos su historia. Si algo está gastado, lo decimos sin vueltas.";
  if (k.includes("regal"))
    return "Buena elección. Para regalar te propongo el Reloj de bolsillo: no hay dos iguales y siempre queda bien. ¿Para quién es?";
  if (k.includes("vintage"))
    return 'Vintage con criterio, nada de "retro" pegado con cinta. Cada pieza tiene que tener una razón para estar acá.';
  if (k.includes("precio") || k.includes("cuánto") || k.includes("cuanto"))
    return "Los precios arrancan en $56.000 y las piezas más raras llegan a $210.000. Cada una tiene su ficha con el estado detallado.";
  if (k.includes("hola") || k.includes("buenas"))
    return "Hola. Contame qué espacio querés llenar o qué te gustaría encontrar, y te propongo tres piezas.";
  return "Esa todavía no la tengo cargada. Contame qué espacio querés llenar y te propongo tres piezas.";
}
