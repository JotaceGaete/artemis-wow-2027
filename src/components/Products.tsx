"use client";
import { useState, type CSSProperties, type PointerEvent } from "react";
import Link from "next/link";
import { OBJECTS } from "@/lib/objects";
import type { ProductCard } from "@/lib/view-types";
import { ProductImage } from "./ProductImage";

/** Grilla de productos con filtros. Inclinación 3D sutil solo en puntero fino. */
export default function Products({
  cards,
  filters,
  added,
  onAdd,
  title = "Lo que está en la mesa esta semana",
}: {
  cards: ProductCard[];
  filters: string[];
  added: string[];
  onAdd: (id: string) => void;
  title?: string;
}) {
  const [cat, setCat] = useState("Todo");
  const list = cards.filter((p) => cat === "Todo" || p.category === cat);

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
          <p className="kicker">Piezas</p>
          <h2 id="piezas-h" className="h2">{title}</h2>
        </div>
        <p className="micro">{list.length} piezas</p>
      </header>
      <div className="filters" role="group" aria-label="Filtrar por categoría">
        {["Todo", ...filters].map((c) => (
          <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}>
            {c}
          </button>
        ))}
      </div>
      {list.length === 0 && <p className="micro">Todavía no hay piezas publicadas en esta categoría.</p>}
      <div className="grid">
        {list.map((p) => {
          const C = p.art ? OBJECTS[p.art] : null;
          const done = added.includes(p.id);
          const media = (
            <>
              <ProductImage src={p.image ?? undefined} alt={p.alt} tone={p.tone} fit="contain" sizes="(max-width:900px) 50vw, 25vw">
                {C && <C className="art-svg" />}
              </ProductImage>
              {p.category && <span className="tag">{p.category}</span>}
            </>
          );
          return (
            <article key={p.id} className="pcard">
              <div className="pcard-in" style={{ "--bg": p.tone } as CSSProperties} onPointerMove={tilt} onPointerLeave={untilt}>
                {p.href ? (
                  <Link href={p.href} className="pimg" aria-label={`Ver ${p.name}`} style={{ display: "block", color: "inherit" }}>{media}</Link>
                ) : (
                  <div className="pimg">{media}</div>
                )}
                <div className="pbody">
                  <h3>{p.href ? <Link href={p.href} style={{ color: "inherit" }}>{p.name}</Link> : p.name}</h3>
                  {p.meta && <p className="micro">{p.meta}</p>}
                  <div className="prow">
                    <b className="price">{p.priceText}</b>
                    <button type="button" className="add" disabled={done || p.soldOut} onClick={() => onAdd(p.id)}>
                      {p.soldOut ? "Agotado" : done ? "En el cajón ✓" : "Agregar"}
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
