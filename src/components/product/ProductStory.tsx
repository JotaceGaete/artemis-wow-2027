"use client";
import { useReveal } from "@/lib/hooks";
import type { StoryChapter } from "@/lib/product-detail";

/** Capítulo individual: se revela con una línea de tinta al entrar en pantalla. */
function Chapter({ c }: { c: StoryChapter }) {
  const { ref, cls } = useReveal<HTMLElement>();
  return (
    <article ref={ref} className={`pd-ch rv ${cls}`}>
      <p className="pd-ch-n">{c.n}</p>
      <h3 className="pd-ch-t">{c.t}</h3>
      <p className="pd-ch-p">{c.p}</p>
    </article>
  );
}

/** Narrativa de la pieza: título fijo a la izquierda y capítulos que se revelan al bajar. */
export default function ProductStory({ chapters }: { chapters: StoryChapter[] }) {
  return (
    <section className="pd-story" aria-labelledby="pd-story-h">
      <div className="pd-story-head">
        <p className="kicker">Relato</p>
        <h2 id="pd-story-h" className="pd-h2">La historia de esta pieza</h2>
        <p className="micro">Relato ficticio para la demostración.</p>
      </div>
      <div className="pd-story-body">
        {chapters.map((c) => (
          <Chapter key={c.n} c={c} />
        ))}
      </div>
    </section>
  );
}
