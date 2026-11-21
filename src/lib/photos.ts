/**
 * Registro de fotografías remotas (Unsplash).
 * Solo se incluyen URLs que cargaron en el navegador de prueba (ver public/photos/CREDITS.md).
 * Autor y licencia se extrajeron de cada página de Unsplash; revisar antes de publicar.
 * Las piezas sin entrada usan la ilustración SVG como fondo, sin texto de marcador.
 */

export type Photo = {
  url: string;
  author: string;
  page: string;
  license: string;
  date: string;
};

const IMG = (id: string) => `https://images.unsplash.com/${id}?fm=jpg&q=60&w=800&auto=format&fit=crop`;

const LICENSE = "Unsplash License";

/** Fotos por id de pieza de producto, colección o banda editorial. */
export const PHOTOS: Record<string, Photo> = {
  compas: {
    url: IMG("photo-1516503424803-708327384b90"),
    author: "Aaron Burden (@aaronburden)",
    page: "https://unsplash.com/photos/shallow-focus-photo-of-compass-NXt5PrOb_7U",
    license: LICENSE,
    date: "2018-01-21",
  },
  jarron: {
    url: IMG("photo-1638303322580-5e6aacd59c0d"),
    author: "Mary Skrynnikova (@mary_skr)",
    page: "https://unsplash.com/photos/a-white-vase-sitting-on-top-of-a-table-uluH5a0sRdw",
    license: LICENSE,
    date: "2021-11-30",
  },
  esfera: {
    url: IMG("photo-1590185940417-254c5fa3c612"),
    author: "Adib Hussain (@r_ded)",
    page: "https://unsplash.com/photos/clear-glass-ball-on-brown-wooden-table-d-X5eWRSOro",
    license: LICENSE,
    date: "2020-05-22",
  },
  reloj: {
    url: IMG("photo-1518520247810-9d56f8bc5556"),
    author: "Valentin Antonucci (@valentinantonucci)",
    page: "https://unsplash.com/photos/round-brass-colored-analog-watch-on-top-of-brown-surface-Xz-Y2MAoj0s",
    license: LICENSE,
    date: "2018-02-13",
  },
  "ed-reloj": {
    url: IMG("photo-1535856010157-629669745746"),
    author: "Shawn Lee (@shawn99lee)",
    page: "https://unsplash.com/photos/silver-colored-pocket-watch-vuEiSEegQAk",
    license: LICENSE,
    date: "2018-09-02",
  },
};

/** URL de la foto de una pieza, o undefined si aún no hay una verificada. */
export function photoUrl(id: string): string | undefined {
  return PHOTOS[id]?.url;
}
