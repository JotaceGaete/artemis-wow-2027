"use client";
import Image from "next/image";
import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";

type Props = {
  /** URL remota verificada (Unsplash). Si falta o no carga, se muestra la ilustración. */
  src?: string;
  alt: string;
  tone: string;
  sizes?: string;
  priority?: boolean;
  children?: ReactNode;
};

/**
 * Fotografía remota optimizada con next/image.
 * Sin src, o si la imagen falla al cargar, muestra la ilustración SVG (children) sobre el tono de la pieza.
 * No muestra marcadores de texto. El contenedor padre debe tener position relative y tamaño definido.
 */
export function ProductImage({ src, alt, tone, sizes = "100vw", priority = false, children }: Props) {
  const [failed, setFailed] = useState(false);

  if (src && !failed) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        style={{ objectFit: "cover" }}
        onError={() => setFailed(true)}
      />
    );
  }
  return (
    <div className="ph" role="img" aria-label={alt} style={{ "--tone": tone } as CSSProperties}>
      {children}
    </div>
  );
}
