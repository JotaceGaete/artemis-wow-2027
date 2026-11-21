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

/** Composición de la portada V2. Mantiene el estado compartido (cajón y chat de Musa). */
export default function Home() {
  const [cajon, setCajon] = useState<string[]>([]);
  const [musaOpen, setMusaOpen] = useState(false);

  return (
    <>
      <Cursor />
      <Progress />
      <Nav count={cajon.length} />
      <Hero />
      <Ticker />
      <Collections />
      <Products added={cajon} onAdd={(id) => setCajon((c) => (c.includes(id) ? c : [...c, id]))} />
      <Editorial />
      <Footer />
      <Musa open={musaOpen} setOpen={setMusaOpen} />
    </>
  );
}
