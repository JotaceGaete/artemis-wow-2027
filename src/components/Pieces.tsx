"use client";
import { useEffect, useRef, type CSSProperties, type PointerEvent } from "react";
import { PRODUCTS } from "@/lib/data";
import { OBJECTS } from "@/lib/objects";

/** Franja de piezas que avanza horizontalmente con el scroll vertical; cada tarjeta se inclina en 3D. */
export default function Pieces({ added, onAdd }: { added: string[]; onAdd: (n: string) => void }) {
  const secRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sec = secRef.current;
    const track = trackRef.current;
    if (!sec || !track) return;
    const update = () => {
      const r = sec.getBoundingClientRect();
      const total = sec.offsetHeight - innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / total));
      const max = Math.max(0, track.scrollWidth - innerWidth + 60);
      track.style.transform = `translate3d(${-p * max}px,0,0)`;
    };
    update();
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    return () => {
      removeEventListener("scroll", update);
      removeEventListener("resize", update);
    };
  }, []);

  const tilt = (e: PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", ((y - 0.5) * -14).toFixed(2) + "deg");
    el.style.setProperty("--ry", ((x - 0.5) * 18).toFixed(2) + "deg");
  };
  const untilt = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  };

  return (
    <section className="pieces" id="piezas" ref={secRef}>
      <div className="pieces-sticky">
        <div className="pieces-head">
          <div>
            <p className="kicker">Colecciones</p>
            <h2 className="h2">
              Piezas que aparecen
              <br />
              de a poco
            </h2>
          </div>
          <p className="small">Seguí bajando y las piezas cruzan la pantalla. Pasá el cursor sobre una para inclinarla.</p>
        </div>
        <div className="track-h" ref={trackRef}>
          {PRODUCTS.map((p, i) => {
            const C = OBJECTS[p.o];
            const done = added.includes(p.n);
            return (
              <article key={p.n} className="card">
                <div
                  className="card-in"
                  style={{ "--bg": p.bg } as CSSProperties}
                  onPointerMove={tilt}
                  onPointerLeave={untilt}
                >
                  <div className="c-top">
                    <span>Nº {p.n}</span>
                    <span>disponible</span>
                  </div>
                  <div className="art" style={{ "--i": i } as CSSProperties}>
                    <C />
                  </div>
                  <div>
                    <h3>{p.t}</h3>
                    <p className="m">{p.m}</p>
                    <div className="c-bot">
                      <b>{p.p}</b>
                      <button className="add" type="button" disabled={done} onClick={() => onAdd(p.n)}>
                        {done ? "En el cajón ✓" : "Agregar"}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
