"use client";
import { useEffect, useRef, useState } from "react";

/** Navegación superior con menú móvil y contador del cajón. */
export function Nav({ count }: { count: number }) {
  const [open, setOpen] = useState(false);
  return (
    <nav className="nav" aria-label="Principal">
      <a className="logo" href="#top">ARTEMIS</a>
      <button className="menu-btn" type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {open ? "Cerrar" : "Menú"}
      </button>
      <div className={`links ${open ? "open" : ""}`} onClick={() => setOpen(false)}>
        <a href="#campanas">Campañas</a>
        <a href="#colecciones">Colecciones</a>
        <a href="#piezas">Piezas</a>
        <a href="#musa">Musa</a>
      </div>
      <button className="cajon" type="button">Cajón (<span>{count}</span>)</button>
    </nav>
  );
}

/** Barra de progreso del scroll. */
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
