"use client";
import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import type { GalleryItem } from "@/lib/product-detail";
import { photoUrl } from "@/lib/photos";
import { Watch } from "@/lib/objects";
import { ProductImage } from "../ProductImage";

type Props = { items: GalleryItem[]; name: string; tone: string };

/**
 * Galería editorial: deslizamiento táctil y con mouse, teclado, miniaturas y ampliación.
 * La ampliación sigue el puntero en escritorio y se activa con un toque en móvil.
 */
export default function ProductGallery({ items, name, tone }: Props) {
  const [i, setI] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const startX = useRef<number | null>(null);
  const n = items.length;

  const go = (k: number) => {
    setZoom(false);
    setI((k + n) % n);
  };

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    startX.current = e.clientX;
  };
  const onUp = (e: PointerEvent<HTMLDivElement>) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1));
  };
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") go(i + 1);
    if (e.key === "ArrowLeft") go(i - 1);
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!zoom || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <div className="pg">
      <div
        className="pg-stage"
        tabIndex={0}
        role="group"
        aria-roledescription="carrusel"
        aria-label={`Fotos de ${name}. Usá las flechas para cambiar.`}
        onKeyDown={onKey}
        onPointerDown={onDown}
        onPointerUp={onUp}
        onPointerCancel={() => (startX.current = null)}
        onPointerMove={onMove}
      >
        <div className="pg-track" style={{ transform: `translate3d(${-i * 100}%,0,0)` }}>
          {items.map((it, k) => (
            <figure key={k} className="pg-slide" aria-hidden={k !== i} aria-roledescription="diapositiva">
              <div
                className={`pg-img ${zoom && k === i ? "zoomed" : ""}`}
                style={{ transformOrigin: origin }}
                onClick={() => k === i && setZoom((z) => !z)}
              >
                {it.kind === "photo" ? (
                  <ProductImage
                    src={photoUrl(it.photo)}
                    alt={it.caption}
                    tone={tone}
                    sizes="(max-width:900px) 100vw, 56vw"
                    priority={k === 0}
                  >
                    <Watch className="art-svg" />
                  </ProductImage>
                ) : (
                  <ProductImage alt={it.caption} tone={tone}>
                    <Watch className="art-svg" />
                  </ProductImage>
                )}
              </div>
              <figcaption className="pg-cap">{it.caption}</figcaption>
            </figure>
          ))}
        </div>
        <div className="pg-count" aria-live="polite">
          {String(i + 1).padStart(2, "0")} <span>/ {String(n).padStart(2, "0")}</span>
        </div>
        <button
          type="button"
          className="pg-zoom"
          aria-pressed={zoom}
          onClick={() => setZoom((z) => !z)}
        >
          {zoom ? "Reducir" : "Ampliar"}
        </button>
      </div>
      <div className="pg-thumbs" role="group" aria-label="Miniaturas">
        {items.map((it, k) => (
          <button
            key={k}
            type="button"
            className={`pg-thumb ${k === i ? "is-on" : ""}`}
            aria-label={`Ver ${it.caption}`}
            aria-current={k === i}
            onClick={() => go(k)}
            style={{ background: tone }}
          >
            {it.kind === "photo" ? (
              <img
                src={photoUrl(it.photo)}
                alt=""
                loading="lazy"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            ) : (
              <span className="pg-thumb-art" style={{ background: tone }}>
                <Watch className="art-svg" />
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
