"use client";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { MUSA_CHIPS, MUSA_GREETING, musaAnswer } from "@/lib/data";
import { MagButton } from "./Magnetic";

type Msg = { id: number; who: "bot" | "me"; text: string; typing?: boolean };

type MusaProps = {
  open: boolean;
  setOpen: (v: boolean) => void;
  /** Saludo, chips y respuestas propios (p. ej. una pieza). Por defecto, las generales de Artemis. */
  greeting?: string;
  chips?: string[];
  answer?: (q: string) => string;
};

/** Musa: chat con respuestas simuladas (sin IA ni conexión a Walinka). */
export default function Musa({
  open,
  setOpen,
  greeting = MUSA_GREETING,
  chips = MUSA_CHIPS,
  answer = musaAnswer,
}: MusaProps) {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState("");
  const idRef = useRef(0);
  const started = useRef(false);
  const listRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  const botSay = useCallback((t: string, delay: number) => {
    const id = ++idRef.current;
    setMsgs((m) => [...m, { id, who: "bot", text: "", typing: true }]);
    const h = window.setTimeout(() => {
      setMsgs((m) => m.map((x) => (x.id === id ? { ...x, text: t, typing: false } : x)));
    }, delay);
    timers.current.push(h);
  }, []);

  const ask = (q: string) => {
    setMsgs((m) => [...m, { id: ++idRef.current, who: "me", text: q }]);
    botSay(answer(q), 1100);
  };

  // Saludo la primera vez que se abre.
  useEffect(() => {
    if (open && !started.current) {
      started.current = true;
      botSay(greeting, 700);
    }
  }, [open, botSay, greeting]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((t) => clearTimeout(t));
  }, []);

  useEffect(() => {
    const l = listRef.current;
    if (l) l.scrollTop = l.scrollHeight;
  }, [msgs]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const v = text.trim();
    if (!v) return;
    setText("");
    ask(v);
  };

  return (
    <div className={`musa ${open ? "open" : ""}`} id="musa">
      <div className="musa-panel" role="dialog" aria-label="Chat con Musa">
        <header className="musa-h">
          <div className="av">M</div>
          <div>
            <b>Musa</b>
            <small>curadora de Artemis</small>
          </div>
          <button type="button" onClick={() => setOpen(false)} aria-label="Cerrar">✕</button>
        </header>
        <div className="msgs" ref={listRef}>
          {msgs.map((m) =>
            m.typing ? (
              <div key={m.id} className="msg bot typing">
                <span /><span /><span />
              </div>
            ) : (
              <div key={m.id} className={`msg ${m.who === "bot" ? "bot" : "me"}`}>
                {m.text}
              </div>
            ),
          )}
        </div>
        <div className="chips">
          {chips.map((q) => (
            <button key={q} type="button" onClick={() => ask(q)}>{q}</button>
          ))}
        </div>
        <form className="musa-f" onSubmit={onSubmit}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escribí algo…"
            autoComplete="off"
            aria-label="Mensaje para Musa"
          />
          <button type="submit">Enviar</button>
        </form>
      </div>
      <MagButton className="musa-btn" type="button" aria-label="Abrir chat con Musa" onClick={() => setOpen(!open)}>
        M
      </MagButton>
    </div>
  );
}
