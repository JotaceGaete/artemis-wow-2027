"use client";
import { useEffect, useRef, useState } from "react";

/** Posición del puntero compartida por el polvo interactivo. */
export const pointer = { x: -9999, y: -9999 };

/** Revela un elemento al entrar en pantalla (equivale a la clase .rv / .rv.in). */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, cls: seen ? "in" : "" };
}
