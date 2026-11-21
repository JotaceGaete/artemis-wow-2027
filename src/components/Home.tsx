"use client";
import { useState } from "react";
import Collections from "./Collections";
import Cursor from "./Cursor";
import Editorial from "./Editorial";
import Footer from "./Footer";
import Hero from "./Hero";
import Musa from "./Musa";
import { Nav, Progress } from "./Nav";
import Products from "./Products";
import Ticker from "./Ticker";
import { musaAnswer } from "@/lib/data";
import { DEMO_CHIPS, DEMO_GREETING, demoHomeListing } from "@/lib/demo-view";
import type { CatalogView } from "@/lib/view-types";
import { CATALOG_CHIPS, CATALOG_GREETING, storeAnswer } from "@/lib/walinka/view";

/**
 * Portada V2. Con `catalog` (modo Walinka) muestra solo datos reales y oculta las secciones
 * de demostración. Sin `catalog`, muestra la demostración.
 */
export default function Home({ catalog }: { catalog: CatalogView | null }) {
  const [cajon, setCajon] = useState<string[]>([]);
  const [musaOpen, setMusaOpen] = useState(false);
  const live = catalog !== null;
  const listing = catalog ?? demoHomeListing();
  const facts = catalog?.facts;

  return (
    <>
      <Cursor />
      <Progress />
      <Nav count={cajon.length} live={live} />
      <Hero slides={listing.slides} />
      {!live && <Ticker />}
      {!live && <Collections />}
      <Products
        cards={listing.cards}
        filters={listing.filters}
        added={cajon}
        title={live ? "Piezas del catálogo" : undefined}
        onAdd={(id) => setCajon((c) => (c.includes(id) ? c : [...c, id]))}
      />
      {!live && <Editorial />}
      <Footer live={live} />
      <Musa
        open={musaOpen}
        setOpen={setMusaOpen}
        greeting={live ? CATALOG_GREETING : DEMO_GREETING}
        chips={live ? CATALOG_CHIPS : DEMO_CHIPS}
        answer={facts ? (q) => storeAnswer(q, facts) : musaAnswer}
      />
    </>
  );
}
