import { EDITORIAL } from "@/lib/data";
import { OBJECTS } from "@/lib/objects";
import { photoUrl } from "@/lib/photos";
import { ProductImage } from "./ProductImage";
import { MagLink } from "./Magnetic";

/** Banda editorial con una pieza destacada. */
export default function Editorial() {
  const C = OBJECTS[EDITORIAL.o];
  return (
    <section className="editorial" aria-labelledby="ed-h">
      <div className="ed-text">
        <p className="kicker">{EDITORIAL.k}</p>
        <h2 id="ed-h" className="h2">{EDITORIAL.t}</h2>
        <p>{EDITORIAL.p}</p>
        <MagLink className="btn solid" href="#piezas">Ver el reloj</MagLink>
      </div>
      <div className="ed-media">
        <ProductImage src={photoUrl("ed-reloj")} alt={EDITORIAL.alt} tone={EDITORIAL.tone} sizes="(max-width:900px) 100vw, 40vw">
          <C className="art-svg" />
        </ProductImage>
      </div>
    </section>
  );
}
