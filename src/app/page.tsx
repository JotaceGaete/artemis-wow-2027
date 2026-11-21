import { Suspense } from "react";
import CatalogUnavailable from "@/components/CatalogUnavailable";
import Home from "@/components/Home";
import { CAMPAIGNS } from "@/lib/data";
import type { CatalogView } from "@/lib/view-types";
import { loadCatalogState } from "@/lib/walinka/source";
import { heroSlides, productCard, storeFacts } from "@/lib/walinka/view";

const SLIDE_COLORS = CAMPAIGNS.map((c) => c.c);

/** Suspense: la lectura del catálogo en modo Walinka ocurre en la solicitud, no en el build. */
export default function Page() {
  return (
    <Suspense fallback={null}>
      <HomeRoute />
    </Suspense>
  );
}

async function HomeRoute() {
  const state = await loadCatalogState();
  if (state.status === "error") return <CatalogUnavailable message={state.message} />;
  if (state.status === "demo") return <Home catalog={null} />;

  const { catalog } = state;
  const view: CatalogView = {
    slides: heroSlides(catalog.categories, catalog.products, SLIDE_COLORS),
    cards: catalog.products.map(productCard),
    filters: catalog.categories.map((c) => c.name),
    facts: storeFacts(catalog),
  };
  return <Home catalog={view} />;
}
