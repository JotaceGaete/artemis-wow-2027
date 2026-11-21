import { cacheLife } from "next/cache";
import { PRODUCT_COLUMNS, mapWalinkaCatalog, type WalinkaBusinessCategoryRow, type WalinkaProductRow } from "./mapping";
import type { WalinkaCatalog } from "./types";

const REQUEST_TIMEOUT_MS = 8000;

type Settings = { url: string; anonKey: string; businessSlug: string };

/** Lee la configuración solo en el servidor. Nunca se devuelven valores en mensajes de error. */
function readSettings(): Settings {
  const url = process.env.WALINKA_SUPABASE_URL?.trim();
  const anonKey = process.env.WALINKA_SUPABASE_ANON_KEY?.trim();
  const businessSlug = process.env.WALINKA_BUSINESS_SLUG?.trim();
  const missing = [
    !url && "WALINKA_SUPABASE_URL",
    !anonKey && "WALINKA_SUPABASE_ANON_KEY",
    !businessSlug && "WALINKA_BUSINESS_SLUG",
  ].filter(Boolean);
  if (!url || !anonKey || !businessSlug) {
    throw new Error(`Modo Walinka: faltan variables de entorno: ${missing.join(", ")}`);
  }
  return { url: url.replace(/\/+$/, ""), anonKey, businessSlug };
}

async function fetchRows<T>(settings: Settings, resource: string): Promise<T> {
  const response = await fetch(`${settings.url}/rest/v1/${resource}`, {
    headers: {
      apikey: settings.anonKey,
      Authorization: `Bearer ${settings.anonKey}`,
      Accept: "application/json",
    },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
  if (!response.ok) {
    throw new Error(`Walinka respondió ${response.status} al consultar ${resource.split("?")[0]}`);
  }
  return (await response.json()) as T;
}

/**
 * Catálogo público de un comercio de Walinka. Usa solo la clave pública (anon) bajo RLS.
 * Caché de Next 16 (cacheComponents): 5 minutos de revalidación. Un error no se guarda en caché.
 */
export async function loadWalinkaCatalog(): Promise<WalinkaCatalog> {
  "use cache";
  cacheLife({ stale: 60, revalidate: 300, expire: 3600 });

  const settings = readSettings();
  const slug = encodeURIComponent(settings.businessSlug);

  const businesses = await fetchRows<Array<{ id: string; currency: string | null }>>(
    settings,
    `wa_businesses?select=id,currency&slug=eq.${slug}&is_active=eq.true&limit=1`,
  );
  const business = businesses[0];
  if (!business) throw new Error("Walinka: no existe un comercio activo con el slug configurado.");
  if (business.currency && business.currency.toUpperCase() !== "CLP") {
    throw new Error(`Walinka: el comercio opera en ${business.currency}; Artemis solo muestra precios en CLP.`);
  }

  const [rows, categories] = await Promise.all([
    fetchRows<WalinkaProductRow[]>(
      settings,
      `wa_products?select=${PRODUCT_COLUMNS}&business_id=eq.${business.id}&is_active=eq.true&is_draft=eq.false&order=sort_order.asc`,
    ),
    fetchRows<WalinkaBusinessCategoryRow[]>(
      settings,
      `wa_business_categories?select=name,sort_order&business_id=eq.${business.id}&order=sort_order.asc`,
    ),
  ]);

  return mapWalinkaCatalog(rows, categories);
}
