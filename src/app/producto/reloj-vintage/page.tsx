import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPage from "@/components/product/ProductPage";
import { PRODUCTS } from "@/lib/data";
import { getProductDetail } from "@/lib/product-detail";
import "../producto.css";

export const metadata: Metadata = {
  title: "Reloj de bolsillo — ARTEMIS 2027",
  description: "Reloj de bolsillo de segunda selección. Demostración visual con datos ficticios.",
};

export default async function Page() {
  const detail = await getProductDetail("reloj-vintage");
  if (!detail) notFound();
  const related = PRODUCTS.filter((p) => p.id !== detail.id).slice(0, 3);
  return <ProductPage detail={detail} related={related} />;
}
