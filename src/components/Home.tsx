"use client";
import { useState } from "react";
import Campaigns from "./Campaigns";
import Cursor from "./Cursor";
import Footer from "./Footer";
import Hero from "./Hero";
import Musa from "./Musa";
import { Nav, Progress } from "./Nav";
import Pieces from "./Pieces";
import Ticker from "./Ticker";

/** Composición de la portada. Mantiene el estado compartido (cajón y chat de Musa). */
export default function Home() {
  const [cajon, setCajon] = useState<string[]>([]);
  const [musaOpen, setMusaOpen] = useState(false);

  return (
    <>
      <Cursor />
      <Progress />
      <Nav count={cajon.length} />
      <Hero onMusa={() => setMusaOpen(true)} />
      <Ticker />
      <Campaigns />
      <Pieces added={cajon} onAdd={(n) => setCajon((c) => (c.includes(n) ? c : [...c, n]))} />
      <Footer />
      <Musa open={musaOpen} setOpen={setMusaOpen} />
    </>
  );
}
