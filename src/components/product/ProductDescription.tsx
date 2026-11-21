"use client";
import { useId, useLayoutEffect, useRef, useState } from "react";
import { useReveal } from "@/lib/hooks";

/** Altura visible antes de expandir (px). Aprox. dos párrafos de lectura. */
const COLLAPSED = 232;
/** Margen para no mostrar un botón por una o dos líneas de diferencia. */
const SLACK = 24;

/**
 * Descripción completa del producto: párrafos separados por una línea en blanco.
 * Si el texto cabe en la altura colapsada, se muestra completo y sin controles.
 * Si no, se muestra un extracto con un fundido y un botón "Leer descripción completa" / "Leer menos".
 */
export default function ProductDescription({ text }: { text: string }) {
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const inner = useRef<HTMLDivElement>(null);
  const [full, setFull] = useState(0);
  const [open, setOpen] = useState(false);
  const { ref, cls } = useReveal<HTMLElement>();
  const uid = useId().replace(/:/g, "");
  const bodyId = `${uid}-body`;

  // Medimos antes de pintar para evitar un salto visual, y volvemos a medir si cambia el ancho.
  useLayoutEffect(() => {
    const el = inner.current;
    if (!el) return;
    const measure = () => setFull(el.getBoundingClientRect().height);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [text]);

  const long = full > COLLAPSED + SLACK;
  const collapsed = long && !open;

  return (
    <section ref={ref} className={`pd-desc rv ${cls}`} aria-labelledby={`${uid}-h`}>
      <div className="pd-desc-head">
        <p className="kicker">Sobre la pieza</p>
        <h2 id={`${uid}-h`} className="pd-h2">Descripción</h2>
      </div>

      <div
        id={bodyId}
        className={`pd-desc-body ${collapsed ? "is-collapsed" : ""}`}
        style={long ? { maxHeight: collapsed ? COLLAPSED : full } : undefined}
      >
        <div ref={inner} className="pd-desc-text">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>

      {long && (
        <button
          type="button"
          className="pd-desc-toggle"
          aria-expanded={open}
          aria-controls={bodyId}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Leer menos" : "Leer descripción completa"}
          <span aria-hidden="true" className={`pd-desc-arrow ${open ? "up" : ""}`}>↓</span>
        </button>
      )}
    </section>
  );
}
