/**
 * Primitivas botánicas en SVG, dibujadas a mano en código.
 * Cada una devuelve un <g> que se compone dentro de una escena.
 */
import { useId, type ReactNode } from 'react'
import { C, r2, seeded } from './palette'

/** Identificador seguro para gradientes dentro del SVG. */
export function useSvgId(prefix: string) {
  return prefix + useId().replace(/[^a-zA-Z0-9_-]/g, '')
}

const deg = (a: number) => (a * Math.PI) / 180

/* ─────────────── Romero ─────────────── */

interface RosemaryProps {
  x: number
  y: number
  length: number
  angle?: number
  bend?: number
  leaves?: number
  leafLength?: number
  seed?: number
  flowers?: number
  opacity?: number
}

export function Rosemary({
  x,
  y,
  length,
  angle = 0,
  bend = -12,
  leaves = 26,
  leafLength = 22,
  seed = 1,
  flowers = 0,
  opacity = 1,
}: RosemaryProps) {
  const rnd = seeded(seed)
  const p1 = { x: length / 2, y: bend }
  const p2 = { x: length, y: 0 }
  const at = (t: number) => ({
    x: 2 * (1 - t) * t * p1.x + t * t * p2.x,
    y: 2 * (1 - t) * t * p1.y + t * t * p2.y,
  })
  const tangent = (t: number) => {
    const dx = 2 * (1 - t) * p1.x + 2 * t * (p2.x - p1.x)
    const dy = 2 * (1 - t) * p1.y + 2 * t * (p2.y - p1.y)
    return (Math.atan2(dy, dx) * 180) / Math.PI
  }

  const leafEls: ReactNode[] = []
  const flowerEls: ReactNode[] = []
  for (let i = 0; i < leaves; i++) {
    const t = 0.05 + (0.93 * i) / (leaves - 1)
    const side = i % 2 === 0 ? 1 : -1
    const pt = at(t)
    const a = tangent(t) + side * (34 + rnd() * 18) * (1 - t * 0.35)
    const L = leafLength * (1 - 0.5 * t) * (0.82 + rnd() * 0.32)
    const w = L * 0.15
    const tone = rnd() > 0.5 ? C.sage : '#8E9A83'
    leafEls.push(
      <g key={i} transform={`translate(${r2(pt.x)} ${r2(pt.y)}) rotate(${r2(a)})`}>
        <path
          d={`M0 0 Q${r2(L * 0.45)} ${r2(-w * 1.25)} ${r2(L)} 0 Q${r2(L * 0.55)} ${r2(w * 0.7)} 0 0Z`}
          fill={tone}
          stroke={C.forest}
          strokeWidth={0.45}
          strokeOpacity={0.75}
        />
        <path d={`M${r2(L * 0.12)} 0 L${r2(L * 0.8)} ${r2(-w * 0.15)}`} stroke={C.sageLight} strokeWidth={0.4} />
      </g>,
    )
  }
  for (let f = 0; f < flowers; f++) {
    const t = 0.25 + rnd() * 0.5
    const pt = at(t)
    const side = rnd() > 0.5 ? 1 : -1
    const fx = pt.x + side * 3
    const fy = pt.y - 5 - rnd() * 3
    flowerEls.push(
      <g key={`f${f}`} transform={`translate(${r2(fx)} ${r2(fy)})`} opacity={0.85}>
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cx={0} cy={-2.2} rx={1.3} ry={2.2} fill={C.amethystLight} transform={`rotate(${a})`} />
        ))}
        <circle r={0.9} fill={C.amethyst} />
      </g>,
    )
  }

  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`} opacity={opacity}>
      <path
        d={`M0 0 Q${p1.x} ${p1.y} ${p2.x} ${p2.y}`}
        fill="none"
        stroke={C.forest}
        strokeWidth={1.3}
        strokeLinecap="round"
      />
      {leafEls}
      {flowerEls}
    </g>
  )
}

/* ─────────────── Manzanilla ─────────────── */

interface ChamomileProps {
  x: number
  y: number
  size?: number
  tilt?: number
  rotate?: number
  petals?: number
  seed?: number
}

export function Chamomile({ x, y, size = 20, tilt = 0.82, rotate = 0, petals = 18, seed = 3 }: ChamomileProps) {
  const rnd = seeded(seed)
  const id = useSvgId('cham')
  const r0 = size * 0.3
  const petalEls: ReactNode[] = []
  for (let k = 0; k < petals; k++) {
    const a = (k * 360) / petals + (rnd() - 0.5) * 8
    const L = size * (0.78 + rnd() * 0.22)
    const w = size * 0.17
    petalEls.push(
      <path
        key={k}
        transform={`rotate(${r2(a)})`}
        d={`M${r2(r0)} ${r2(-w * 0.45)} Q${r2(r0 + L * 0.5)} ${r2(-w * 1.05)} ${r2(r0 + L)} ${r2(-w * 0.25)} Q${r2(r0 + L + w * 0.35)} 0 ${r2(r0 + L)} ${r2(w * 0.25)} Q${r2(r0 + L * 0.5)} ${r2(w * 1.05)} ${r2(r0)} ${r2(w * 0.45)}Z`}
        fill={C.orchid}
        stroke="#C9C3AE"
        strokeWidth={0.5}
      />,
    )
  }
  const dots: ReactNode[] = []
  for (let d = 0; d < 22; d++) {
    const rr = Math.sqrt(rnd()) * size * 0.3
    const aa = rnd() * Math.PI * 2
    dots.push(
      <circle key={d} cx={r2(Math.cos(aa) * rr)} cy={r2(Math.sin(aa) * rr)} r={size * 0.03} fill="#B5893A" opacity={0.55} />,
    )
  }
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(1 ${tilt})`}>
      <defs>
        <radialGradient id={id} cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#F3DC8F" />
          <stop offset="1" stopColor="#CFA046" />
        </radialGradient>
      </defs>
      {petalEls}
      <circle r={size * 0.36} fill={`url(#${id})`} />
      {dots}
    </g>
  )
}

/** Hoja plumosa de manzanilla. */
export function ChamomileLeaf({ x, y, length = 40, angle = 0, seed = 5 }: { x: number; y: number; length?: number; angle?: number; seed?: number }) {
  const rnd = seeded(seed)
  const parts: ReactNode[] = []
  const n = 7
  for (let i = 1; i <= n; i++) {
    const t = i / (n + 1)
    const px = t * length
    const side = i % 2 === 0 ? 1 : -1
    const l = length * 0.28 * (1 - t * 0.5)
    const a = deg(side * (40 + rnd() * 15))
    const ex = px + Math.cos(a) * l
    const ey = Math.sin(a) * l * -1
    parts.push(
      <path
        key={i}
        d={`M${r2(px)} 0 Q${r2(px + l * 0.4)} ${r2(ey * 0.2)} ${r2(ex)} ${r2(ey)} M${r2(px + (ex - px) * 0.5)} ${r2(ey * 0.5)} l${r2(l * 0.25)} ${r2(-side * l * 0.15)}`}
        fill="none"
        stroke={C.sage}
        strokeWidth={0.9}
        strokeLinecap="round"
      />,
    )
  }
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`}>
      <path d={`M0 0 L${length} 0`} stroke={C.sage} strokeWidth={1} strokeLinecap="round" />
      {parts}
    </g>
  )
}

/* ─────────────── Orquídea blanca (Phalaenopsis) ─────────────── */

const petalPath = (L: number, w: number) =>
  `M0 0 C${r2(w * 0.9)} ${r2(-L * 0.1)} ${r2(w * 1.15)} ${r2(-L * 0.78)} 0 ${r2(-L)} C${r2(-w * 1.15)} ${r2(-L * 0.78)} ${r2(-w * 0.9)} ${r2(-L * 0.1)} 0 0Z`

interface OrchidProps {
  x: number
  y: number
  size?: number
  rotate?: number
}

export function Orchid({ x, y, size = 1, rotate = 0 }: OrchidProps) {
  const id = useSvgId('orq')
  const stroke = '#CBC6B2'
  const vein = (L: number, a: number) => (
    <g transform={`rotate(${a})`} stroke={C.petalShade} strokeWidth={0.7} fill="none">
      <path d={`M0 -4 Q2 ${-L * 0.5} 0 ${-L * 0.85}`} />
      <path d={`M0 -4 Q${L * 0.22} ${-L * 0.45} ${L * 0.16} ${-L * 0.78}`} />
      <path d={`M0 -4 Q${-L * 0.22} ${-L * 0.45} ${-L * 0.16} ${-L * 0.78}`} />
    </g>
  )
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${size})`}>
      <defs>
        <radialGradient id={id} gradientUnits="userSpaceOnUse" cx="0" cy="0" r="52">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.55" stopColor={C.orchid} />
          <stop offset="1" stopColor="#ECE6D6" />
        </radialGradient>
      </defs>
      {/* Sépalos */}
      <g fill={`url(#${id})`} stroke={stroke} strokeWidth={0.7}>
        <path d={petalPath(42, 13)} />
        <path d={petalPath(40, 12)} transform="rotate(148)" />
        <path d={petalPath(40, 12)} transform="rotate(-148)" />
      </g>
      {vein(42, 0)}
      {/* Pétalos anchos */}
      <g fill={`url(#${id})`} stroke={stroke} strokeWidth={0.7}>
        <path d={petalPath(44, 25)} transform="rotate(76)" />
        <path d={petalPath(44, 25)} transform="rotate(-76)" />
      </g>
      {vein(40, 76)}
      {vein(40, -76)}
      {/* Labelo */}
      <g stroke="#CDB58D" strokeWidth={0.5}>
        <path d={petalPath(11, 6)} transform="rotate(150)" fill="#F3E8D3" />
        <path d={petalPath(11, 6)} transform="rotate(-150)" fill="#F3E8D3" />
        <path d={petalPath(16, 6.5)} transform="rotate(180)" fill="#EBD6B2" />
      </g>
      <path d="M-1.5 15 q-4 3 -2.5 7 M1.5 15 q4 3 2.5 7" fill="none" stroke="#CDB58D" strokeWidth={0.6} strokeLinecap="round" />
      <ellipse cx={0} cy={4.5} rx={2.6} ry={2} fill="#EED58E" />
      {/* Columna */}
      <ellipse cx={0} cy={-3} rx={3.6} ry={6} fill="#FFFFFF" stroke={stroke} strokeWidth={0.6} />
    </g>
  )
}

export function OrchidBud({ x, y, size = 1, rotate = 0 }: OrchidProps) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${size})`}>
      <ellipse cx={0} cy={-7} rx={5.5} ry={8} fill="#F4F1E6" stroke="#C9C3AE" strokeWidth={0.6} />
      <path d="M0 -14 Q1.5 -7 0 0" stroke="#D9D3C0" strokeWidth={0.6} fill="none" />
    </g>
  )
}

/** Hoja ancha de orquídea. */
export function OrchidLeaf({ x, y, length = 90, width = 26, angle = 0 }: { x: number; y: number; length?: number; width?: number; angle?: number }) {
  const id = useSvgId('hoja')
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3F5442" />
          <stop offset="1" stopColor="#7E9076" />
        </linearGradient>
      </defs>
      <path
        d={`M0 0 C${length * 0.25} ${-width} ${length * 0.8} ${-width * 0.95} ${length} ${-width * 0.1} C${length * 0.8} ${width * 0.45} ${length * 0.25} ${width * 0.55} 0 0Z`}
        fill={`url(#${id})`}
        stroke={C.forest}
        strokeWidth={0.6}
      />
      <path d={`M4 -1 Q${length * 0.5} ${-width * 0.28} ${length * 0.94} ${-width * 0.12}`} stroke="#9AAA8D" strokeWidth={0.7} fill="none" />
    </g>
  )
}

/* ─────────────── Amatista ─────────────── */

interface CrystalProps {
  x: number
  y: number
  h: number
  w: number
  angle?: number
}

export function Crystal({ x, y, h, w, angle = 0 }: CrystalProps) {
  const tip = w * 0.85
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`}>
      <polygon points={`${-w / 2},0 ${-w / 2},${-h} 0,${-h - tip} ${w / 2},${-h} ${w / 2},0`} fill={C.amethyst} />
      <polygon points={`${-w / 2},0 ${-w / 2},${-h} ${-w * 0.12},${-h} ${-w * 0.12},0`} fill={C.amethystDeep} opacity={0.55} />
      <polygon points={`${w * 0.18},0 ${w * 0.18},${-h} ${w / 2},${-h} ${w / 2},0`} fill={C.amethystLight} opacity={0.55} />
      <polygon points={`${-w / 2},${-h} 0,${-h - tip} ${-w * 0.12},${-h}`} fill={C.amethystDeep} opacity={0.5} />
      <polygon points={`${w * 0.18},${-h} 0,${-h - tip} ${w / 2},${-h}`} fill="#FFFFFF" opacity={0.45} />
      <polygon
        points={`${-w / 2},0 ${-w / 2},${-h} 0,${-h - tip} ${w / 2},${-h} ${w / 2},0`}
        fill="none"
        stroke="#6E5D88"
        strokeWidth={0.6}
        strokeLinejoin="round"
      />
    </g>
  )
}

export function AmethystCluster({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M-34 4 Q-30 -6 -10 -6 Q10 -9 30 -4 Q38 0 32 6 Q0 12 -30 9Z" fill={C.sandDeep} stroke="#AB9B7C" strokeWidth={0.6} />
      <Crystal x={-18} y={0} h={18} w={11} angle={-28} />
      <Crystal x={19} y={0} h={16} w={10} angle={30} />
      <Crystal x={-7} y={-2} h={30} w={14} angle={-9} />
      <Crystal x={8} y={-2} h={38} w={15} angle={6} />
      <Crystal x={0} y={2} h={14} w={10} angle={0} />
    </g>
  )
}

/* ─────────────── Luna ─────────────── */

/** Fase lunar creciente: k = fracción iluminada (0 a 1). */
export function MoonPhase({ x, y, r, k, lit = C.goldLight, dark = 'none', outline = C.gold }: { x: number; y: number; r: number; k: number; lit?: string; dark?: string; outline?: string }) {
  const rx = Math.abs(1 - 2 * k) * r
  const sweep = k > 0.5 ? 1 : 0
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} fill={dark} stroke={outline} strokeWidth={0.8} />
      {k >= 0.999 ? (
        <circle r={r} fill={lit} />
      ) : (
        <path d={`M0 ${-r} A${r} ${r} 0 0 1 0 ${r} A${r2(rx)} ${r} 0 0 ${sweep} 0 ${-r}Z`} fill={lit} />
      )}
    </g>
  )
}

export function FullMoon({ x, y, r }: { x: number; y: number; r: number }) {
  const id = useSvgId('luna')
  return (
    <g transform={`translate(${x} ${y})`}>
      <defs>
        <radialGradient id={id} cx="0.42" cy="0.4" r="0.65">
          <stop offset="0" stopColor="#FFFEF8" />
          <stop offset="0.7" stopColor="#F6EFDC" />
          <stop offset="1" stopColor="#E6D9B8" />
        </radialGradient>
      </defs>
      <circle r={r} fill={`url(#${id})`} />
      <g fill="#DDD2B6" opacity={0.2}>
        <ellipse cx={-r * 0.3} cy={-r * 0.25} rx={r * 0.22} ry={r * 0.15} />
        <ellipse cx={r * 0.18} cy={-r * 0.05} rx={r * 0.14} ry={r * 0.18} />
        <ellipse cx={-r * 0.05} cy={r * 0.35} rx={r * 0.2} ry={r * 0.11} />
        <circle cx={r * 0.42} cy={r * 0.32} r={r * 0.06} />
        <circle cx={-r * 0.5} cy={r * 0.15} r={r * 0.05} />
      </g>
      <circle r={r} fill="none" stroke={C.goldLight} strokeWidth={0.8} />
    </g>
  )
}

/* ─────────────── Luz ─────────────── */

export function Sparkle({ x, y, s = 6, fill = C.gold, opacity = 0.8, className }: { x: number; y: number; s?: number; fill?: string; opacity?: number; className?: string }) {
  const q = s * 0.16
  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        className={className}
        d={`M0 ${-s} L${q} ${-q} L${s} 0 L${q} ${q} L0 ${s} L${-q} ${q} L${-s} 0 L${-q} ${-q}Z`}
        fill={fill}
        opacity={opacity}
      />
    </g>
  )
}

/** Resplandor radial suave. */
export function Glow({ x, y, r, color = C.goldLight, opacity = 0.6, className }: { x: number; y: number; r: number; color?: string; opacity?: number; className?: string }) {
  const id = useSvgId('glow')
  return (
    <g className={className}>
      <defs>
        <radialGradient id={id}>
          <stop offset="0" stopColor={color} stopOpacity={opacity} />
          <stop offset="0.45" stopColor={color} stopOpacity={opacity * 0.4} />
          <stop offset="1" stopColor={color} stopOpacity={0} />
        </radialGradient>
      </defs>
      <circle cx={x} cy={y} r={r} fill={`url(#${id})`} />
    </g>
  )
}

/** Llama pequeña (sin animación: la vela interactiva tiene la suya). */
export function SmallFlame({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Glow x={0} y={-12} r={26} color={C.flame} opacity={0.55} />
      <path d="M0 0 C7 -6 8 -17 0 -31 C-8 -17 -7 -6 0 0Z" fill={C.flame} />
      <path d="M0 -2 C3.5 -6 4 -12 0 -20 C-4 -12 -3.5 -6 0 -2Z" fill={C.flameCore} />
    </g>
  )
}

/* ─────────────── Raíces ─────────────── */

export function Roots({ x, y, length = 60, depth = 5, seed = 9, spread = 26, angle = 90 }: { x: number; y: number; length?: number; depth?: number; seed?: number; spread?: number; angle?: number }) {
  const rnd = seeded(seed)
  const paths: ReactNode[] = []
  let key = 0
  const grow = (sx: number, sy: number, a: number, len: number, d: number) => {
    const bendA = a + (rnd() - 0.5) * 30
    const ex = sx + Math.cos(deg(a)) * len
    const ey = sy + Math.sin(deg(a)) * len
    const cx = sx + Math.cos(deg(bendA)) * len * 0.55
    const cy = sy + Math.sin(deg(bendA)) * len * 0.55
    paths.push(
      <path
        key={key++}
        d={`M${r2(sx)} ${r2(sy)} Q${r2(cx)} ${r2(cy)} ${r2(ex)} ${r2(ey)}`}
        stroke={d > 3 ? '#8D7F63' : '#A89878'}
        strokeWidth={r2(0.35 + d * 0.38)}
        strokeLinecap="round"
        fill="none"
        opacity={0.55 + d * 0.08}
      />,
    )
    if (d <= 0) return
    const branches = rnd() > 0.35 ? 2 : 3
    for (let b = 0; b < branches; b++) {
      const na = a + (b - (branches - 1) / 2) * spread + (rnd() - 0.5) * 16
      grow(ex, ey, na, len * (0.62 + rnd() * 0.16), d - 1)
    }
  }
  grow(x, y, angle, length, depth)
  return <g>{paths}</g>
}

/* ─────────────── Separador ─────────────── */

/** Ramita horizontal para separar secciones. */
export function SprigDivider({ seed = 2 }: { seed?: number }) {
  return (
    <svg viewBox="0 0 220 40" width="220" height="40" aria-hidden="true" focusable="false" className="sprig-divider">
      <line x1="10" y1="20" x2="70" y2="20" stroke={C.gold} strokeWidth="0.6" opacity="0.7" />
      <line x1="150" y1="20" x2="210" y2="20" stroke={C.gold} strokeWidth="0.6" opacity="0.7" />
      <Rosemary x={76} y={23} length={68} angle={-4} bend={-6} leaves={18} leafLength={11} seed={seed} />
      <circle cx="8" cy="20" r="1.6" fill={C.gold} />
      <circle cx="212" cy="20" r="1.6" fill={C.gold} />
    </svg>
  )
}
