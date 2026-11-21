"use client";
import { useEffect, useRef } from "react";

/** Cursor personalizado: anillo que sigue con inercia y crece sobre elementos interactivos. */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c || !window.matchMedia("(pointer:fine)").matches) return;
    let x = 0,
      y = 0,
      rx = 0,
      ry = 0,
      raf = 0;
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
    };
    const over = (e: PointerEvent) => {
      const t = e.target as Element | null;
      c.classList.toggle("big", !!t?.closest("a,button,input,[data-hover],.card,.slide-obj,.big-foot span"));
    };
    const loop = () => {
      rx += (x - rx) * 0.25;
      ry += (y - ry) * 0.25;
      c.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      raf = requestAnimationFrame(loop);
    };
    addEventListener("pointermove", move);
    document.addEventListener("pointerover", over);
    loop();
    return () => {
      removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <div ref={ref} className="cur" />;
}
