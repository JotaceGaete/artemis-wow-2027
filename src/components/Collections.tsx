"use client";
import type { CSSProperties } from "react";
import { COLLECTIONS } from "@/lib/data";
import { OBJECTS } from "@/lib/objects";
import { ProductImage } from "./ProductImage";

/** Tres colecciones en composición asimétrica (bento). */
export default function Collections() {
  return (
    <section className="section light" id="colecciones" aria-labelledby="col-h">
      <header className="sec-head">
        <div>
          <p className="kicker dark">Colecciones</p>
          <h2 id="col-h" className="h2">Tres maneras de mirar lo viejo</h2>
        </div>
        <a className="link" href="#piezas">Ver todas →</a>
      </header>
      <div className="bento">
        {COLLECTIONS.map((c, i) => {
          const C = OBJECTS[c.o];
          return (
            <a key={c.id} href="#piezas" className={`tile t${i}`} style={{ "--tone": c.tone } as CSSProperties}>
              <div className="tile-img">
                <ProductImage
                  src={`/photos/col-${c.id}.jpg`}
                  alt={c.alt}
                  tone={c.tone}
                  sizes="(max-width:900px) 100vw, 50vw"
                  label="Colección"
                >
                  <C className="art-svg" />
                </ProductImage>
              </div>
              <div className="tile-info">
                <p className="micro">{c.n}</p>
                <h3>{c.t}</h3>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
