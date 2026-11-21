import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { PHOTOS_READY } from "@/lib/photos";

type Props = {
  src: string;
  alt: string;
  tone: string;
  sizes?: string;
  priority?: boolean;
  label?: string;
  children?: ReactNode;
};

/**
 * Fotografía del producto optimizada con next/image.
 * Mientras PHOTOS_READY sea false muestra un marcador "Foto pendiente" con la ilustración como guía temporal.
 * El contenedor padre debe tener position relative (o absolute) y tamaño definido.
 */
export function ProductImage({ src, alt, tone, sizes = "100vw", priority = false, label, children }: Props) {
  if (PHOTOS_READY) {
    return <Image src={src} alt={alt} fill sizes={sizes} priority={priority} style={{ objectFit: "cover" }} />;
  }
  return (
    <div className="ph" role="img" aria-label={`${alt} (foto pendiente)`} style={{ "--tone": tone } as CSSProperties}>
      {children}
      <span className="ph-label">{label ?? "Foto pendiente"}</span>
    </div>
  );
}
