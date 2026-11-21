"use client";
import { useState, type CSSProperties, type PointerEvent } from "react";
import { CATEGORIES, PRODUCTS } from "@/lib/data";
import { OBJECTS } from "@/lib/objects";
import { ProductImage } from "./ProductImage";

/** Grilla de productos con filtros. Inclinación 3D sutil solo en puntero fino. */
export default function Products({ added, onAdd }: { added: string[]; onAdd: (id: string) => void }) {
  const [cat, setCat] = useState("Todo");
  const list = PRODUCTS.filter((p) => cat === "Todo" || p.cat === cat);

  const tilt = (e: PointerEvent<HTMLDivElement>) => {
    if (!window.matchMedia("(pointer:fine)").matches) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", ((y - 0.5) * -6).toFixed(2) + "deg");
    el.style.setProperty("--ry", ((x - 0.5) * 8).toFixed(2) + "deg");
  };
  const untilt = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  };

  return (
    <section className="section light" id="piezas" aria-labelledby="piezas-h">
      <header className="sec-head">
        <div>
          <p className="kicker dark">Piezas</p>
          <h2 id="piezas-h" className="h2">Lo que está en la mesa esta semana</h2>
        </div>
        <p className="micro">{list.length} piezas</p>
      </header>
      <div className="filters" role="group" aria-label="Filtrar por categoría">
        {CATEGORIES.map((c) => (
          <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}>
            {c}
          </button>
        ))}
      </div>
      <div className="grid">
        {list.map((p) => {
          const C = OBJECTS[p.o];
          const done = added.includes(p.id);
          return (
            <article key={p.id} className="pcard">
              <div className="pcard-in" style={{ "--bg": p.bg } as CSSProperties} onPointerMove={tilt} onPointerLeave={untilt}>
                <div className="pimg">
                  <ProductImage src={`/photos/p-${p.id}.jpg`} alt={p.alt} tone={p.bg} sizes="(max-width:900px) 50vw, 25vw" label={p.cat}>
                    <C className="art-svg" />
                  </ProductImage>
                  <span className="tag">{p.cat}</span>
                </div>
                <div className="pbody">
                  <h3>{p.t}</h3>
                  <p className="micro">{p.m}</p>
                  <div className="prow">
                    <b className="price">{p.p}</b>
                    <button type="button" className="add" disabled={done} onClick={() => onAdd(p.id)}>
                      {done ? "En el cajón ✓" : "Agregar"}
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
