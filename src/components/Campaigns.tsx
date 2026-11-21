"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { SLIDES } from "@/lib/data";
import { OBJECTS } from "@/lib/objects";
import { Chars } from "./Chars";
import { MagButton, MagLink } from "./Magnetic";

/** Carrusel de campañas: transición de iris circular, letras reveladas y avance automático. */
export default function Campaigns() {
  const [cur, setCur] = useState(0);
  const [prev, setPrev] = useState(0);
  const dragX = useRef<number | null>(null);
  const n = SLIDES.length;

  const go = (to: number) => {
    setPrev(cur);
    setCur(((to % n) + n) % n);
  };

  // Avance automático cada 6 s; se reinicia en cada cambio.
  useEffect(() => {
    const t = window.setTimeout(() => {
      setPrev(cur);
      setCur((cur + 1) % n);
    }, 6000);
    return () => clearTimeout(t);
  }, [cur, n]);

  return (
    <section
      className="camps"
      id="campanas"
      onPointerDown={(e) => {
        dragX.current = e.clientX;
      }}
      onPointerUp={(e) => {
        if (dragX.current === null) return;
        const dx = e.clientX - dragX.current;
        dragX.current = null;
        if (Math.abs(dx) > 60) go(cur + (dx < 0 ? 1 : -1));
      }}
    >
      <div id="slides">
        {SLIDES.map((s, i) => {
          const C = OBJECTS[s.o];
          const active = i === cur;
          const isPrev = i === prev && prev !== cur;
          return (
            <article
              key={s.t}
              className={`slide ${active ? "is-active" : ""} ${isPrev ? "is-prev" : ""}`}
              style={{ "--c": s.c } as CSSProperties}
            >
              <div className="slide-obj">
                <C />
              </div>
              <div className="slide-txt">
                <p className="kicker">{s.k}</p>
                <h2 className="s-title">
                  <Chars text={s.t} />
                </h2>
                <p className="s-p">{s.p}</p>
                <div className="s-meta">
                  <span>{s.pr}</span>
                  <MagLink className="btn" href="#piezas">Ver piezas</MagLink>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <div className="camp-ctrl">
        <MagButton className="rd" aria-label="Campaña anterior" onClick={() => go(cur - 1)}>←</MagButton>
        <MagButton className="rd" aria-label="Campaña siguiente" onClick={() => go(cur + 1)}>→</MagButton>
        <span className="count">{`0${cur + 1} / 0${n}`}</span>
        <div className="bar">
          {/* key reinicia la animación de la barra en cada cambio */}
          <i key={cur} />
        </div>
      </div>
    </section>
  );
}
