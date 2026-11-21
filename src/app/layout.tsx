import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { getCatalogSource } from "@/lib/walinka/source";
import "./globals.css";

// Sora (variable, 100–800) servida desde el propio proyecto: sin peticiones a Google en tiempo de ejecución.
const sora = localFont({
  src: "../fonts/sora-latin-wght-normal.woff2",
  weight: "100 800",
  display: "swap",
  variable: "--font-sora",
  fallback: ["system-ui", "Arial", "sans-serif"],
});

/** Modo demo: texto de demostración. Modo Walinka: solo el nombre de la tienda, sin afirmaciones no verificadas. */
export function generateMetadata(): Metadata {
  if (getCatalogSource() === "walinka") {
    return { title: "ARTEMIS", description: "Catálogo de Artemis." };
  }
  return {
    title: "ARTEMIS 2027 — Segunda selección",
    description: "Objetos de segunda selección, vintage, modernos y curiosos. Demostración visual con datos ficticios.",
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#3A1529",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={sora.variable}>
      <body>{children}</body>
    </html>
  );
}
