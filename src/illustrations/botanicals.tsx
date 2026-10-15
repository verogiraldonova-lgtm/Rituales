/**
 * Primitivas botánicas en SVG, al estilo de un herbario:
 * línea de tinta fina sobre aguadas de acuarela (filtro #acuarela en SvgDefs).
 * Cada primitiva devuelve un <g> que se compone dentro de una escena.
 */
import { useId, type ReactNode } from 'react'
import { C, r2, seeded } from './palette'

/** Identificador seguro para gradientes dentro del SVG. */
export function useSvgId(prefix: string) {
  return prefix + useId().replace(/[^a-zA-Z0-9_-]/g, '')
}

const rad = (a: number) => (a * Math.PI) / 180

/* ─────────────── Geometría ─────────────── */

type Pt = [number, number]

/** Segmentos cúbicos suaves (Catmull-Rom) que pasan por todos los puntos. */
function curveThrough(points: Pt[]): string {
  let d = ''
  const n = points.length
  const at = (i: number) => points[Math.max(0, Math.min(n - 1, i))]
  for (let i = 0; i < n - 1; i++) {
    const p0 = at(i - 1)
    const p1 = at(i)
    const p2 = at(i + 1)
    const p3 = at(i + 2)
    const c1: Pt = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2: Pt = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += ` C${r2(c1[0])} ${r2(c1[1])} ${r2(c2[0])} ${r2(c2[1])} ${r2(p2[0])} ${r2(p2[1])}`
  }
  return d
}

export function smoothPath(points: Pt[]): string {
  return `M${r2(points[0][0])} ${r2(points[0][1])}` + curveThrough(points)
}

interface BladeOptions {
  /** <1: más ancha cerca de la base; >1: más ancha cerca de la punta. */
  power?: number
  /** <1: contorno más lleno y redondeado. */
  fullness?: number
  /** Ondulación del borde (fracción del ancho). */
  ruffle?: number
  phase?: number
  /** Curvatura lateral de la hoja (fracción del largo). */
  curl?: number
  /** Asimetría entre los dos bordes. */
  asym?: number
  steps?: number
}

/** Contorno orgánico de hoja o pétalo, desde la base (0,0) hacia arriba (0,-L). */
export function blade(L: number, W: number, o: BladeOptions = {}): string {
  const { power = 1, fullness = 0.85, ruffle = 0, phase = 0, curl = 0, asym = 0, steps = 9 } = o
  const prof = (s: number) => Math.pow(Math.sin(Math.PI * Math.pow(s, power)), fullness)
  const bend = (s: number) => curl * L * s * s
  const right: Pt[] = []
  const left: Pt[] = []
  for (let i = 0; i <= steps; i++) {
    const s = i / steps
    const wv = W * prof(s) * (1 + ruffle * Math.sin(s * Math.PI * 6 + phase))
    right.push([bend(s) + wv * (1 + asym), -L * s])
    left.push([bend(s) - wv * (1 - asym), -L * s])
  }
  left.reverse()
  return `M0 0${curveThrough(right)}${curveThrough(left)}Z`
}

/* ─────────────── Paleta de aguadas ─────────────── */

const INK = '#34443A'
const INK_SOFT = '#5C6A5C'
const LEAF_TONES = ['#5E7A5E', '#6E8A68', '#84A07A', '#9AB28E', '#77916D', '#A9BC9C']

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
  const at = (t: number) => ({ x: 2 * (1 - t) * t * p1.x + t * t * length, y: 2 * (1 - t) * t * p1.y })
  const tangent = (t: number) => {
    const dx = 2 * (1 - t) * p1.x + 2 * t * (length - p1.x)
    const dy = 2 * (1 - t) * p1.y - 2 * t * p1.y
    return (Math.atan2(dy, dx) * 180) / Math.PI
  }

  const wash: ReactNode[] = []
  const ink: ReactNode[] = []
  const addLeaf = (key: string, px: number, py: number, a: number, L: number) => {
    const W = L * 0.12
    const curl = (rnd() - 0.5) * 0.18
    const d = blade(L, W, { power: 0.9, fullness: 0.7, curl, steps: 6 })
    const tone = LEAF_TONES[Math.floor(rnd() * LEAF_TONES.length)]
    const tr = `translate(${r2(px)} ${r2(py)}) rotate(${r2(a + 90)})`
    wash.push(<path key={key} d={d} transform={tr} fill={tone} />)
    ink.push(
      <g key={key} transform={tr}>
        <path d={d} fill="none" stroke={INK} strokeWidth={0.38} strokeOpacity={0.8} />
        <path d={`M0 ${r2(-L * 0.08)} Q${r2(curl * L * 0.3)} ${r2(-L * 0.5)} ${r2(curl * L * 0.7)} ${r2(-L * 0.86)}`} fill="none" stroke="#EEF2E6" strokeWidth={0.32} strokeOpacity={0.85} />
      </g>,
    )
  }

  const pairs = Math.max(3, Math.round(leaves / 2))
  for (let i = 0; i < pairs; i++) {
    const t = 0.04 + 0.9 * Math.pow(i / (pairs - 1), 0.85)
    const pt = at(t)
    const tan = tangent(t)
    for (const side of [1, -1]) {
      const spread = 52 - 34 * t + rnd() * 12
      const L = leafLength * (1 - 0.45 * t) * (0.8 + rnd() * 0.35)
      addLeaf(`${i}${side}`, pt.x, pt.y, tan + side * spread, L)
    }
  }
  // Mechón de la punta
  const tipTan = tangent(1)
  ;[-16, -6, 5, 15].forEach((da, k) => addLeaf(`t${k}`, length, 0, tipTan + da, leafLength * (0.38 + rnd() * 0.15)))

  const flowerEls: ReactNode[] = []
  for (let f = 0; f < flowers; f++) {
    const t = 0.22 + rnd() * 0.5
    const pt = at(t)
    const side = rnd() > 0.5 ? 1 : -1
    const a = tangent(t) + side * 70
    flowerEls.push(
      <g key={`f${f}`} transform={`translate(${r2(pt.x)} ${r2(pt.y)}) rotate(${r2(a + 90)}) scale(${r2(0.9 + rnd() * 0.3)})`}>
        <path d="M0 0 L0 -4" stroke={INK_SOFT} strokeWidth={0.35} />
        <path d={blade(5.5, 2.2, { power: 1.2, fullness: 0.6 })} transform="translate(0 -3.5) rotate(-18)" fill="#C9B7DF" stroke="#7E6A99" strokeWidth={0.3} />
        <path d={blade(4.5, 2.4, { power: 0.8, fullness: 0.6 })} transform="translate(0 -3.5) rotate(38)" fill="#DCD0EB" stroke="#7E6A99" strokeWidth={0.3} />
        <path d="M0 -4 q1.5 -4 3.5 -5 M0 -4 q2.3 -3 4.5 -3.2" fill="none" stroke="#7E6A99" strokeWidth={0.28} />
      </g>,
    )
  }

  const stem = `M0 0 Q${p1.x} ${p1.y} ${length} 0`
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`} opacity={opacity}>
      <g filter="url(#acuarela)" opacity={0.92}>
        <path d={stem} fill="none" stroke="#8A8160" strokeWidth={2.2} strokeLinecap="round" />
        {wash}
      </g>
      <path d={stem} fill="none" stroke={INK} strokeWidth={0.75} strokeLinecap="round" />
      {ink}
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

export function Chamomile({ x, y, size = 20, tilt = 0.8, rotate = 0, petals = 21, seed = 3 }: ChamomileProps) {
  const rnd = seeded(seed)
  const id = useSvgId('cham')
  const r0 = size * 0.3
  const petalEls: ReactNode[] = []
  for (let k = 0; k < petals; k++) {
    const a = (k * 360) / petals + (rnd() - 0.5) * 9
    const L = size * (0.74 + rnd() * 0.24)
    const w = size * 0.16
    const e = r0 + L
    const d = `M${r2(r0)} ${r2(-w * 0.42)} Q${r2(r0 + L * 0.55)} ${r2(-w * 0.72)} ${r2(e)} ${r2(-w * 0.5)} L${r2(e + w * 0.22)} ${r2(-w * 0.22)} L${r2(e + w * 0.05)} 0 L${r2(e + w * 0.22)} ${r2(w * 0.22)} L${r2(e)} ${r2(w * 0.5)} Q${r2(r0 + L * 0.55)} ${r2(w * 0.72)} ${r2(r0)} ${r2(w * 0.42)}Z`
    petalEls.push(
      <g key={k} transform={`rotate(${r2(a)})`}>
        <path d={d} fill="#FFFEFA" stroke={INK_SOFT} strokeWidth={0.32} strokeOpacity={0.85} />
        <path d={`M${r2(r0 + 1)} 0 L${r2(e - w * 0.4)} 0`} stroke="#DDD8C8" strokeWidth={0.3} />
      </g>,
    )
  }
  const dots: ReactNode[] = []
  for (let d = 0; d < 46; d++) {
    const rr = Math.sqrt(rnd()) * size * 0.34
    const aa = rnd() * Math.PI * 2
    const cx = Math.cos(aa) * rr
    const cy = Math.sin(aa) * rr
    const shade = cx + cy > 0
    dots.push(<circle key={d} cx={r2(cx)} cy={r2(cy)} r={r2(size * (shade ? 0.026 : 0.018))} fill={shade ? '#8C6524' : '#B38A3C'} opacity={shade ? 0.75 : 0.45} />)
  }
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(1 ${tilt})`}>
      <defs>
        <radialGradient id={id} cx="0.35" cy="0.3" r="0.75">
          <stop offset="0" stopColor="#FBE7A3" />
          <stop offset="0.6" stopColor="#E7B954" />
          <stop offset="1" stopColor="#C38D2E" />
        </radialGradient>
      </defs>
      <circle r={size * 1.05} fill="#E9E3CF" opacity={0.35} filter="url(#acuarela)" />
      {petalEls}
      <circle r={size * 0.37} fill={`url(#${id})`} stroke="#9A7430" strokeWidth={0.35} />
      {dots}
    </g>
  )
}

/** Hoja plumosa (bipinnada) de manzanilla. */
export function ChamomileLeaf({ x, y, length = 40, angle = 0, seed = 5 }: { x: number; y: number; length?: number; angle?: number; seed?: number }) {
  const rnd = seeded(seed)
  const lines: string[] = [`M0 0 Q${r2(length * 0.5)} ${r2(-length * 0.06)} ${length} 0`]
  const n = 8
  for (let i = 1; i <= n; i++) {
    const t = i / (n + 1)
    const px = t * length
    const py = -length * 0.06 * 4 * t * (1 - t)
    for (const side of [1, -1]) {
      const l = length * 0.26 * (1 - t * 0.55) * (0.85 + rnd() * 0.3)
      const a = rad(side * (42 + rnd() * 12))
      const ex = px + Math.cos(a) * l
      const ey = py - Math.sin(a) * l
      lines.push(`M${r2(px)} ${r2(py)} Q${r2(px + Math.cos(a) * l * 0.5 + 1)} ${r2(py - Math.sin(a) * l * 0.5)} ${r2(ex)} ${r2(ey)}`)
      // Segmentos finos en forma de horquilla
      const mx = px + Math.cos(a) * l * 0.55
      const my = py - Math.sin(a) * l * 0.55
      lines.push(`M${r2(mx)} ${r2(my)} l${r2(l * 0.28)} ${r2(-side * l * 0.18)}`)
      lines.push(`M${r2(mx)} ${r2(my)} l${r2(l * 0.12)} ${r2(side * l * 0.22)}`)
    }
  }
  const d = lines.join(' ')
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`}>
      <path d={d} fill="none" stroke="#9DB08F" strokeWidth={1.5} strokeLinecap="round" filter="url(#acuarela)" />
      <path d={d} fill="none" stroke={INK} strokeWidth={0.42} strokeLinecap="round" />
    </g>
  )
}

/* ─────────────── Orquídea blanca (Phalaenopsis) ─────────────── */

interface OrchidProps {
  x: number
  y: number
  size?: number
  rotate?: number
  seed?: number
}

export function Orchid({ x, y, size = 1, rotate = 0, seed = 1 }: OrchidProps) {
  const rnd = seeded(seed + 40)
  const g = useSvgId('orq')
  const blush = useSvgId('rubor')
  const parts = [
    { L: 43, W: 12.5, a: 0, power: 1.15, fullness: 0.8 },
    { L: 40, W: 11.5, a: 134, power: 1.1, fullness: 0.8 },
    { L: 40, W: 11.5, a: -134, power: 1.1, fullness: 0.8 },
    { L: 45, W: 24, a: 73, power: 1.4, fullness: 0.62 },
    { L: 45, W: 24, a: -73, power: 1.4, fullness: 0.62 },
  ]
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${size})`}>
      <defs>
        <linearGradient id={g} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#E2D9C4" />
          <stop offset="0.28" stopColor="#F7F3E9" />
          <stop offset="0.75" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#F6F2E7" />
        </linearGradient>
        <linearGradient id={blush} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#E6C4B8" stopOpacity="0.55" />
          <stop offset="0.35" stopColor="#E6C4B8" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Sombra de aguada */}
      <circle r={46} fill="#E3DAC4" opacity={0.35} filter="url(#acuarela)" />
      {parts.map((p, i) => {
        const d = blade(p.L, p.W, { power: p.power, fullness: p.fullness, ruffle: 0.035, phase: rnd() * 6, asym: (rnd() - 0.5) * 0.12, steps: 12 })
        return (
          <g key={i} transform={`rotate(${p.a})`}>
            <path d={d} fill={`url(#${g})`} />
            <path d={d} fill={`url(#${blush})`} />
            <g stroke="#CEC6AF" strokeWidth={0.28} fill="none">
              {[-2, -1, 0, 1, 2].map((k) => (
                <path key={k} d={`M${k * 0.5} -3 Q${r2(k * p.W * 0.28)} ${r2(-p.L * 0.45)} ${r2(k * p.W * 0.34)} ${r2(-p.L * 0.86)}`} />
              ))}
            </g>
            <path d={d} fill="none" stroke={INK_SOFT} strokeWidth={0.48} strokeOpacity={0.7} />
          </g>
        )
      })}
      {/* Labelo */}
      <g stroke="#8E6A3E" strokeWidth={0.32}>
        <path d={blade(13, 5, { power: 1.3, fullness: 0.7, curl: 0.15 })} transform="rotate(148)" fill="#EBC56A" />
        <path d={blade(13, 5, { power: 1.3, fullness: 0.7, curl: -0.15 })} transform="rotate(-148)" fill="#EBC56A" />
        <path d={blade(16, 6, { power: 0.7, fullness: 0.75 })} transform="rotate(180)" fill="#F3E2C2" />
      </g>
      {[
        [-6, 7],
        [-7.4, 9.4],
        [6, 7],
        [7.4, 9.4],
        [-1.2, 10],
        [1.4, 12],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={0.55} fill="#A9583F" opacity={0.8} />
      ))}
      <path d="M-1.2 15.5 q-5.5 1.8 -4.6 7.8 M1.2 15.5 q5.5 1.8 4.6 7.8" fill="none" stroke="#8E6A3E" strokeWidth={0.5} strokeLinecap="round" />
      <ellipse cx={0} cy={5} rx={3} ry={2.2} fill="#E8B848" stroke="#8E6A3E" strokeWidth={0.3} />
      {/* Columna */}
      <path d="M-3.4 -1 Q-3.6 -8 0 -9.5 Q3.6 -8 3.4 -1 Q0 1.5 -3.4 -1Z" fill="#FFFFFF" stroke={INK_SOFT} strokeWidth={0.4} />
      <ellipse cx={0} cy={-6.6} rx={1.6} ry={1.3} fill="#F1DBA0" />
    </g>
  )
}

export function OrchidBud({ x, y, size = 1, rotate = 0 }: OrchidProps) {
  const d = blade(16, 6, { power: 1.15, fullness: 0.8 })
  const id = useSvgId('boton')
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${size})`}>
      <defs>
        <linearGradient id={id} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#C9D2B3" />
          <stop offset="0.5" stopColor="#EEF0E0" />
          <stop offset="1" stopColor="#FAF8EE" />
        </linearGradient>
      </defs>
      <path d={d} fill={`url(#${id})`} stroke={INK_SOFT} strokeWidth={0.45} />
      <path d="M0 -1 Q1.6 -8 0.4 -15" fill="none" stroke="#B7BC9F" strokeWidth={0.4} />
      <path d="M-2.8 -2 Q-3.4 -8 -1.6 -13" fill="none" stroke="#D6D8C4" strokeWidth={0.35} />
    </g>
  )
}

/** Vara arqueada de orquídea con flores y botones repartidos sobre la curva. */
export function OrchidSpray({
  points,
  flowers,
  buds = [],
}: {
  points: Pt[]
  flowers: { at: Pt; size: number; rotate?: number; seed?: number }[]
  buds?: { at: Pt; size: number; rotate: number }[]
}) {
  const d = smoothPath(points)
  return (
    <g>
      <path d={d} fill="none" stroke="#7B8A68" strokeWidth={2.4} strokeLinecap="round" filter="url(#acuarela)" />
      <path d={d} fill="none" stroke={INK} strokeWidth={0.7} strokeLinecap="round" />
      {buds.map((b, i) => (
        <OrchidBud key={i} x={b.at[0]} y={b.at[1]} size={b.size} rotate={b.rotate} />
      ))}
      {flowers.map((f, i) => (
        <Orchid key={i} x={f.at[0]} y={f.at[1]} size={f.size} rotate={f.rotate ?? 0} seed={f.seed ?? i + 1} />
      ))}
    </g>
  )
}

/** Hoja ancha y carnosa de orquídea. */
export function OrchidLeaf({ x, y, length = 90, width = 26, angle = 0, seed = 2 }: { x: number; y: number; length?: number; width?: number; angle?: number; seed?: number }) {
  const id = useSvgId('hoja')
  const rnd = seeded(seed)
  const d = blade(length, width / 2, { power: 0.95, fullness: 0.55, curl: (rnd() - 0.5) * 0.12, steps: 12 })
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle + 90})`}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#4C6A4F" />
          <stop offset="0.55" stopColor="#6E8A66" />
          <stop offset="1" stopColor="#93AA86" />
        </linearGradient>
      </defs>
      <path d={d} fill={`url(#${id})`} filter="url(#acuarela)" />
      <path d={d} fill="none" stroke={INK} strokeWidth={0.55} />
      <path d={`M0 -2 Q1 ${-length * 0.5} 0 ${-length * 0.92}`} fill="none" stroke="#C4D0B5" strokeWidth={0.6} />
      {[-0.45, -0.22, 0.22, 0.45].map((k) => (
        <path key={k} d={`M0 ${-length * 0.06} Q${r2(k * width * 0.6)} ${-length * 0.45} ${r2(k * width * 0.25)} ${-length * 0.88}`} fill="none" stroke="#2F4433" strokeWidth={0.25} strokeOpacity={0.6} />
      ))}
    </g>
  )
}

/** Raíz aérea de orquídea. */
export function AerialRoot({ d }: { d: string }) {
  return (
    <g fill="none" strokeLinecap="round">
      <path d={d} stroke={INK_SOFT} strokeWidth={3.4} />
      <path d={d} stroke="#D3D5C4" strokeWidth={2.6} />
      <path d={d} stroke="#ECEEE2" strokeWidth={0.8} strokeDasharray="2 5" />
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
  const gid = useSvgId('cristal')
  const xl = -w / 2
  const x1 = -w * 0.17
  const x2 = w * 0.21
  const xr = w / 2
  const y1 = -h - w * 0.13
  const y2 = -h - w * 0.08
  const apex: Pt = [w * 0.03, -h - w * 0.95]
  const poly = (pts: Pt[]) => pts.map((p) => `${r2(p[0])},${r2(p[1])}`).join(' ')
  // Cada cara con su propio degradé: luz arriba, profundidad abajo
  const tones: [string, string][] = [
    ['#7F68A6', '#4B3A6E'],
    ['#C3B2E0', '#7E67A8'],
    ['#EDE5F8', '#A592C8'],
    ['#9C86C2', '#6A5592'],
    ['#E2D7F2', '#B19FD3'],
    ['#FFFFFF', '#D9CDEE'],
  ]
  const faces: Pt[][] = [
    [[xl, 0], [xl, -h], [x1, y1], [x1, 0]],
    [[x1, 0], [x1, y1], [x2, y2], [x2, 0]],
    [[x2, 0], [x2, y2], [xr, -h], [xr, 0]],
    [[xl, -h], apex, [x1, y1]],
    [[x1, y1], apex, [x2, y2]],
    [[x2, y2], apex, [xr, -h]],
  ]
  const outline: Pt[] = [[xl, 0], [xl, -h], apex, [xr, -h], [xr, 0]]
  const hatch: ReactNode[] = []
  for (let i = 1; i < 5; i++) {
    const hx = xl + ((x1 - xl) * i) / 5
    hatch.push(<path key={i} d={`M${r2(hx)} ${r2(-h * 0.08)} L${r2(hx)} ${r2(-h * 0.7 + i)}`} />)
  }
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`}>
      <defs>
        {tones.map(([top, bottom], i) => (
          <linearGradient key={i} id={`${gid}${i}`} x1="0" y1="0" x2="0.2" y2="1">
            <stop offset="0" stopColor={top} />
            <stop offset="1" stopColor={bottom} />
          </linearGradient>
        ))}
      </defs>
      <g filter="url(#acuarela)">
        {faces.map((pts, i) => (
          <polygon key={i} points={poly(pts)} fill={`url(#${gid}${i})`} />
        ))}
      </g>
      <g stroke="#3E3256" strokeWidth={0.32} opacity={0.45}>
        {hatch}
      </g>
      <g fill="none" stroke="#3E3256" strokeWidth={0.6} strokeLinejoin="round">
        <polygon points={poly(outline)} />
      </g>
      <path
        d={`M${x1} 0 L${x1} ${r2(y1)} L${r2(apex[0])} ${r2(apex[1])} M${x2} 0 L${x2} ${r2(y2)} L${r2(apex[0])} ${r2(apex[1])} M${xl} ${-h} L${r2(x1)} ${r2(y1)} L${r2(x2)} ${r2(y2)} L${xr} ${-h}`}
        fill="none"
        stroke="#4A3E63"
        strokeWidth={0.38}
        strokeOpacity={0.8}
      />
      {/* Brillos y vetas */}
      <path d={`M${r2(x1 + w * 0.08)} ${r2(-h * 0.12)} L${r2(x1 + w * 0.1)} ${r2(-h * 0.88)}`} stroke="#FFFFFF" strokeWidth={w * 0.06} opacity={0.75} strokeLinecap="round" />
      <path d={`M${r2(x2 + w * 0.09)} ${r2(-h * 0.35)} L${r2(x2 + w * 0.1)} ${r2(-h * 0.92)}`} stroke="#FFFFFF" strokeWidth={w * 0.04} opacity={0.7} strokeLinecap="round" />
      <path d={`M${r2(x1 + w * 0.05)} ${r2(y1 - w * 0.1)} L${r2(apex[0] - w * 0.04)} ${r2(apex[1] + w * 0.25)}`} stroke="#FFFFFF" strokeWidth={w * 0.05} opacity={0.8} strokeLinecap="round" />
      <g fill="#FFFFFF" opacity={0.7}>
        <circle cx={r2(x2 - w * 0.12)} cy={r2(-h * 0.55)} r={w * 0.035} />
        <circle cx={r2(x2 - w * 0.2)} cy={r2(-h * 0.45)} r={w * 0.025} />
        <circle cx={r2(xl + w * 0.12)} cy={r2(-h * 0.3)} r={w * 0.03} />
      </g>
    </g>
  )
}

export function AmethystCluster({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  const rock = smoothPath([
    [-36, 4],
    [-30, -5],
    [-12, -8],
    [8, -9],
    [28, -5],
    [37, 1],
    [30, 8],
    [0, 11],
    [-28, 9],
    [-36, 4],
  ])
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d={rock} fill="#CDBFA2" filter="url(#acuarela)" />
      <path d={rock} fill="none" stroke={INK_SOFT} strokeWidth={0.45} />
      <g stroke={INK_SOFT} strokeWidth={0.3} opacity={0.6}>
        {[-26, -20, -14, 16, 22, 28].map((hx) => (
          <path key={hx} d={`M${hx} 9 l3 -6`} />
        ))}
      </g>
      <Crystal x={-25} y={2} h={12} w={9} angle={-48} />
      <Crystal x={-18} y={0} h={20} w={11} angle={-30} />
      <Crystal x={22} y={0} h={17} w={10.5} angle={30} />
      <Crystal x={-7} y={-2} h={31} w={14} angle={-12} />
      <Crystal x={10} y={-2} h={41} w={15.5} angle={7} />
      <Crystal x={1} y={3} h={15} w={10} angle={-3} />
      <Crystal x={28} y={3} h={9} w={7} angle={55} />
      <Crystal x={-31} y={5} h={6} w={6} angle={-66} />
    </g>
  )
}

/* ─────────────── Pirámide ─────────────── */

/** La pirámide de Alejandro: luminosa, con sombreado a plumilla. */
export function Pyramid({ x, y, w = 60, h = 80 }: { x: number; y: number; w?: number; h?: number }) {
  const id = useSvgId('pir')
  const apex: Pt = [0, -h]
  const left: Pt = [-w, 0]
  const right: Pt = [w, -2]
  const front: Pt = [w * 0.16, h * 0.13]
  // Plumilla: trazos finos que bajan desde el vértice por la cara en sombra
  const hatch: ReactNode[] = []
  for (let i = 1; i < 16; i++) {
    const t = i / 16
    const bx = front[0] + (right[0] - front[0]) * t
    const by = front[1] + (right[1] - front[1]) * t
    const sx = apex[0] + (bx - apex[0]) * 0.12
    const sy = apex[1] + (by - apex[1]) * 0.12
    hatch.push(<path key={i} d={`M${r2(sx)} ${r2(sy)} L${r2(bx)} ${r2(by - 1)}`} opacity={0.35 + 0.5 * (1 - t)} />)
  }
  return (
    <g transform={`translate(${x} ${y})`}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="#FFFBEE" />
          <stop offset="1" stopColor="#EBDDB9" />
        </linearGradient>
      </defs>
      <ellipse cx={w * 0.1} cy={h * 0.14} rx={w * 1.2} ry={h * 0.09} fill="#D8CBAA" opacity={0.45} filter="url(#acuarela)" />
      <polygon points={`${left[0]},${left[1]} ${apex[0]},${apex[1]} ${front[0]},${front[1]}`} fill={`url(#${id})`} />
      <polygon points={`${front[0]},${front[1]} ${apex[0]},${apex[1]} ${right[0]},${right[1]}`} fill="#E2D2AC" filter="url(#acuarela)" />
      <g stroke={C.goldInk} strokeWidth={0.3} opacity={0.6}>
        {hatch}
      </g>
      <g fill="none" stroke={C.goldInk} strokeWidth={0.8} strokeLinejoin="round">
        <polygon points={`${left[0]},${left[1]} ${apex[0]},${apex[1]} ${right[0]},${right[1]} ${front[0]},${front[1]}`} />
        <path d={`M${apex[0]} ${apex[1]} L${front[0]} ${front[1]}`} />
      </g>
      <path d={`M${r2(-w * 0.45)} ${r2(-h * 0.25)} L${r2(-w * 0.12)} ${r2(-h * 0.78)}`} stroke="#FFFFFF" strokeWidth={1.2} opacity={0.8} strokeLinecap="round" />
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
      {k >= 0.999 ? <circle r={r} fill={lit} /> : <path d={`M0 ${-r} A${r} ${r} 0 0 1 0 ${r} A${r2(rx)} ${r} 0 0 ${sweep} 0 ${-r}Z`} fill={lit} />}
    </g>
  )
}

export function FullMoon({ x, y, r }: { x: number; y: number; r: number }) {
  const id = useSvgId('luna')
  const rnd = seeded(Math.round(r * 7))
  const craters: ReactNode[] = []
  for (let i = 0; i < 9; i++) {
    const a = rnd() * Math.PI * 2
    const d = Math.sqrt(rnd()) * r * 0.78
    craters.push(<circle key={i} cx={r2(Math.cos(a) * d)} cy={r2(Math.sin(a) * d)} r={r2(r * (0.03 + rnd() * 0.05))} fill="none" stroke="#B9A983" strokeWidth={0.35} opacity={0.6} />)
  }
  return (
    <g transform={`translate(${x} ${y})`}>
      <defs>
        <radialGradient id={id} cx="0.4" cy="0.38" r="0.68">
          <stop offset="0" stopColor="#FFFEF8" />
          <stop offset="0.65" stopColor="#F6EEDA" />
          <stop offset="1" stopColor="#E3D5B3" />
        </radialGradient>
      </defs>
      <circle r={r} fill={`url(#${id})`} />
      <g fill="#D3C49F" opacity={0.42} filter="url(#acuarela)">
        <path d={smoothPath([[-r * 0.55, -r * 0.3], [-r * 0.2, -r * 0.48], [r * 0.05, -r * 0.2], [-r * 0.25, 0], [-r * 0.55, -r * 0.1], [-r * 0.55, -r * 0.3]])} />
        <path d={smoothPath([[r * 0.1, -r * 0.05], [r * 0.38, -r * 0.2], [r * 0.45, r * 0.12], [r * 0.2, r * 0.22], [r * 0.1, -r * 0.05]])} />
        <path d={smoothPath([[-r * 0.3, r * 0.3], [0, r * 0.25], [r * 0.12, r * 0.45], [-r * 0.2, r * 0.55], [-r * 0.3, r * 0.3]])} />
      </g>
      {craters}
      <circle r={r} fill="none" stroke="#C9B88E" strokeWidth={0.5} />
    </g>
  )
}

/* ─────────────── Luz ─────────────── */

/** Destello cósmico: halo suave con rayos de difracción finos. */
export function Sparkle({ x, y, s = 6, fill = C.gold, opacity = 0.85, className }: { x: number; y: number; s?: number; fill?: string; opacity?: number; className?: string }) {
  const id = useSvgId('chispa')
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className={className} opacity={opacity}>
        <defs>
          <radialGradient id={id}>
            <stop offset="0" stopColor="#FFFDF4" stopOpacity="1" />
            <stop offset="0.3" stopColor={fill} stopOpacity="0.55" />
            <stop offset="1" stopColor={fill} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle r={s * 0.9} fill={`url(#${id})`} />
        <path d={`M0 ${-s * 1.6} L${s * 0.07} 0 L0 ${s * 1.6} L${-s * 0.07} 0Z M${-s * 1.25} 0 L0 ${s * 0.06} L${s * 1.25} 0 L0 ${-s * 0.06}Z`} fill={fill} />
        <path d={`M${-s * 0.5} ${-s * 0.5} L${s * 0.5} ${s * 0.5} M${s * 0.5} ${-s * 0.5} L${-s * 0.5} ${s * 0.5}`} stroke={fill} strokeWidth={s * 0.05} opacity={0.6} />
        <circle r={s * 0.14} fill="#FFFFFF" />
      </g>
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

/** Llama pequeña. */
export function SmallFlame({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  const id = useSvgId('llamita')
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <defs>
        <radialGradient id={id} cx="0.5" cy="0.8" r="0.8">
          <stop offset="0" stopColor="#FFFBEA" />
          <stop offset="0.5" stopColor="#F8D98C" />
          <stop offset="1" stopColor="#E3A143" />
        </radialGradient>
      </defs>
      <Glow x={0} y={-12} r={28} color={C.flame} opacity={0.5} />
      <path d="M0 0 C7 -6 8 -17 0 -31 C-8 -17 -7 -6 0 0Z" fill={`url(#${id})`} />
      <path d="M0 -2 C3.5 -6 4 -12 0 -20 C-4 -12 -3.5 -6 0 -2Z" fill="#FFFDF4" opacity={0.9} />
      <path d="M0 0 C7 -6 8 -17 0 -31 C-8 -17 -7 -6 0 0Z" fill="none" stroke="#B9822F" strokeWidth={0.4} opacity={0.6} />
    </g>
  )
}

/** Velón de cera con chorreados. */
export function PillarCandle({ x, y, w = 22, h = 50, lit = true }: { x: number; y: number; w?: number; h?: number; lit?: boolean }) {
  const id = useSvgId('cera')
  return (
    <g transform={`translate(${x} ${y})`}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#E6DCC6" />
          <stop offset="0.35" stopColor="#FFFDF7" />
          <stop offset="1" stopColor="#DCCFB2" />
        </linearGradient>
      </defs>
      <ellipse cx={0} cy={0} rx={w * 0.9} ry={3} fill="#D6C9A8" opacity={0.5} filter="url(#acuarela)" />
      <path d={`M${-w / 2} 0 L${-w / 2} ${-h} Q0 ${-h - 4} ${w / 2} ${-h} L${w / 2} 0 Q0 3 ${-w / 2} 0Z`} fill={`url(#${id})`} stroke={INK_SOFT} strokeWidth={0.45} />
      <path d={`M${-w / 2} ${-h} Q${-w * 0.35} ${-h + 9} ${-w * 0.3} ${-h + 3} Q${-w * 0.2} ${-h + 14} ${-w * 0.08} ${-h + 2}`} fill="none" stroke={INK_SOFT} strokeWidth={0.35} />
      <path d={`M${w * 0.22} ${-h + 1} q1 7 2.4 3`} fill="none" stroke={INK_SOFT} strokeWidth={0.35} />
      <path d={`M${-w * 0.28} ${-h * 0.8} L${-w * 0.28} ${-h * 0.15}`} stroke="#FFFFFF" strokeWidth={1.2} opacity={0.7} strokeLinecap="round" />
      <path d={`M0 ${-h - 1.5} q0.8 -3 0 -6`} stroke="#3F372D" strokeWidth={0.9} fill="none" strokeLinecap="round" />
      {lit && <SmallFlame x={0} y={-h - 5} s={w / 30} />}
    </g>
  )
}

/** Cuenco de cerámica con agua. */
export function WaterBowl({ x, y, w = 48, reflection = true }: { x: number; y: number; w?: number; reflection?: boolean }) {
  const id = useSvgId('agua')
  const h = w * 0.62
  return (
    <g transform={`translate(${x} ${y})`}>
      <defs>
        <radialGradient id={id} cx="0.55" cy="0.45" r="0.7">
          <stop offset="0" stopColor="#F2F6F1" />
          <stop offset="1" stopColor="#B9C9BE" />
        </radialGradient>
      </defs>
      <ellipse cx={0} cy={h + 1} rx={w * 0.85} ry={4} fill="#D5C8A7" opacity={0.5} filter="url(#acuarela)" />
      <path d={`M${-w} 0 Q${-w * 0.95} ${h} 0 ${h} Q${w * 0.95} ${h} ${w} 0Z`} fill="#EFE7D6" filter="url(#acuarela)" />
      <path d={`M${-w} 0 Q${-w * 0.95} ${h} 0 ${h} Q${w * 0.95} ${h} ${w} 0`} fill="none" stroke={INK_SOFT} strokeWidth={0.6} />
      <g stroke={INK_SOFT} strokeWidth={0.3} opacity={0.5}>
        {[0.55, 0.65, 0.75, 0.85].map((t) => (
          <path key={t} d={`M${r2(w * t)} ${r2(h * 0.1)} Q${r2(w * t * 0.9)} ${r2(h * 0.6)} ${r2(w * t * 0.55)} ${r2(h * 0.9)}`} fill="none" />
        ))}
      </g>
      <ellipse cx={0} cy={0} rx={w} ry={w * 0.19} fill={`url(#${id})`} stroke={INK_SOFT} strokeWidth={0.6} />
      {reflection && (
        <>
          <ellipse cx={w * 0.12} cy={0} rx={w * 0.35} ry={w * 0.06} fill="none" stroke="#FFFFFF" strokeWidth={0.6} opacity={0.9} />
          <ellipse cx={w * 0.12} cy={0} rx={w * 0.6} ry={w * 0.11} fill="none" stroke="#FFFFFF" strokeWidth={0.4} opacity={0.6} />
        </>
      )}
    </g>
  )
}

/* ─────────────── Raíces ─────────────── */

export function Roots({ x, y, length = 60, depth = 5, seed = 9, spread = 26, angle = 90 }: { x: number; y: number; length?: number; depth?: number; seed?: number; spread?: number; angle?: number }) {
  const rnd = seeded(seed)
  const wash: ReactNode[] = []
  const ink: ReactNode[] = []
  let key = 0
  const grow = (sx: number, sy: number, a: number, len: number, d: number) => {
    const bendA = a + (rnd() - 0.5) * 34
    const ex = sx + Math.cos(rad(a)) * len
    const ey = sy + Math.sin(rad(a)) * len
    const cx = sx + Math.cos(rad(bendA)) * len * 0.55
    const cy = sy + Math.sin(rad(bendA)) * len * 0.55
    const path = `M${r2(sx)} ${r2(sy)} Q${r2(cx)} ${r2(cy)} ${r2(ex)} ${r2(ey)}`
    const k = key++
    wash.push(<path key={k} d={path} stroke="#B3A07B" strokeWidth={r2(0.8 + d * 0.9)} strokeLinecap="round" fill="none" />)
    ink.push(<path key={k} d={path} stroke="#5E5040" strokeWidth={r2(0.25 + d * 0.16)} strokeLinecap="round" fill="none" opacity={0.85} />)
    if (d <= 1) {
      // Pelos radiculares
      for (let hh = 0; hh < 3; hh++) {
        const t = 0.3 + rnd() * 0.6
        const hx = sx + (ex - sx) * t
        const hy = sy + (ey - sy) * t
        const ha = a + (rnd() > 0.5 ? 60 : -60)
        ink.push(<path key={`${k}h${hh}`} d={`M${r2(hx)} ${r2(hy)} l${r2(Math.cos(rad(ha)) * 2.4)} ${r2(Math.sin(rad(ha)) * 2.4)}`} stroke="#6E5F48" strokeWidth={0.2} />)
      }
    }
    if (d <= 0) return
    const branches = rnd() > 0.35 ? 2 : 3
    for (let b = 0; b < branches; b++) {
      const na = a + (b - (branches - 1) / 2) * spread + (rnd() - 0.5) * 16
      grow(ex, ey, na, len * (0.62 + rnd() * 0.16), d - 1)
    }
  }
  grow(x, y, angle, length, depth)
  return (
    <g>
      <g filter="url(#acuarela)" opacity={0.7}>
        {wash}
      </g>
      {ink}
    </g>
  )
}

/* ─────────────── Hojas sueltas ─────────────── */

/** Hoja ovalada de acuarela (para guirnaldas e iniciales). */
export function Leaf({ x, y, length = 20, width = 7, angle = 0, tone = 0, seed = 1 }: { x: number; y: number; length?: number; width?: number; angle?: number; tone?: number; seed?: number }) {
  const rnd = seeded(seed)
  const d = blade(length, width, { power: 0.85, fullness: 0.7, curl: (rnd() - 0.5) * 0.25, steps: 10 })
  const fill = LEAF_TONES[tone % LEAF_TONES.length]
  return (
    <g transform={`translate(${r2(x)} ${r2(y)}) rotate(${r2(angle + 90)})`}>
      <path d={d} fill={fill} filter="url(#acuarela)" />
      <path d={d} fill="none" stroke={INK} strokeWidth={0.4} strokeOpacity={0.8} />
      <path d={`M0 -1 Q${r2(length * 0.04)} ${r2(-length * 0.5)} 0 ${r2(-length * 0.9)}`} fill="none" stroke={INK} strokeWidth={0.3} strokeOpacity={0.6} />
      {[0.3, 0.5, 0.7].map((t) => (
        <path key={t} d={`M0 ${r2(-length * t)} l${r2(width * 0.6)} ${r2(-length * 0.12)} M0 ${r2(-length * t)} l${r2(-width * 0.6)} ${r2(-length * 0.12)}`} stroke={INK} strokeWidth={0.22} strokeOpacity={0.45} />
      ))}
    </g>
  )
}

/** Pequeña flor de cinco pétalos (marca de jornada leída). */
export function TinyFlower({ x = 0, y = 0, r = 5 }: { x?: number; y?: number; r?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx={0} cy={-r * 0.55} rx={r * 0.34} ry={r * 0.55} transform={`rotate(${a})`} fill="#FFFEF8" stroke={INK_SOFT} strokeWidth={r * 0.07} />
      ))}
      <circle r={r * 0.28} fill="#E7B954" stroke="#9A7430" strokeWidth={r * 0.05} />
    </g>
  )
}

/* ─────────────── Separador ─────────────── */

/** Ramita horizontal para separar secciones. */
export function SprigDivider({ seed = 2 }: { seed?: number }) {
  return (
    <svg viewBox="0 0 220 40" width="220" height="40" aria-hidden="true" focusable="false" className="sprig-divider">
      <line x1="10" y1="20" x2="70" y2="20" stroke={C.gold} strokeWidth="0.6" opacity="0.7" />
      <line x1="150" y1="20" x2="210" y2="20" stroke={C.gold} strokeWidth="0.6" opacity="0.7" />
      <Rosemary x={76} y={22} length={68} angle={-4} bend={-6} leaves={18} leafLength={11} seed={seed} />
      <circle cx="8" cy="20" r="1.6" fill={C.gold} />
      <circle cx="212" cy="20" r="1.6" fill={C.gold} />
    </svg>
  )
}

/* ─────────────── Mano abierta ─────────────── */

/** Mano con la palma hacia arriba, dibujada a línea fina (pulgar hacia la derecha). */
export function OpenHand({ x, y, scale = 1, mirror = false }: { x: number; y: number; scale?: number; mirror?: boolean }) {
  const fingers = [
    { bx: -13.5, by: -55, L: 25, W: 4.5, a: -15 },
    { bx: -4.8, by: -59, L: 33, W: 4.9, a: -5 },
    { bx: 4.8, by: -60, L: 36, W: 5, a: 4 },
    { bx: 13.8, by: -57, L: 31, W: 4.8, a: 13 },
    { bx: 19, by: -27, L: 29, W: 5.6, a: 56 },
  ]
  const palm = smoothPath([
    [-15, 2],
    [-17.5, -22],
    [-19, -44],
    [-18, -58],
    [-8, -63],
    [6, -64],
    [18, -59],
    [21, -44],
    [23, -30],
    [19, -14],
    [16, 2],
  ])
  return (
    <g transform={`translate(${x} ${y}) scale(${mirror ? -scale : scale} ${scale})`}>
      {fingers.map((f, i) => {
        const d = blade(f.L, f.W, { power: 0.55, fullness: 0.32, curl: i === 4 ? -0.06 : 0.04, steps: 10 })
        return (
          <g key={i} transform={`translate(${f.bx} ${f.by}) rotate(${f.a})`}>
            <path d={d} fill="#F4E8DA" />
            <path d={d} fill="#E9D6C2" opacity={0.6} filter="url(#acuarela)" />
            <path d={d} fill="none" stroke={INK} strokeWidth={0.55} />
            {i < 4 && (
              <path d={`M-2.6 ${-f.L * 0.38} q2.6 -1.2 5.2 0 M-2.4 ${-f.L * 0.66} q2.4 -1 4.8 0`} fill="none" stroke={INK_SOFT} strokeWidth={0.3} />
            )}
          </g>
        )
      })}
      <path d={`${palm}Z`} fill="#F6ECDF" />
      <path d={`${palm}Z`} fill="#EAD8C4" opacity={0.55} filter="url(#acuarela)" />
      <path d={palm} fill="none" stroke={INK} strokeWidth={0.55} strokeDasharray="0" />
      <g fill="none" stroke={INK_SOFT} strokeWidth={0.38} strokeLinecap="round" opacity={0.8}>
        <path d="M-15 -42 Q0 -50 17 -45" />
        <path d="M-14 -33 Q-2 -38 10 -36" />
        <path d="M15 -36 Q8 -22 2 -10" />
      </g>
    </g>
  )
}
