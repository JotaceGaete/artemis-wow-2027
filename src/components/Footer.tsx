"use client";
import { useState, type FormEvent } from "react";
import { useReveal } from "@/lib/hooks";
import { MagButton } from "./Magnetic";

export default function Footer() {
  const [msg, setMsg] = useState("");
  const kicker = useReveal<HTMLParagraphElement>();
  const news = useReveal<HTMLFormElement>();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMsg("Anotado. Te escribimos cuando abra. (Demo: no se envió ningún mail.)");
    e.currentTarget.reset();
  };

  return (
    <footer className="foot">
      <p ref={kicker.ref} className={`kicker rv ${kicker.cls}`}>Abre en 2027</p>
      <div className="big-foot" aria-label="ARTEMIS">
        {[..."ARTEMIS"].map((ch, i) => (
          <span key={i} aria-hidden="true">{ch}</span>
        ))}
      </div>
      <form ref={news.ref} className={`news rv ${news.cls}`} onSubmit={onSubmit}>
        <input type="email" placeholder="Tu mail para avisarte" required aria-label="Tu mail" />
        <MagButton type="submit" className="btn solid">Avisame</MagButton>
      </form>
      <p className="news-msg">{msg}</p>
      <small>© 2027 Artemis · Demo visual con datos y piezas ficticias. No hay compras reales.</small>
    </footer>
  );
}
