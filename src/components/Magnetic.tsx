"use client";
import { useEffect, useRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes } from "react";

/** Efecto magnético: el elemento sigue levemente al cursor (solo con puntero fino). */
export function useMagnetic<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer:fine)").matches) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
    };
    const leave = () => {
      el.style.transform = "";
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);
  return ref;
}

export function MagButton({ className = "", ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) {
  const ref = useMagnetic<HTMLButtonElement>();
  return <button ref={ref} className={`mag ${className}`} {...rest} />;
}

export function MagLink({ className = "", ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const ref = useMagnetic<HTMLAnchorElement>();
  return <a ref={ref} className={`mag ${className}`} {...rest} />;
}
