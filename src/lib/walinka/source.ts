import { connection } from "next/server";
import { loadWalinkaCatalog } from "./loader";
import type { WalinkaCatalog } from "./types";

export type CatalogSource = "demo" | "walinka";

/**
 * Único punto que decide el origen de datos.
 * ARTEMIS_DATA_SOURCE=walinka → catálogo real. Sin variable o 'demo' → datos de demostración.
 * Cualquier otro valor lanza error: nunca hay recaída silenciosa.
 */
export function getCatalogSource(): CatalogSource {
  const value = process.env.ARTEMIS_DATA_SOURCE?.trim() || "demo";
  if (value === "demo" || value === "walinka") return value;
  throw new Error(`ARTEMIS_DATA_SOURCE no válido: "${value}". Valores permitidos: demo, walinka.`);
}

export type CatalogState =
  | { status: "demo" }
  | { status: "ready"; catalog: WalinkaCatalog }
  | { status: "error"; message: string };

/**
 * Estado del catálogo para una página. En modo Walinka, un fallo de conexión devuelve "error":
 * la página muestra un aviso controlado y NO recurre a datos de demostración.
 */
export async function loadCatalogState(): Promise<CatalogState> {
  if (getCatalogSource() === "demo") return { status: "demo" };
  // Modo Walinka: se resuelve en cada solicitud. Así un fallo de conexión no rompe el build;
  // el resultado exitoso sigue en caché (loadWalinkaCatalog).
  await connection();
  try {
    return { status: "ready", catalog: await loadWalinkaCatalog() };
  } catch (error) {
    console.error("[walinka] catálogo no disponible:", error instanceof Error ? error.message : "error desconocido");
    return {
      status: "error",
      message: "No pudimos cargar las piezas en este momento. Intentá de nuevo en unos minutos.",
    };
  }
}
