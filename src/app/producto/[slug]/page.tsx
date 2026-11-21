import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CatalogUnavailable from "@/components/CatalogUnavailable";
import ProductPage from "@/components/product/ProductPage";
import { PRODUCTS } from "@/lib/data";
import { demoProductView, demoRelatedCards } from "@/lib/demo-view";
import { DEMO_SLUGS, getProductDetail } from "@/lib/product-detail";
import { getCatalogSource, loadCatalogState } from "@/lib/walinka/source";
import { productCard, productView } from "@/lib/walinka/view";
import "../producto.css";

type Params = { params: Promise<{ slug: string }> };

/**
 * Solo en demo: con Cache Components, generateStaticParams debe devolver al menos un resultado.
 * En modo Walinka la exportación no existe y cada ficha se resuelve desde el catálogo al solicitarla.
 */
export const generateStaticParams = getCatalogSource() === "demo"
  ? async () => DEMO_SLUGS.map((slug) => ({ slug }))
  : undefined;

export const metadata: Metadata = {
  title: "Pieza — ARTEMIS",
};

/** El acceso a `params` va dentro de Suspense: así la ruta se puede prerenderizar con Cache Components. */
export default function Page({ params }: Params) {
  return (
    <Suspense fallback={null}>
      <ProductRoute params={params} />
    </Suspense>
  );
}

async function ProductRoute({ params }: Params) {
  const { slug } = await params;
  const state = await loadCatalogState();
  if (state.status === "error") return <CatalogUnavailable message={state.message} />;

  if (state.status === "demo") {
    const detail = await getProductDetail(slug);
    if (!detail) notFound();
    const related = demoRelatedCards(PRODUCTS.filter((p) => p.id !== detail.id).slice(0, 3));
    return <ProductPage view={demoProductView(detail)} related={related} demo={detail} />;
  }

  const product = state.catalog.products.find((p) => p.slug === slug);
  if (!product) notFound();
  const related = state.catalog.products
    .filter((p) => p.id !== product.id)
    .slice(0, 3)
    .map(productCard);
  return <ProductPage view={productView(product)} related={related} />;
}
