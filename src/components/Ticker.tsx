import { Fragment } from "react";
import { WORDS } from "@/lib/data";

/** Cinta de palabras en desplazamiento continuo. */
export default function Ticker() {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="track">
        {[...WORDS, ...WORDS].map((w, i) => (
          <Fragment key={i}>
            <span>{w}</span>
            <i>✦</i>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
