"use client";
import { useEffect, useRef } from "react";

export function Nav({ count }: { count: number }) {
  return (
    <nav className="nav">
      <a className="logo" href="#top">ARTEMIS</a>
      <div className="links">
        <a href="#campanas">Campañas</a>
        <a href="#piezas">Piezas</a>
        <a href="#musa">Musa</a>
      </div>
      <button className="cajon" type="button">Cajón (<span>{count}</span>)</button>
    </nav>
  );
}

/** Barra de progreso del scroll en el borde superior. */
export function Progress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      if (ref.current) ref.current.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    };
    update();
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    return () => {
      removeEventListener("scroll", update);
      removeEventListener("resize", update);
    };
  }, []);
  return <div ref={ref} className="prog" />;
}
