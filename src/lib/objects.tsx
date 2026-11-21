import { useId, type ComponentType } from "react";

export type ObjectKey = "watch" | "orb" | "vase" | "compass" | "camera" | "crescent";
type ObjProps = { className?: string };

/** Id estable entre servidor y cliente para los <linearGradient>/<radialGradient>. */
function useSafeId(prefix: string) {
  return prefix + useId().replace(/:/g, "");
}

export function Watch({ className }: ObjProps) {
  const id = useSafeId("w");
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className={className}>
      <defs>
        <radialGradient id={id} cx="35%" cy="30%">
          <stop offset="0" stopColor="#F3D9A8" />
          <stop offset=".5" stopColor="#A97838" />
          <stop offset="1" stopColor="#3B2612" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="94" fill={`url(#${id})`} />
      <circle cx="100" cy="100" r="84" fill="none" stroke="#3B2612" strokeWidth={2} opacity={0.5} />
      <circle cx="100" cy="100" r="78" fill="#EDE6D8" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * 30 * Math.PI) / 180;
        const r1 = i % 3 ? 64 : 56;
        const r2 = 72;
        return (
          <line
            key={i}
            x1={(100 + r1 * Math.sin(a)).toFixed(1)}
            y1={(100 - r1 * Math.cos(a)).toFixed(1)}
            x2={(100 + r2 * Math.sin(a)).toFixed(1)}
            y2={(100 - r2 * Math.cos(a)).toFixed(1)}
            stroke="#2A241C"
            strokeWidth={i % 3 ? 1.5 : 3}
          />
        );
      })}
      <line className="hand-h" x1="100" y1="100" x2="100" y2="58" stroke="#2A241C" strokeWidth={4} strokeLinecap="round" />
      <line className="hand-m" x1="100" y1="100" x2="146" y2="100" stroke="#2A241C" strokeWidth={3} strokeLinecap="round" />
      <line className="hand-s" x1="100" y1="118" x2="100" y2="40" stroke="#A4532F" strokeWidth={1.5} />
      <circle cx="100" cy="100" r="5" fill="#2A241C" />
    </svg>
  );
}

export function Orb({ className }: ObjProps) {
  const id = useSafeId("o");
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className={className}>
      <defs>
        <radialGradient id={id} cx="40%" cy="35%" r="70%">
          <stop offset="0" stopColor="#EAF4EF" />
          <stop offset=".35" stopColor="#8FB5AA" />
          <stop offset=".8" stopColor="#1F3A40" />
          <stop offset="1" stopColor="#0E1C20" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="92" fill={`url(#${id})`} />
      <ellipse cx="72" cy="66" rx="26" ry="14" fill="#fff" opacity={0.55} transform="rotate(-30 72 66)" />
      <path d="M40 130 Q100 172 160 130" fill="none" stroke="#fff" strokeOpacity={0.2} strokeWidth={3} />
    </svg>
  );
}

export function Vase({ className }: ObjProps) {
  const id = useSafeId("v");
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={id} x1="0" x2="1">
          <stop offset="0" stopColor="#E0A48B" />
          <stop offset=".5" stopColor="#9A5340" />
          <stop offset="1" stopColor="#4A2519" />
        </linearGradient>
      </defs>
      <path
        d="M92 16h16v22c20 6 22 26 16 44 22 18 36 44 34 80-2 26-14 34-34 34H76c-20 0-32-8-34-34-2-36 12-62 34-80-6-18-4-38 16-44z"
        fill={`url(#${id})`}
      />
      <path d="M52 118h96M48 140h104" stroke="#2A150D" strokeWidth={3} opacity={0.5} />
      <path d="M68 150q32 14 64 0" stroke="#F5DCC8" strokeWidth={2} fill="none" opacity={0.35} />
    </svg>
  );
}

export function Compass({ className }: ObjProps) {
  const id = useSafeId("c");
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className={className}>
      <defs>
        <radialGradient id={id} cx="40%" cy="35%">
          <stop offset="0" stopColor="#4A3A2A" />
          <stop offset="1" stopColor="#14100B" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="94" fill={`url(#${id})`} />
      <circle cx="100" cy="100" r="70" fill="none" stroke="#B98A4E" strokeWidth={2} />
      <circle cx="100" cy="100" r="58" fill="none" stroke="#B98A4E" strokeWidth={1} opacity={0.5} strokeDasharray="2 4" />
      <polygon points="100,28 112,88 175,100 112,112 100,172 88,112 25,100 88,88" fill="#D9A866" />
      <polygon points="100,100 106,94 100,30 94,94" fill="#F3D9A8" opacity={0.8} />
      <circle cx="100" cy="100" r="6" fill="#14100B" />
    </svg>
  );
}

export function Camera({ className }: ObjProps) {
  const id = useSafeId("k");
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className={className}>
      <defs>
        <radialGradient id={id} cx="40%" cy="35%">
          <stop offset="0" stopColor="#9ED0D8" />
          <stop offset=".4" stopColor="#2F5A63" />
          <stop offset="1" stopColor="#0B171B" />
        </radialGradient>
      </defs>
      <rect x="26" y="62" width="148" height="96" rx="14" fill="#2F4B57" />
      <rect x="26" y="62" width="148" height="20" rx="8" fill="#22373F" />
      <rect x="70" y="40" width="60" height="26" rx="6" fill="#1E3138" />
      <circle cx="100" cy="110" r="36" fill="#0E1A1E" />
      <circle cx="100" cy="110" r="26" fill={`url(#${id})`} />
      <circle cx="92" cy="102" r="6" fill="#fff" opacity={0.7} />
      <circle cx="152" cy="82" r="5" fill="#E8C48F" />
    </svg>
  );
}

export function Crescent({ className }: ObjProps) {
  const id = useSafeId("m");
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F3D9A8" />
          <stop offset=".55" stopColor="#B98A4E" />
          <stop offset="1" stopColor="#4A2F14" />
        </linearGradient>
      </defs>
      <path d="M118 22 A82 82 0 1 0 182 132 A66 66 0 1 1 118 22 Z" fill={`url(#${id})`} />
      <circle cx="132" cy="120" r="5" fill="#4A2F14" opacity={0.5} />
      <circle cx="150" cy="150" r="3" fill="#4A2F14" opacity={0.4} />
    </svg>
  );
}

export const OBJECTS: Record<ObjectKey, ComponentType<ObjProps>> = {
  watch: Watch,
  orb: Orb,
  vase: Vase,
  compass: Compass,
  camera: Camera,
  crescent: Crescent,
};
