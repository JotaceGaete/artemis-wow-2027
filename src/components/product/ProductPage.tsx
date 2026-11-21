"use client";
import { useState, type CSSProperties } from "react";
import Link from "next/link";
import Cursor from "../Cursor";
import Footer from "../Footer";
import { Chars } from "../Chars";
import { MagButton } from "../Magnetic";
import Musa from "../Musa";
import { Nav, Progress } from "../Nav";
import { ProductImage } from "../ProductImage";
import { OBJECTS } from "@/lib/objects";
import { photoUrl } from "@/lib/photos";
import type { Product } from "@/lib/data";
import { PRODUCT_ROUTES, productAnswer, type ProductDetail } from "@/lib/product-detail";
import ProductGallery from "./ProductGallery";
import ProductStory from "./ProductStory";

type Props = { detail: ProductDetail; related: Product[] };

/** Página de detalle de producto. Usa solo datos recibidos; no depende de Walinka. */
export default function ProductPage({ detail: d, related }: Props) {
  const [cajon, setCajon] = useState<string[]>([]);
  const [musaOpen, setMusaOpen] = useState(false);
  const added = cajon.includes(d.id);
  const add = () => setCajon((c) => (c.includes(d.id) ? c : [...c, d.id]));
  const addLabel = added ? "En el cajón ✓" : "Agregar al cajón";

  return (
    <div className="pd">
      <Cursor />
      <Progress />
      <Nav count={cajon.length} base="/" />

      <nav className="pd-crumbs" aria-label="Ubicación">
        <Link href="/">Inicio</Link>
        <span aria-hidden="true">/</span>
        <Link href="/#piezas">Piezas</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{d.name}</span>
      </nav>

      <main>
        <section className="pd-top" aria-label="Pieza">
          <ProductGallery items={d.gallery} name={d.name} tone={d.tone} />

          <aside className="pd-buy" aria-label="Compra">
            <p className="kicker dark">{d.kicker}</p>
            <h1 className="pd-title">
              <span className="sr">{d.name}</span>
              <Chars text={d.name} />
            </h1>
            <p className="pd-intro">{d.intro}</p>

            <div className="pd-price">
              <b>{d.price}</b>
              <small>{d.priceNote}</small>
            </div>

            <ul className="pd-status">
              <li>
                <span className="pd-dot" aria-hidden="true" />
                <b>{d.status}</b>
              </li>
              <li>{d.stock}</li>
              <li>{d.shipping}</li>
            </ul>

            <div className="pd-actions">
              <MagButton className="btn solid pd-add" disabled={added} onClick={add}>
                {addLabel}
              </MagButton>
              <button type="button" className="btn" onClick={() => setMusaOpen(true)}>
                Preguntar a Musa
              </button>
            </div>
          </aside>
        </section>

        <ProductStory chapters={d.story} />

        <section className="pd-spec" aria-labelledby="pd-spec-h">
          <div className="pd-spec-head">
            <p className="kicker dark">Ficha técnica</p>
            <h2 id="pd-spec-h" className="pd-h2">Lo que tiene y lo que le falta</h2>
          </div>
          <dl className="pd-dl">
            {d.specs.map((s) => (
              <div key={s.k} className="pd-dl-row">
                <dt>{s.k}</dt>
                <dd>{s.v}</dd>
              </div>
            ))}
          </dl>
          <div className="pd-cond" aria-label={`Estado de conservación ${d.condition.grade}`}>
            <p className="pd-grade">
              <span>Estado</span>
              <b>{d.condition.grade}</b>
            </p>
            <ul>
              {d.condition.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="pd-musa" aria-labelledby="pd-musa-h">
          <div>
            <p className="kicker">Musa</p>
            <h2 id="pd-musa-h" className="pd-h2">¿Tenés una duda sobre esta pieza?</h2>
            <p className="pd-musa-p">Musa conoce su historia, su cuerda y su estado. Preguntale lo que quieras antes de comprar.</p>
          </div>
          <button type="button" className="btn" onClick={() => setMusaOpen(true)}>
            Abrir chat con Musa
          </button>
        </section>

        <section className="pd-rel" aria-labelledby="pd-rel-h">
          <header className="pd-rel-head">
            <h2 id="pd-rel-h" className="pd-h2">Otras piezas de la mesa</h2>
            <Link className="link" href="/#piezas">Ver todas →</Link>
          </header>
          <div className="pd-rel-grid">
            {related.map((p) => {
              const C = OBJECTS[p.o];
              const href = PRODUCT_ROUTES[p.id] ?? "/#piezas";
              return (
                <article key={p.id} className="rel-card">
                  <Link href={href} className="rel-link">
                    <div className="rel-img" style={{ "--bg": p.bg } as CSSProperties}>
                      <ProductImage src={photoUrl(p.id)} alt={p.alt} tone={p.bg} sizes="(max-width:900px) 70vw, 25vw">
                        <C className="art-svg" />
                      </ProductImage>
                    </div>
                    <div className="rel-body">
                      <h3>{p.t}</h3>
                      <p className="micro">{p.m}</p>
                      <b className="price">{p.p}</b>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      <div className="pd-bar" role="region" aria-label="Compra rápida">
        <div className="pd-bar-info">
          <small>{d.name}</small>
          <b>{d.price}</b>
        </div>
        <MagButton className="btn solid pd-add" disabled={added} onClick={add}>
          {added ? "En el cajón ✓" : "Agregar"}
        </MagButton>
      </div>

      <Footer />
      <Musa
        open={musaOpen}
        setOpen={setMusaOpen}
        greeting={d.musaGreeting}
        chips={d.musaChips}
        answer={(q) => productAnswer(d, q)}
      />
    </div>
  );
}
