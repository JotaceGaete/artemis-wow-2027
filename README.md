# ARTEMIS 2027 — Demo de portada

Demostración visual de la portada de ARTEMIS 2027 (segunda selección, vintage, moderno y curioso), portada en Next.js (App Router) y TypeScript.

> Demo visual con datos y piezas ficticias. No hay compras, pagos, base de datos ni conexión a Walinka o a Artemis actual. Musa responde con respuestas simuladas.

## Requisitos

- Node.js 20 o superior
- npm

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

## Build de producción

```bash
npm run build
npm run start
```

## Estructura

```
src/
  app/
    layout.tsx        Fuentes (next/font), metadatos y viewport
    page.tsx          Punto de entrada
    globals.css       Estética, animaciones y responsive (idéntico al artefacto original)
  components/
    Home.tsx          Composición de la portada y estado compartido (cajón, chat)
    Hero.tsx          Hero, objetos con parallax, polvo interactivo y letras reactivas
    Campaigns.tsx     Carrusel de campañas con transición de iris
    Pieces.tsx        Piezas con scroll horizontal y tarjetas inclinables en 3D
    Footer.tsx        Cierre y formulario de demo
    Musa.tsx          Chat simulado de la curadora Musa
    Nav.tsx           Menú y barra de progreso
    Ticker.tsx        Cinta de palabras
    Cursor.tsx        Cursor personalizado (solo puntero fino)
    Magnetic.tsx      Botones con efecto magnético
    Chars.tsx         Revelado de texto letra por letra
  lib/
    objects.tsx       Objetos SVG (reloj, esfera, jarrón, compás, cámara, luna)
    data.ts           Datos ficticios: campañas, piezas, objetos del hero y respuestas de Musa
    hooks.ts          Puntero compartido y revelado por intersección
```

## Accesibilidad y movimiento

- Respeta `prefers-reduced-motion`: desactiva animaciones CSS y muestra el contenido sin transiciones.
- El cursor personalizado solo aparece con puntero fino; en táctil se usa el cursor del sistema.
- Las letras decorativas tienen `aria-hidden` y el título conserva su nombre accesible.

## Despliegue

Pensado para Vercel: importá el repositorio, dejá la configuración por defecto de Next.js y desplegá. No requiere variables de entorno.
