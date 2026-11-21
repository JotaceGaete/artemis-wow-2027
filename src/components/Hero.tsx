"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { HERO_OBJS } from "@/lib/data";
import { OBJECTS } from "@/lib/objects";
import { pointer, useReveal } from "@/lib/hooks";
import { Chars } from "./Chars";
import { MagButton, MagLink } from "./Magnetic";

type Particle = { x: number; y: number; vx: number; vy: number; r: number; a: number };

export default function Hero({ onMusa }: { onMusa: () => void }) {
  const wordRef = useRef<HTMLHeadingElement>(null);
  const bigRef = useRef<HTMLDivElement>(null);
  const dustRef = useRef<HTMLCanvasElement>(null);
  const objRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [ready, setReady] = useState(false);
  const kicker = useReveal<HTMLParagraphElement>();
  const sub = useReveal<HTMLParagraphElement>();
  const cta = useReveal<HTMLDivElement>();

  // Dispara la entrada de las letras del título tras 150 ms.
  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 150);
    return () => clearTimeout(t);
  }, []);

  // Parallax de objetos por cursor y scroll, ondulación de letras y desplazamiento de "2027".
  useEffect(() => {
    const fine = window.matchMedia("(pointer:fine)").matches ? 1 : 0;
    const letters = Array.from(wordRef.current?.querySelectorAll<HTMLElement>(".c") ?? []);
    let mx = 0,
      my = 0,
      cx = 0,
      cy = 0,
      raf = 0;
    const onMove = (e: PointerEvent) => {
      mx = (e.clientX / innerWidth) * 2 - 1;
      my = (e.clientY / innerHeight) * 2 - 1;
    };
    const frame = () => {
      cx += (mx - cx) * 0.06;
      cy += (my - cy) * 0.06;
      const sy = scrollY;
      HERO_OBJS.forEach((o, i) => {
        const el = objRefs.current[i];
        if (el)
          el.style.transform = `translate3d(${cx * o.d * 34}px, ${cy * o.d * 34 - sy * 0.25 * o.d}px, 0) rotate(${cx * o.d * 5}deg)`;
      });
      if (bigRef.current)
        bigRef.current.style.transform = `translate(-50%, calc(-50% + ${sy * 0.3}px)) translateX(${cx * -30}px)`;
      letters.forEach((el, i) =>
        el.style.setProperty("--sk", (Math.sin(i * 0.9 + cx * 2.5) * 5 * fine).toFixed(2) + "deg"),
      );
      raf = requestAnimationFrame(frame);
    };
    addEventListener("pointermove", onMove, { passive: true });
    frame();
    return () => {
      removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Polvo luminoso que se aparta del cursor.
  useEffect(() => {
    const cv = dustRef.current;
    const g = cv?.getContext("2d");
    if (!cv || !g) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let P: Particle[] = [];
    let raf = 0;
    const resize = () => {
      const r = cv.getBoundingClientRect();
      cv.width = r.width * dpr;
      cv.height = r.height * dpr;
      const n = Math.round((r.width * r.height) / 9000);
      P = Array.from({ length: n }, () => ({
        x: Math.random() * cv.width,
        y: Math.random() * cv.height,
        vx: 0,
        vy: 0,
        r: (Math.random() * 1.6 + 0.3) * dpr,
        a: Math.random() * 0.6 + 0.2,
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
      const R = 160 * dpr;
      g.clearRect(0, 0, cv.width, cv.height);
      for (const p of P) {
        const dx = p.x - mx,
          dy = p.y - my,
          d2 = dx * dx + dy * dy;
        if (d2 < R * R) {
          const d = Math.sqrt(d2) || 1,
            f = (1 - d / R) * 0.9;
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
        g.fillStyle = `rgba(232,196,143,${p.a})`;
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
    <header className="hero" id="top">
      <canvas ref={dustRef} />
      <div className="big-year" ref={bigRef} aria-hidden="true">2027</div>
      <div className="objs">
        {HERO_OBJS.map((o, i) => {
          const C = OBJECTS[o.k];
          return (
            <div
              key={o.k}
              ref={(el) => {
                objRefs.current[i] = el;
              }}
              className={`obj ${o.cls ?? ""}`}
              style={{ left: o.x, top: o.y, width: o.s, "--i": i } as CSSProperties}
            >
              <C />
            </div>
          );
        })}
      </div>
      <div className="title">
        <p ref={kicker.ref} className={`kicker rv ${kicker.cls}`}>
          Colección 2027 · segunda selección
        </p>
        <h1 ref={wordRef} className={`word ${ready ? "is-in" : ""}`} aria-label="ARTEMIS">
          <Chars text="ARTEMIS" />
        </h1>
        <p ref={sub.ref} className={`hero-sub rv ${sub.cls}`}>
          Objetos con historia, elegidos uno por uno. Vintage, modernos, raros. Nada de catálogo infinito: pocas piezas, bien contadas.
        </p>
        <div ref={cta.ref} className={`cta-row rv ${cta.cls}`}>
          <MagLink className="btn solid" href="#piezas">Entrar a la colección</MagLink>
          <MagButton className="btn" type="button" onClick={onMusa}>Hablar con Musa</MagButton>
        </div>
      </div>
      <div className="hero-foot">
        <span>Piezas únicas</span>
        <span>Envíos a todo Chile</span>
        <span>Deslizá ↓</span>
      </div>
    </header>
  );
}
