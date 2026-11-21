"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { CAMPAIGNS } from "@/lib/data";
import { OBJECTS } from "@/lib/objects";
import { pointer } from "@/lib/hooks";
import { Chars } from "./Chars";
import { MagLink } from "./Magnetic";

type Particle = { x: number; y: number; vx: number; vy: number; r: number; a: number };

/** Hero compacto: carrusel de campañas con transición de iris, parallax por cursor y polvo luminoso. */
export default function Hero() {
  const stageRef = useRef<HTMLElement>(null);
  const dustRef = useRef<HTMLCanvasElement>(null);
  const [cur, setCur] = useState(0);
  const [prev, setPrev] = useState(0);
  const [ready, setReady] = useState(false);
  const n = CAMPAIGNS.length;

  const go = (to: number) => {
    setPrev(cur);
    setCur(((to % n) + n) % n);
  };

  // Revelado de la marca al cargar.
  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 150);
    return () => clearTimeout(t);
  }, []);

  // Avance automático cada 7 s.
  useEffect(() => {
    const t = window.setTimeout(() => {
      setPrev(cur);
      setCur((cur + 1) % n);
    }, 7000);
    return () => clearTimeout(t);
  }, [cur, n]);

  // Parallax por variables CSS (--mx, --my) con interpolación suave. Más suave en táctil.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const strength = window.matchMedia("(pointer:fine)").matches ? 1 : 0.35;
    let mx = 0, my = 0, cx = 0, cy = 0, raf = 0;
    const onMove = (e: PointerEvent) => {
      mx = (e.clientX / innerWidth) * 2 - 1;
      my = (e.clientY / innerHeight) * 2 - 1;
    };
    const frame = () => {
      cx += (mx - cx) * 0.06;
      cy += (my - cy) * 0.06;
      el.style.setProperty("--mx", (cx * strength).toFixed(3));
      el.style.setProperty("--my", (cy * strength).toFixed(3));
      raf = requestAnimationFrame(frame);
    };
    addEventListener("pointermove", onMove, { passive: true });
    frame();
    return () => {
      removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Polvo luminoso de baja densidad que se aparta del cursor.
  useEffect(() => {
    const cv = dustRef.current;
    const g = cv?.getContext("2d");
    if (!cv || !g) return;
    // Color de las partículas tomado del token --c-accent-rgb (una sola lectura al montar).
    const dustRgb = getComputedStyle(document.documentElement).getPropertyValue("--c-accent-rgb").trim() || "233,154,187";
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let P: Particle[] = [];
    let raf = 0;
    const resize = () => {
      const r = cv.getBoundingClientRect();
      cv.width = r.width * dpr;
      cv.height = r.height * dpr;
      const count = Math.round((r.width * r.height) / 16000);
      P = Array.from({ length: count }, () => ({
        x: Math.random() * cv.width,
        y: Math.random() * cv.height,
        vx: 0,
        vy: 0,
        r: (Math.random() * 1.4 + 0.3) * dpr,
        a: Math.random() * 0.5 + 0.15,
      }));
    };
    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    const draw = () => {
      const r = cv.getBoundingClientRect();
      const mx = (pointer.x - r.left) * dpr;
      const my = (pointer.y - r.top) * dpr;
      const R = 140 * dpr;
      g.clearRect(0, 0, cv.width, cv.height);
      for (const p of P) {
        const dx = p.x - mx, dy = p.y - my, d2 = dx * dx + dy * dy;
        if (d2 < R * R) {
          const d = Math.sqrt(d2) || 1, f = (1 - d / R) * 0.8;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
        p.vx *= 0.95;
        p.vy *= 0.95;
        p.vx += (Math.random() - 0.5) * 0.02 * dpr;
        p.vy += -0.012 * dpr;
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) p.y = cv.height + 10;
        if (p.x < -10) p.x = cv.width + 10;
        if (p.x > cv.width + 10) p.x = -10;
        g.beginPath();
        g.arc(p.x, p.y, p.r, 0, 6.283);
        g.fillStyle = `rgba(${dustRgb},${p.a})`;
        g.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    resize();
    draw();
    addEventListener("resize", resize);
    addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <section className="stage" ref={stageRef} id="top" aria-roledescription="carrusel" aria-label="Campañas destacadas">
      <canvas ref={dustRef} className="dust" aria-hidden="true" />
      <h1 className={`wordmark ${ready ? "is-in" : ""}`} aria-label="ARTEMIS">
        <Chars text="ARTEMIS" />
      </h1>

      {CAMPAIGNS.map((s, i) => {
        const C = OBJECTS[s.o];
        const active = i === cur;
        const isPrev = i === prev && prev !== cur;
        return (
          <article
            key={s.t}
            className={`slide ${active ? "is-active" : ""} ${isPrev ? "is-prev" : ""}`}
            style={{ "--c": s.c } as CSSProperties}
            aria-hidden={!active}
          >
            <div className="slide-art" style={{ "--d": 1 } as CSSProperties}>
              <div className="slide-art-inner">
                <C className="art-svg" />
              </div>
            </div>
            <div className="slide-copy">
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

      <div className="thumbs" role="group" aria-label="Elegir campaña">
        {CAMPAIGNS.map((s, i) => (
          <button
            key={s.t}
            type="button"
            className={`thumb ${i === cur ? "on" : ""}`}
            onClick={() => go(i)}
            aria-label={`Ver ${s.t}`}
            aria-pressed={i === cur}
          >
            <span>{`0${i + 1}`}</span>
            {s.k.split("— ")[1]}
            {i === cur && <i key={cur} className="tbar" />}
          </button>
        ))}
      </div>
    </section>
  );
}
