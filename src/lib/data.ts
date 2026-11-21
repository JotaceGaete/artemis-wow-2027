import type { ObjectKey } from "./objects";

/* Datos ficticios de demostración. Las rutas de fotos siguen la convención de public/photos/ (ver CREDITS.md). */

export const WORDS = [
  "Segunda selección",
  "Vintage con criterio",
  "Diseño de ayer que sigue vigente",
  "Piezas únicas",
  "Curiosidades",
  "Objetos con historia",
];

export type Campaign = { k: string; t: string; p: string; o: ObjectKey; c: string; pr: string; img: string; alt: string };

export const CAMPAIGNS: Campaign[] = [
  {
    k: "Campaña I — El tiempo",
    t: "La hora prestada",
    p: "Relojes de bolsillo y de mesa que perdieron a su dueño y encontraron otra casa.",
    o: "watch",
    c: "#2F4B57",
    pr: "Desde $89.000",
    img: "/photos/campana-tiempo.jpg",
    alt: "Relojes de bolsillo sobre papel de época",
  },
  {
    k: "Campaña II — La luna",
    t: "Lo que guarda la noche",
    p: "Lámparas, espejos y objetos de nocturno para quien mira el cielo desde el balcón.",
    o: "crescent",
    c: "#5A2E24",
    pr: "Desde $98.000",
    img: "/photos/campana-luna.jpg",
    alt: "Objetos de bronce iluminados en una habitación oscura",
  },
  {
    k: "Campaña III — Barro",
    t: "Cerámica que respira",
    p: "Vasijas hechas a mano, con las fallas que son la firma. Ninguna se repite.",
    o: "vase",
    c: "#6B3B2C",
    pr: "Desde $56.000",
    img: "/photos/campana-barro.jpg",
    alt: "Jarrones de gres sobre una mesa de madera",
  },
  {
    k: "Campaña IV — Lente",
    t: "Cámaras que nunca dispararon",
    p: "Equipos de los setenta con rollo sin usar. La primera foto puede ser la de ellas.",
    o: "camera",
    c: "#1E3138",
    pr: "Desde $210.000",
    img: "/photos/campana-lente.jpg",
    alt: "Cámara de fuelle junto a una ventana",
  },
];

export const CATEGORIES = ["Todo", "Tiempo", "Hogar", "Foto", "Cerámica", "Luz", "Viaje"];

export type Product = { id: string; t: string; cat: string; m: string; p: string; o: ObjectKey; bg: string; alt: string };

export const PRODUCTS: Product[] = [
  { id: "compas", t: "Compás de latón", cat: "Viaje", m: "Navegación · 1931", p: "$68.000", o: "compass", bg: "#D9CBB0", alt: "Compás de latón sobre un mapa antiguo" },
  { id: "esfera", t: "Esfera de vidrio", cat: "Hogar", m: "Pieza única", p: "$124.000", o: "orb", bg: "#C9D6CF", alt: "Esfera de vidrio soplado" },
  { id: "reloj", t: "Reloj de bolsillo", cat: "Tiempo", m: "Segunda selección", p: "$89.000", o: "watch", bg: "#E6D3B8", alt: "Reloj de bolsillo abierto" },
  { id: "camara", t: "Cámara de fuelle", cat: "Foto", m: "Curiosidad", p: "$210.000", o: "camera", bg: "#CDD3D6", alt: "Cámara de fuelle de madera" },
  { id: "jarron", t: "Jarrón de gres", cat: "Cerámica", m: "Hecho a mano", p: "$56.000", o: "vase", bg: "#E3C7B6", alt: "Jarrón de gres con esmalte mate" },
  { id: "luna", t: "Luna de bronce", cat: "Luz", m: "Objeto de diseño", p: "$145.000", o: "crescent", bg: "#DCCBA8", alt: "Figura de bronce con forma de luna" },
  { id: "lampara", t: "Lámpara de mesa", cat: "Luz", m: "Vidrio opalino", p: "$98.000", o: "orb", bg: "#D6DDD4", alt: "Lámpara de mesa de vidrio opalino" },
  { id: "reloj-pared", t: "Reloj de pared", cat: "Tiempo", m: "Esfera crema", p: "$132.000", o: "watch", bg: "#EADBC4", alt: "Reloj de pared con esfera crema" },
];

export type Collection = { id: string; t: string; n: string; o: ObjectKey; tone: string; alt: string };

export const COLLECTIONS: Collection[] = [
  { id: "tiempo", t: "Tiempo prestado", n: "24 piezas", o: "watch", tone: "#2F4B57", alt: "Relojes antiguos sobre una mesa de madera" },
  { id: "luz", t: "Luz de noche", n: "18 piezas", o: "crescent", tone: "#5A2E24", alt: "Lámparas y objetos de bronce" },
  { id: "barro", t: "Barro y fuego", n: "31 piezas", o: "vase", tone: "#6B3B2C", alt: "Cerámica artesanal en estantes" },
];

export const EDITORIAL = {
  k: "Historia de la semana",
  t: "Un reloj que tardó cuarenta años en llegar a su casa",
  p: "Lo encontramos en un cajón de una casa de campo del sur. Tenía la cuerda rota, la tapa rayada y una dedicatoria en el interior. Lo restauramos sin borrar nada de eso.",
  img: "/photos/ed-reloj.jpg",
  alt: "Reloj de bolsillo sobre tela de lino",
  tone: "#E6D3B8",
  o: "watch" as ObjectKey,
};

export const MUSA_GREETING =
  "Hola, soy Musa. Curo lo que entra a Artemis: si es de segunda mano pero todavía tiene algo para decir, pasa por mí. ¿Qué andás buscando?";

export const MUSA_CHIPS = ["¿Qué es la segunda selección?", "Busco un regalo", "¿Qué hay de vintage?"];

export function musaAnswer(q: string): string {
  const k = q.toLowerCase();
  if (k.includes("segunda"))
    return "Son piezas que tuvieron una vida antes. Las revisamos, las limpiamos y les contamos su historia. Si algo está gastado, lo decimos sin vueltas.";
  if (k.includes("regal"))
    return "Buena elección. Para regalar te propongo el reloj de bolsillo: no hay dos iguales y siempre queda bien. ¿Para quién es?";
  if (k.includes("vintage"))
    return 'Vintage con criterio, nada de "retro" pegado con cinta. Cada pieza tiene que tener una razón para estar acá.';
  if (k.includes("precio") || k.includes("cuánto") || k.includes("cuanto"))
    return "Los precios arrancan en $56.000 y las piezas más raras llegan a $210.000. Cada una tiene su ficha con el estado detallado.";
  if (k.includes("hola") || k.includes("buenas"))
    return "Hola. Contame qué espacio querés llenar o qué te gustaría encontrar, y te propongo tres piezas.";
  return "Esa todavía no la tengo cargada. Contame qué espacio querés llenar y te propongo tres piezas.";
}
