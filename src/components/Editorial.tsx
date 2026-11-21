import { EDITORIAL } from "@/lib/data";
import { ProductImage } from "./ProductImage";
import { MagLink } from "./Magnetic";

/** Banda editorial con una pieza destacada. */
export default function Editorial() {
  return (
    <section className="editorial" aria-labelledby="ed-h">
      <div className="ed-text">
        <p className="kicker">{EDITORIAL.k}</p>
        <h2 id="ed-h" className="h2">{EDITORIAL.t}</h2>
        <p>{EDITORIAL.p}</p>
        <MagLink className="btn solid" href="#piezas">Ver el reloj</MagLink>
      </div>
      <div className="ed-media">
        <ProductImage src={EDITORIAL.img} alt={EDITORIAL.alt} tone={EDITORIAL.tone} sizes="(max-width:900px) 100vw, 40vw" label="Historia" />
      </div>
    </section>
  );
}
