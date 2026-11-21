import type { CSSProperties } from "react";

/** Divide un texto en letras animables (cada una con su --i para el retardo en cascada). */
export function Chars({ text }: { text: string }) {
  return (
    <>
      {[...text].map((ch, i) => (
        <span key={i} className="c" aria-hidden="true">
          <span style={{ "--i": i } as CSSProperties}>{ch === " " ? " " : ch}</span>
        </span>
      ))}
    </>
  );
}
