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
import { productAnswer as demoAnswer, type ProductDetail } from "@/lib/product-detail";
import { productAnswer as catalogAnswer } from "@/lib/walinka/view";
import type { ProductCard, ProductView } from "@/lib/view-types";
import ProductDescription from "./ProductDescription";
import ProductGallery from "./ProductGallery";
import ProductStory from "./ProductStory";

type Props = {
  view: ProductView;
  related: ProductCard[];
  /** Solo en modo demo: ficha completa para las respuestas de Musa. */
  demo?: ProductDetail;
};

/** Página de detalle. Cada sección aparece solo si hay datos para ella: nunca texto de relleno. */
export default function ProductPage({ view: d, related, demo }: Props) {
  const [cajon, setCajon] = useState<string[]>([]);
  const [musaOpen, setMusaOpen] = useState(false);
  const added = cajon.includes(d.id);
  const blocked = added || d.soldOut;
  const add = () => setCajon((c) => (c.includes(d.id) ? c : [...c, d.id]));
  const addLabel = d.soldOut ? "Agotado" : added ? "En el cajón ✓" : "Agregar al cajón";
  const hasSpecs = d.specs.length > 0 || Boolean(d.condition);
  const answer = (q: string) => (demo ? demoAnswer(demo, q) : catalogAnswer(d, q));

  return (
    <div className="pd">
      <Cursor />
      <Progress />
      <Nav count={cajon.length} base="/" live={!demo} />

      <nav className="pd-crumbs" aria-label="Ubicación">
        <Link href="/">Inicio</Link>
        <span aria-hidden="true">/</span>
        <Link href="/#piezas">Piezas</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{d.name}</span>
      </nav>

      <main>
        <section className="pd-top" aria-label="Pieza">
          {d.gallery.length > 0 ? (
            <ProductGallery items={d.gallery} name={d.name} tone={d.tone} />
          ) : (
            <div className="pg">
              <div className="pg-stage">
                <div className="pg-img" style={{ background: d.tone, aspectRatio: "4 / 5" }} />
              </div>
            </div>
          )}

          <aside className="pd-buy" aria-label="Compra">
            <p className="kicker">{d.kicker}</p>
            <h1 className="pd-title">
              <span className="sr">{d.name}</span>
              <Chars text={d.name} />
            </h1>
            {d.shortDescription && <p className="pd-intro">{d.shortDescription}</p>}

            <div className="pd-price">
              <b>{d.price}</b>
              {d.priceNote && <small>{d.priceNote}</small>}
            </div>

            {(d.status || d.stock || d.shipping) && (
              <ul className="pd-status">
                {d.status && (
                  <li>
                    <span className="pd-dot" aria-hidden="true" />
                    <b>{d.status}</b>
                  </li>
                )}
                {d.stock && <li>{d.stock}</li>}
                {d.shipping && <li>{d.shipping}</li>}
              </ul>
            )}

            <div className="pd-actions">
              <MagButton className="btn solid pd-add" disabled={blocked} onClick={add}>
                {addLabel}
              </MagButton>
              <button type="button" className="btn" onClick={() => setMusaOpen(true)}>
                Preguntar a Musa
              </button>
            </div>

            {d.trust.length > 0 && (
              <ul className="pd-trust" aria-label="Garantías y servicios">
                {d.trust.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            )}
          </aside>
        </section>

        {d.description && <ProductDescription text={d.description} />}

        {d.story && d.story.length > 0 && <ProductStory chapters={d.story} />}

        {hasSpecs && (
          <section className="pd-spec" aria-labelledby="pd-spec-h">
            <div className="pd-spec-head">
              <p className="kicker">Ficha</p>
              <h2 id="pd-spec-h" className="pd-h2">Detalles de la pieza</h2>
            </div>
            {d.specs.length > 0 && (
              <dl className="pd-dl">
                {d.specs.map((s) => (
                  <div key={s.k} className="pd-dl-row">
                    <dt>{s.k}</dt>
                    <dd>{s.v}</dd>
                  </div>
                ))}
              </dl>
            )}
            {d.condition && (
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
            )}
          </section>
        )}

        <section className="pd-musa" aria-labelledby="pd-musa-h">
          <div>
            <p className="kicker">Musa</p>
            <h2 id="pd-musa-h" className="pd-h2">¿Tenés una duda sobre esta pieza?</h2>
            <p className="pd-musa-p">{d.musaIntro}</p>
          </div>
          <button type="button" className="btn" onClick={() => setMusaOpen(true)}>
            Abrir chat con Musa
          </button>
        </section>

        {related.length > 0 && (
          <section className="pd-rel" aria-labelledby="pd-rel-h">
            <header className="pd-rel-head">
              <h2 id="pd-rel-h" className="pd-h2">Otras piezas de la mesa</h2>
              <Link className="link" href="/#piezas">Ver todas →</Link>
            </header>
            <div className="pd-rel-grid">
              {related.map((p) => {
                const C = p.art ? OBJECTS[p.art] : null;
                return (
                  <article key={p.id} className="rel-card">
                    <Link href={p.href ?? "/#piezas"} className="rel-link">
                      <div className="rel-img" style={{ "--bg": p.tone } as CSSProperties}>
                        <ProductImage src={p.image ?? undefined} alt={p.alt} tone={p.tone} fit="contain" sizes="(max-width:900px) 70vw, 25vw">
                          {C && <C className="art-svg" />}
                        </ProductImage>
                      </div>
                      <div className="rel-body">
                        <h3>{p.name}</h3>
                        {p.meta && <p className="micro">{p.meta}</p>}
                        <b className="price">{p.priceText}</b>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </main>

      <div className="pd-bar" role="region" aria-label="Compra rápida">
        <div className="pd-bar-info">
          <small>{d.name}</small>
          <b>{d.price}</b>
        </div>
        <MagButton className="btn solid pd-add" disabled={blocked} onClick={add}>
          {d.soldOut ? "Agotado" : added ? "En el cajón ✓" : "Agregar"}
        </MagButton>
      </div>

      <Footer live={!demo} />
      <Musa
        open={musaOpen}
        setOpen={setMusaOpen}
        greeting={d.musaGreeting}
        chips={d.musaChips}
        answer={answer}
      />
    </div>
  );
}
