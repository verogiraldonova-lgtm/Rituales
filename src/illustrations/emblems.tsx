/**
 * Emblemas: carta de la invocación, íconos del jardín, elementos de la
 * transformación (Día IX), letras capitulares y emblema de la cabecera.
 */
import type { ReactNode } from 'react'
import { C, r2 } from './palette'
import {
  AmethystCluster,
  Chamomile,
  FullMoon,
  Glow,
  Leaf,
  MoonPhase,
  Orchid,
  OrchidBud,
  PillarCandle,
  Pyramid,
  Rosemary,
  Roots,
  SmallFlame,
  Sparkle,
  useSvgId,
  WaterBowl,
} from './botanicals'

const INK_SOFT = '#5C6A5C'

/* ─────────────── Carta de la invocación ─────────────── */

/** Una carta de tarot botánica: triple luna, estrella de luz, nueve destellos y lemniscata. */
export function InvocationCard() {
  const star = 'M0 -40 L3 -3 L40 0 L3 3 L0 40 L-3 3 L-40 0 L-3 -3Z'
  const diag = 'M0 -22 L1.8 -1.8 L22 0 L1.8 1.8 L0 22 L-1.8 1.8 L-22 0 L-1.8 -1.8Z'
  const outer = 'M18 292 L18 72 Q18 12 100 8 Q182 12 182 72 L182 292Z'
  const inner = 'M27 283 L27 74 Q27 22 100 17 Q173 22 173 74 L173 283Z'
  const grad = useSvgId('estrella')
  return (
    <svg viewBox="0 0 200 300" className="carta-invocacion" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={grad} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F3DE9E" />
          <stop offset="1" stopColor="#A9883F" />
        </linearGradient>
      </defs>
      <path d={outer} fill="#FBF7EC" />
      <path d={inner} fill="#F3E6C2" opacity={0.35} filter="url(#acuarela)" />
      <Glow x={100} y={136} r={86} color="#F6E2AA" opacity={0.85} className="halo-respira" />
      <path d={outer} fill="none" stroke={C.goldInk} strokeWidth={1} />
      <path d={inner} fill="none" stroke={C.gold} strokeWidth={0.55} />
      {/* Triple luna */}
      <MoonPhase x={78} y={44} r={6.5} k={0.3} lit="#EAD9A6" dark="none" outline={C.gold} />
      <FullMoon x={100} y={42} r={8.5} />
      <g transform="translate(244 0) scale(-1 1)">
        <MoonPhase x={122} y={44} r={6.5} k={0.3} lit="#EAD9A6" dark="none" outline={C.gold} />
      </g>
      {/* Rayos finos y estrella */}
      <g stroke={C.gold} strokeWidth={0.4} opacity={0.5}>
        {Array.from({ length: 32 }, (_, i) => {
          const a = (i * 360) / 32
          const ra = (a * Math.PI) / 180
          const r1 = 46
          const len = i % 2 ? 58 : 68
          return <line key={i} x1={r2(100 + Math.cos(ra) * r1)} y1={r2(136 + Math.sin(ra) * r1)} x2={r2(100 + Math.cos(ra) * len)} y2={r2(136 + Math.sin(ra) * len)} />
        })}
      </g>
      <g transform="translate(100 136)">
        <path d={diag} transform="rotate(45)" fill={`url(#${grad})`} opacity={0.8} />
        <path d={star} fill={`url(#${grad})`} />
        <path d={star} fill="none" stroke={C.goldInk} strokeWidth={0.4} />
        <circle r={5} fill="#FFFDF4" />
      </g>
      {/* Las nueve luces */}
      {Array.from({ length: 9 }, (_, i) => {
        const a = ((200 + i * 17.5) * Math.PI) / 180
        return <Sparkle key={i} x={r2(100 + Math.cos(a) * 80)} y={r2(140 + Math.sin(a) * 80)} s={2.2 + i * 0.28} className={`destello d${(i % 3) + 1}`} />
      })}
      {/* Lemniscata */}
      <path d="M84 206 C84 198 96 198 100 206 C104 214 116 214 116 206 C116 198 104 198 100 206 C96 214 84 214 84 206Z" fill="none" stroke={C.goldInk} strokeWidth={0.7} />
      {/* Jardín al pie de la carta */}
      <Rosemary x={34} y={278} length={92} angle={-36} bend={-8} leaves={26} leafLength={13} seed={5} flowers={2} />
      <Rosemary x={166} y={278} length={92} angle={-144} bend={8} leaves={26} leafLength={13} seed={7} flowers={2} />
      <Chamomile x={70} y={262} size={6.5} seed={9} tilt={0.7} petals={16} />
      <Chamomile x={130} y={262} size={6.5} seed={11} tilt={0.7} petals={16} />
      <Orchid x={100} y={252} size={0.4} seed={3} />
      {[
        [27, 74],
        [173, 74],
        [27, 283],
        [173, 283],
      ].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r={2} fill={C.gold} />
      ))}
    </svg>
  )
}

/* ─────────────── Íconos de las estaciones del jardín ─────────────── */

export type StationKind =
  | 'altar'
  | 'apertura'
  | 'invocacion'
  | 'dia-1'
  | 'dia-2'
  | 'dia-3'
  | 'dia-4'
  | 'dia-5'
  | 'dia-6'
  | 'dia-7'
  | 'dia-8'
  | 'dia-9'
  | 'cierre'
  | 'florece'

function StationArt({ kind }: { kind: StationKind }): ReactNode {
  switch (kind) {
    case 'altar':
      return (
        <>
          <Pyramid x={0} y={14} w={15} h={32} />
          <Sparkle x={0} y={-19} s={3} />
        </>
      )
    case 'apertura':
      return <PillarCandle x={0} y={20} w={11} h={24} />
    case 'invocacion':
      return (
        <>
          <MoonPhase x={-11} y={-14} r={3.4} k={0.3} lit="#EAD9A6" outline={C.gold} />
          <FullMoon x={0} y={-15} r={4.4} />
          <g transform="scale(-1 1)">
            <MoonPhase x={-11} y={-14} r={3.4} k={0.3} lit="#EAD9A6" outline={C.gold} />
          </g>
          <path d="M0 -6 L1.6 4 L12 6 L1.6 8 L0 18 L-1.6 8 L-12 6 L-1.6 4Z" fill={C.gold} />
        </>
      )
    case 'dia-1':
      return (
        <>
          <path d="M-10 18 L-10 -2 A10 10 0 0 1 10 -2 L10 18Z" fill="#F6E7C2" stroke={C.goldInk} strokeWidth={0.6} />
          <Rosemary x={-15} y={20} length={34} angle={-80} bend={-4} leaves={12} leafLength={8} seed={1} />
          <Rosemary x={15} y={20} length={34} angle={-100} bend={4} leaves={12} leafLength={8} seed={2} />
        </>
      )
    case 'dia-2':
      return (
        <>
          <Rosemary x={-18} y={14} length={40} angle={-30} bend={-4} leaves={14} leafLength={9} seed={3} />
          <g transform="translate(-2 4) rotate(-30)">
            <rect x={-6} y={-4} width={12} height={8} rx={3.6} fill="#FBF8EF" stroke={INK_SOFT} strokeWidth={0.4} />
            <path d="M-2 -4.4 L0 4.4" stroke="#8E6FB5" strokeWidth={0.7} />
          </g>
        </>
      )
    case 'dia-3':
      return <AmethystCluster x={0} y={10} scale={0.45} />
    case 'dia-4':
      return <WaterBowl x={0} y={0} w={17} />
    case 'dia-5':
      return (
        <>
          <line x1={-20} y1={4} x2={20} y2={4} stroke={INK_SOFT} strokeWidth={0.4} />
          <Roots x={0} y={4} length={7} depth={3} seed={4} spread={34} />
          <Rosemary x={0} y={4} length={22} angle={-90} bend={-2} leaves={10} leafLength={7} seed={5} />
          <Rosemary x={0} y={4} length={18} angle={-125} bend={-2} leaves={8} leafLength={6} seed={6} />
          <Rosemary x={0} y={4} length={18} angle={-55} bend={2} leaves={8} leafLength={6} seed={7} />
        </>
      )
    case 'dia-6':
      return <Chamomile x={0} y={0} size={12} seed={8} tilt={0.85} />
    case 'dia-7':
      return (
        <>
          <Glow x={0} y={-2} r={22} color={C.amethystLight} opacity={0.9} />
          <circle r={16} fill="none" stroke={C.gold} strokeWidth={0.4} strokeDasharray="1 2.4" />
          <AmethystCluster x={0} y={9} scale={0.4} />
        </>
      )
    case 'dia-8':
      return <Orchid x={0} y={0} size={0.4} seed={2} />
    case 'dia-9':
      return (
        <>
          <Glow x={0} y={0} r={22} color="#F1E3BC" opacity={0.95} />
          <FullMoon x={0} y={0} r={14} />
        </>
      )
    case 'cierre':
      return (
        <>
          <PillarCandle x={0} y={20} w={11} h={24} lit={false} />
          <path d="M0 -10 C-4 -15 4 -18 -1 -24" fill="none" stroke="#B9B2A3" strokeWidth={0.6} strokeLinecap="round" />
        </>
      )
    case 'florece':
      return (
        <>
          <Orchid x={-5} y={-3} size={0.3} seed={4} />
          <Chamomile x={10} y={10} size={7} seed={9} petals={16} />
          <OrchidBud x={12} y={-12} size={0.5} rotate={40} />
        </>
      )
  }
}

export function StationIcon({ kind }: { kind: StationKind }) {
  return (
    <svg viewBox="-30 -30 60 60" className="estacion-icono" aria-hidden="true" focusable="false">
      <StationArt kind={kind} />
    </svg>
  )
}

/* ─────────────── Elementos de la transformación (Día IX) ─────────────── */

export function MomentArt({ kind }: { kind: 'ofrenda' | 'fuego' | 'luna' }) {
  return (
    <svg viewBox="0 0 120 100" className="elemento-icono" aria-hidden="true" focusable="false">
      {kind === 'ofrenda' && (
        <>
          <Glow x={60} y={52} r={44} opacity={0.55} />
          <Rosemary x={14} y={70} length={92} angle={-24} bend={-6} leaves={26} leafLength={13} seed={91} flowers={2} />
          <g transform="translate(56 50) rotate(-24)">
            <rect x={-11} y={-7} width={22} height={14} rx={6} fill="#FBF8EF" stroke={INK_SOFT} strokeWidth={0.5} />
            <path d="M-4 -7.5 L-1 7.5 M3 -7.5 L6 7.5" stroke="#8E6FB5" strokeWidth={0.8} />
          </g>
        </>
      )}
      {kind === 'fuego' && (
        <>
          <Glow x={60} y={40} r={44} color={C.flame} opacity={0.45} />
          <SmallFlame x={60} y={50} s={0.9} />
          <WaterBowl x={60} y={62} w={30} />
        </>
      )}
      {kind === 'luna' && (
        <>
          <Glow x={60} y={34} r={46} color="#F1E3BC" opacity={0.95} />
          <FullMoon x={60} y={30} r={18} />
          <Pyramid x={60} y={88} w={16} h={30} />
          <Sparkle x={22} y={22} s={3} />
          <Sparkle x={98} y={40} s={2.6} />
        </>
      )}
    </svg>
  )
}

/* ─────────────── Letra capitular botánica ─────────────── */

/** Capitular ilustrada: letra en oro con hojas de acuarela y una ramita de romero. */
export function BotanicalInitial({ letter, seed = 1 }: { letter: string; seed?: number }) {
  const grad = useSvgId('letra')
  return (
    <svg viewBox="0 0 100 100" className="capitular-botanica" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={grad} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#A88A4C" />
          <stop offset="1" stopColor="#6B5226" />
        </linearGradient>
      </defs>
      <ellipse cx={54} cy={54} rx={40} ry={36} fill="#EFE2BF" opacity={0.5} filter="url(#acuarela)" />
      <Rosemary x={12} y={88} length={98} angle={-48} bend={-10} leaves={26} leafLength={13} seed={seed} flowers={2} />
      <text x={52} y={82} textAnchor="middle" fontFamily="'Cormorant Garamond', Garamond, Georgia, serif" fontWeight={600} fontSize={88} fill={`url(#${grad})`}>
        {letter}
      </text>
      <Leaf x={20} y={92} length={22} width={6.5} angle={-118} tone={1} seed={seed + 1} />
      <Leaf x={22} y={93} length={19} width={6} angle={-72} tone={3} seed={seed + 2} />
      <Leaf x={18} y={92} length={16} width={5} angle={-150} tone={5} seed={seed + 3} />
      <Leaf x={24} y={94} length={14} width={4.6} angle={-30} tone={2} seed={seed + 4} />
      <Leaf x={86} y={20} length={13} width={4} angle={-60} tone={4} seed={seed + 5} />
      <Leaf x={86} y={20} length={11} width={3.6} angle={10} tone={0} seed={seed + 6} />
      <Sparkle x={84} y={58} s={2.6} />
    </svg>
  )
}

/* ─────────────── Emblema de la cabecera ─────────────── */

export function HeaderEmblem() {
  return (
    <svg viewBox="0 0 40 40" width="36" height="36" aria-hidden="true" focusable="false" className="emblema">
      <Glow x={20} y={18} r={18} opacity={0.8} />
      <circle cx={20} cy={7} r={3.4} fill="#F6EFDC" stroke={C.gold} strokeWidth={0.5} />
      <g fill="none" stroke={C.goldInk} strokeLinejoin="round">
        <path d="M6 32 L20 12 L34 31 L23 35Z" fill="#FBF5E4" strokeWidth={0.9} />
        <path d="M20 12 L23 35" strokeWidth={0.7} />
      </g>
      <g stroke="#5E7A5E" strokeWidth={0.9} strokeLinecap="round">
        <path d="M3 35 Q9 33 14 36" fill="none" />
        <path d="M6 34 l-1.6 -2.4 M9 33.6 l-0.6 -2.8 M12 34.6 l0.6 -2.6" />
      </g>
    </svg>
  )
}
