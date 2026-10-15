/**
 * Emblemas: carta de la invocación, íconos del jardín, elementos de la
 * transformación (Día IX), letras capitulares y emblema de la cabecera.
 */
import type { ReactNode } from 'react'
import { C, r2 } from './palette'
import {
  AmethystCluster,
  Chamomile,
  ChamomileLeaf,
  FullMoon,
  Glow,
  Leaf,
  MoonPhase,
  Orchid,
  OrchidLeaf,
  OrchidSpray,
  OpenHand,
  PillarCandle,
  Pyramid,
  Rosemary,
  Roots,
  SmallFlame,
  smoothPath,
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
  | 'despedida'

/** Hoyo del jardín: tierra húmeda con un borde de hierbas. */
function GardenBed({ seed = 1 }: { seed?: number }) {
  const rim = smoothPath([
    [-29, 2],
    [-26, -16],
    [-12, -28],
    [6, -29],
    [22, -22],
    [30, -6],
    [28, 12],
    [16, 26],
    [-4, 29],
    [-20, 23],
    [-29, 2],
  ])
  return (
    <g>
      <path d={rim} fill="#FBF6EA" filter="url(#acuarela)" />
      <path d={rim} fill="none" stroke="#C9B994" strokeWidth={0.5} opacity={0.8} />
      <ellipse cx={0} cy={19} rx={21} ry={5.5} fill="#B9A27A" opacity={0.55} filter="url(#acuarela)" />
      <path d="M-20 19 Q0 15 20 19" fill="none" stroke="#7E6A4A" strokeWidth={0.45} opacity={0.7} />
      <g stroke="#6E8A68" strokeWidth={0.55} strokeLinecap="round" fill="none">
        {[-22, -17, 15, 20].map((gx, i) => (
          <path key={gx} d={`M${gx} 20 q${i % 2 ? 1 : -1} -4 ${i % 2 ? 3 : -2} -6 M${gx + 1} 20 q0 -3 1 -5`} />
        ))}
      </g>
      <Leaf x={-24} y={14} length={7} width={2.4} angle={-140 + seed} tone={2} seed={seed} />
      <Leaf x={24} y={13} length={6} width={2.2} angle={-40 - seed} tone={4} seed={seed + 3} />
    </g>
  )
}

function StationArt({ kind }: { kind: StationKind }): ReactNode {
  switch (kind) {
    case 'apertura':
      return (
        <>
          <Glow x={0} y={-6} r={22} color={C.flame} opacity={0.4} />
          <PillarCandle x={0} y={19} w={11} h={24} />
          <Rosemary x={-18} y={20} length={30} angle={-12} bend={-3} leaves={12} leafLength={7} seed={2} />
        </>
      )
    case 'invocacion':
      return (
        <>
          <Glow x={0} y={-4} r={22} color="#F3E3B6" opacity={0.9} />
          <MoonPhase x={-12} y={-12} r={3.6} k={0.3} lit="#EAD9A6" outline={C.gold} />
          <FullMoon x={0} y={-14} r={5} />
          <g transform="scale(-1 1)">
            <MoonPhase x={-12} y={-12} r={3.6} k={0.3} lit="#EAD9A6" outline={C.gold} />
          </g>
          <Sparkle x={0} y={4} s={6} />
          <Sparkle x={-12} y={8} s={2.4} />
          <Sparkle x={12} y={6} s={2.8} />
          <Rosemary x={-16} y={19} length={32} angle={-8} bend={-3} leaves={12} leafLength={6} seed={4} />
        </>
      )
    case 'dia-1':
      return (
        <>
          <Glow x={0} y={4} r={18} opacity={0.8} />
          <path d="M-9 19 L-9 0 A9 9 0 0 1 9 0 L9 19Z" fill="#F8EBC8" />
          <path d="M-9 19 L-9 0 A9 9 0 0 1 9 0 L9 19" fill="none" stroke={C.goldInk} strokeWidth={0.55} />
          <Sparkle x={0} y={4} s={2.6} />
          <Rosemary x={-14} y={20} length={36} angle={-78} bend={-4} leaves={14} leafLength={8} seed={1} />
          <Rosemary x={14} y={20} length={36} angle={-102} bend={4} leaves={14} leafLength={8} seed={2} />
        </>
      )
    case 'dia-2':
      return (
        <>
          <g transform="rotate(-8)">
            <path d="M-12 -14 L12 -14 L12 6 Q10 10 6 9 L-12 9Z" fill="#FBF8EF" stroke={INK_SOFT} strokeWidth={0.4} />
            <path d="M-9 -9 q4 -1.5 8 0 t8 0 M-9 -5 q4 -1.5 8 0 t6 0 M-9 -1 q4 -1.5 8 0 t8 0" fill="none" stroke="#8E6FB5" strokeWidth={0.35} />
          </g>
          <Rosemary x={-20} y={17} length={42} angle={-28} bend={-4} leaves={16} leafLength={8} seed={3} />
          <g transform="translate(-5 6) rotate(-28)">
            <rect x={-4} y={-3} width={8} height={6} rx={2.6} fill="#FBF8EF" stroke={INK_SOFT} strokeWidth={0.35} />
            <path d="M-1 -3.3 L0.6 3.3" stroke="#8E6FB5" strokeWidth={0.6} />
          </g>
        </>
      )
    case 'dia-3':
      return (
        <>
          <Glow x={0} y={2} r={20} color={C.amethystLight} opacity={0.8} />
          <OpenHand x={8} y={21} scale={0.36} />
          <OpenHand x={-8} y={21} scale={0.36} mirror />
          <AmethystCluster x={0} y={8} scale={0.26} />
        </>
      )
    case 'dia-4':
      return (
        <>
          <polygon points="4,-24 14,-24 2,14 -14,14" fill={C.goldLight} opacity={0.35} filter="url(#acuarela)" />
          <WaterBowl x={-2} y={4} w={15} />
          <Leaf x={14} y={16} length={9} width={3} angle={-50} tone={1} seed={6} />
          <Sparkle x={0} y={4} s={2.4} fill="#FFFFFF" />
        </>
      )
    case 'dia-5':
      return (
        <>
          <Roots x={0} y={16} length={5} depth={3} seed={4} spread={34} />
          <Rosemary x={0} y={16} length={30} angle={-90} bend={-2} leaves={14} leafLength={7} seed={5} />
          <Rosemary x={0} y={16} length={22} angle={-124} bend={-2} leaves={10} leafLength={6} seed={6} />
          <Rosemary x={0} y={16} length={22} angle={-56} bend={2} leaves={10} leafLength={6} seed={7} />
        </>
      )
    case 'dia-6':
      return (
        <>
          <Glow x={0} y={-6} r={22} color="#F6DFA6" opacity={0.7} />
          <g fill="none" stroke={INK_SOFT} strokeWidth={0.45}>
            <path d="M-2 19 Q-6 4 -9 -6" />
            <path d="M0 19 Q2 4 6 -10" />
            <path d="M2 19 Q8 10 13 4" />
          </g>
          <ChamomileLeaf x={0} y={17} length={12} angle={-150} seed={2} />
          <Chamomile x={-9} y={-7} size={7.5} seed={3} tilt={0.8} petals={18} />
          <Chamomile x={6} y={-11} size={8.5} seed={5} tilt={0.85} petals={18} />
          <Chamomile x={13} y={3} size={6} seed={7} tilt={0.7} petals={16} />
        </>
      )
    case 'dia-7':
      return (
        <>
          <Glow x={0} y={-2} r={24} color={C.amethystLight} opacity={0.95} />
          <Glow x={0} y={-2} r={12} color="#FFF6DE" opacity={0.95} />
          <AmethystCluster x={0} y={14} scale={0.4} />
          <Sparkle x={-14} y={-14} s={2.6} />
          <Sparkle x={15} y={-8} s={2.2} />
          <Sparkle x={2} y={-22} s={3} />
        </>
      )
    case 'dia-8':
      return (
        <>
          <OrchidLeaf x={0} y={18} length={22} width={7} angle={-165} seed={2} />
          <OrchidLeaf x={0} y={18} length={20} width={7} angle={-18} seed={3} />
          <OrchidSpray
            points={[
              [0, 17],
              [-2, 0],
              [4, -14],
              [14, -20],
            ]}
            flowers={[
              { at: [-3, -2], size: 0.24, rotate: -8, seed: 2 },
              { at: [6, -15], size: 0.22, rotate: 10, seed: 3 },
            ]}
            buds={[{ at: [14, -20], size: 0.35, rotate: 70 }]}
          />
        </>
      )
    case 'dia-9':
      return (
        <>
          <Glow x={0} y={-8} r={22} color="#F1E3BC" opacity={0.95} />
          <FullMoon x={0} y={-8} r={11} />
          <SmallFlame x={-12} y={18} s={0.3} />
          <Rosemary x={-4} y={19} length={26} angle={-14} bend={-3} leaves={12} leafLength={6} seed={9} />
          <Sparkle x={15} y={-18} s={2.2} />
        </>
      )
    case 'cierre':
      return (
        <>
          <PillarCandle x={0} y={19} w={11} h={24} lit={false} />
          <path d="M0 -10 C-4 -15 4 -18 -1 -24 C-3 -27 1 -29 0 -31" fill="none" stroke="#B9B2A3" strokeWidth={0.6} strokeLinecap="round" />
          <Rosemary x={-18} y={20} length={30} angle={-10} bend={-3} leaves={12} leafLength={7} seed={11} />
        </>
      )
    case 'florece':
      return (
        <>
          <Glow x={0} y={-4} r={22} color="#F6E3B0" opacity={0.6} />
          <ChamomileLeaf x={6} y={18} length={12} angle={-60} seed={4} />
          <OrchidSpray points={[[-6, 18], [-6, 4], [-2, -8]]} flowers={[{ at: [-6, -2], size: 0.26, rotate: -6, seed: 4 }]} buds={[{ at: [-2, -10], size: 0.36, rotate: 30 }]} />
          <Chamomile x={10} y={2} size={6.5} seed={9} petals={16} />
          <Chamomile x={14} y={-10} size={4.6} seed={11} petals={14} tilt={0.7} />
        </>
      )
    case 'despedida':
      return (
        <>
          <Glow x={0} y={-6} r={26} color="#F6E2AA" opacity={0.95} />
          <Pyramid x={0} y={16} w={11} h={24} />
          <Sparkle x={0} y={-12} s={4} />
          <Chamomile x={-15} y={14} size={5} seed={5} petals={14} tilt={0.7} />
          <Chamomile x={15} y={15} size={4.4} seed={7} petals={14} tilt={0.7} />
          <Orchid x={-13} y={-14} size={0.18} seed={2} />
        </>
      )
  }
}

export function StationIcon({ kind }: { kind: StationKind }) {
  return (
    <svg viewBox="-32 -32 64 64" className="estacion-icono" aria-hidden="true" focusable="false">
      <GardenBed seed={kind.length} />
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
