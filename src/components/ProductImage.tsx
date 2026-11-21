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
 * Fotografía remota de Unsplash.
 * - La ilustración SVG (children) queda siempre detrás como base: se ve mientras la foto carga
 *   y si la foto falla. Nunca queda un bloque vacío.
 * - Las URLs se piden directamente (unoptimized): son URLs de Unsplash con sus propios parámetros de tamaño,
 *   y no dependen del optimizador de Next en el servidor.
 * El contenedor padre debe tener position relative (o absolute) y tamaño definido.
 */
export function ProductImage({ src, alt, tone, sizes = "100vw", priority = false, children }: Props) {
  const [failed, setFailed] = useState(false);
  const showPhoto = !!src && !failed;

  return (
    <>
      {children && (
        <div className="ph" aria-hidden="true" style={{ "--tone": tone } as CSSProperties}>
          {children}
        </div>
      )}
      {showPhoto && (
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          sizes={sizes}
          priority={priority}
          style={{ objectFit: "cover" }}
          onError={() => setFailed(true)}
        />
      )}
    </>
  );
}
