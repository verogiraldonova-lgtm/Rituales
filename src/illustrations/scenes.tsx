/**
 * Escenas ilustradas: portada, láminas de cada jornada y de las páginas especiales.
 * Estilo: tinta fina sobre aguadas de acuarela.
 */
import type { ReactNode } from 'react'
import type { IllustrationKey } from '../content/types'
import { C, r2, seeded } from './palette'
import {
  AerialRoot,
  AmethystCluster,
  OpenHand,
  Chamomile,
  ChamomileLeaf,
  FullMoon,
  Glow,
  Leaf,
  OrchidLeaf,
  OrchidSpray,
  PillarCandle,
  Pyramid,
  Rosemary,
  Roots,
  smoothPath,
  Sparkle,
  useSvgId,
  WaterBowl,
} from './botanicals'

const INK = '#34443A'
const INK_SOFT = '#5C6A5C'

function Frame({ children, viewBox = '0 0 320 240', className = '' }: { children: ReactNode; viewBox?: string; className?: string }) {
  return (
    <svg viewBox={viewBox} className={`lamina ${className}`} aria-hidden="true" focusable="false" role="presentation">
      {children}
    </svg>
  )
}

/** Mancha de aguada de fondo, como papel teñido. */
function Wash({ x, y, rx, ry, color, opacity = 0.35 }: { x: number; y: number; rx: number; ry: number; color: string; opacity?: number }) {
  return <ellipse cx={x} cy={y} rx={rx} ry={ry} fill={color} opacity={opacity} filter="url(#acuarela)" />
}

function Rays({ x, y, from, to, count, start, end, opacity = 0.4 }: { x: number; y: number; from: number; to: number; count: number; start: number; end: number; opacity?: number }) {
  return (
    <g stroke={C.gold} strokeWidth={0.45} opacity={opacity} strokeLinecap="round">
      {Array.from({ length: count }, (_, i) => {
        const a = ((start + ((end - start) * i) / (count - 1)) * Math.PI) / 180
        const long = i % 2 === 0 ? to : to * 0.82
        return <line key={i} x1={r2(x + Math.cos(a) * from)} y1={r2(y + Math.sin(a) * from)} x2={r2(x + Math.cos(a) * long)} y2={r2(y + Math.sin(a) * long)} />
      })}
    </g>
  )
}

/* ─────────────── Portada: la pirámide en el jardín ─────────────── */

export function CoverIllustration() {
  return (
    <Frame viewBox="0 0 400 360" className="lamina-portada">
      <Glow x={200} y={130} r={185} color={C.goldLight} opacity={0.7} className="halo-respira" />
      <Glow x={200} y={92} r={70} color="#FFF6DD" opacity={0.95} />
      <Rays x={200} y={92} from={22} to={120} count={15} start={-165} end={-15} opacity={0.35} />
      <FullMoon x={200} y={36} r={13} />
      <Wash x={200} y={300} rx={170} ry={26} color="#D9CDAE" opacity={0.45} />
      <Pyramid x={200} y={276} w={82} h={184} />
      {/* Orquídea que abraza la pirámide */}
      <OrchidSpray
        points={[
          [92, 318],
          [74, 262],
          [80, 196],
          [108, 140],
          [150, 104],
          [178, 96],
        ]}
        flowers={[
          { at: [78, 236], size: 0.68, rotate: -12, seed: 1 },
          { at: [88, 176], size: 0.78, rotate: -6, seed: 2 },
          { at: [122, 126], size: 0.7, rotate: 8, seed: 3 },
        ]}
        buds={[
          { at: [156, 103], size: 0.85, rotate: 70 },
          { at: [176, 97], size: 0.7, rotate: 84 },
        ]}
      />
      <OrchidLeaf x={94} y={318} length={70} width={22} angle={-162} seed={3} />
      <OrchidLeaf x={98} y={320} length={58} width={18} angle={-30} seed={5} />
      {/* Romero que sube por la derecha */}
      <Rosemary x={300} y={318} length={160} angle={-80} bend={16} leaves={44} leafLength={22} seed={11} flowers={4} />
      <Rosemary x={312} y={320} length={118} angle={-58} bend={10} leaves={34} leafLength={19} seed={21} flowers={2} />
      <Rosemary x={292} y={320} length={92} angle={-108} bend={-8} leaves={26} leafLength={17} seed={23} />
      {/* Ofrenda al pie */}
      <Rosemary x={128} y={330} length={150} angle={-6} bend={-8} leaves={36} leafLength={17} seed={31} flowers={2} />
      <ChamomileLeaf x={250} y={330} length={34} angle={-150} seed={4} />
      <Chamomile x={244} y={316} size={13} rotate={-10} seed={5} />
      <Chamomile x={268} y={326} size={10} rotate={14} seed={7} tilt={0.7} />
      <Sparkle x={128} y={74} s={5} className="destello d1" />
      <Sparkle x={292} y={60} s={4} className="destello d2" />
      <Sparkle x={248} y={170} s={4.5} className="destello d3" />
      <Sparkle x={52} y={140} s={3.2} className="destello d2" />
      <Sparkle x={356} y={130} s={3.5} className="destello d1" />
    </Frame>
  )
}

/* ─────────────── I. Romero y umbral iluminado ─────────────── */

function Umbral() {
  const id = useSvgId('umbral')
  const cx = 160
  const spring = 104
  return (
    <Frame>
      <defs>
        <radialGradient id={id} cx="0.5" cy="0.65" r="0.7">
          <stop offset="0" stopColor="#FFFAEA" />
          <stop offset="0.6" stopColor="#F6E7C2" />
          <stop offset="1" stopColor="#E6CF98" />
        </radialGradient>
      </defs>
      <Glow x={cx} y={140} r={140} opacity={0.5} className="halo-respira" />
      <Wash x={cx} y={214} rx={140} ry={20} color="#DCCFAF" opacity={0.5} />
      {/* Luz que cae sobre el suelo */}
      <polygon points="124,200 196,200 262,238 58,238" fill={C.goldLight} opacity={0.3} filter="url(#acuarela)" />
      <g stroke={C.gold} strokeWidth={0.4} opacity={0.4}>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <line key={i} x1={cx} y1={158} x2={70 + i * 30} y2={238} />
        ))}
        <line x1={84} y1={218} x2={236} y2={218} />
        <line x1={68} y1={230} x2={252} y2={230} />
      </g>
      {/* Puerta */}
      <path d={`M124 200 L124 ${spring} A36 36 0 0 1 196 ${spring} L196 200Z`} fill={`url(#${id})`} />
      <path d={`M112 200 L112 ${spring} A48 48 0 0 1 208 ${spring} L208 200 L196 200 L196 ${spring} A36 36 0 0 0 124 ${spring} L124 200Z`} fill="#EFE5CF" filter="url(#acuarela)" />
      <g fill="none" stroke={C.goldInk} strokeWidth={0.7}>
        <path d={`M124 200 L124 ${spring} A36 36 0 0 1 196 ${spring} L196 200`} />
        <path d={`M112 200 L112 ${spring} A48 48 0 0 1 208 ${spring} L208 200`} />
      </g>
      <g stroke={C.goldInk} strokeWidth={0.4} opacity={0.7}>
        {Array.from({ length: 11 }, (_, i) => {
          const a = Math.PI + (Math.PI * (i + 1)) / 12
          return <line key={i} x1={r2(cx + Math.cos(a) * 36)} y1={r2(spring + Math.sin(a) * 36)} x2={r2(cx + Math.cos(a) * 48)} y2={r2(spring + Math.sin(a) * 48)} />
        })}
        {[120, 140, 160, 180].map((yy) => (
          <g key={yy}>
            <line x1={112} y1={yy} x2={124} y2={yy} />
            <line x1={196} y1={yy} x2={208} y2={yy} />
          </g>
        ))}
      </g>
      <path d="M100 200 L220 200 L226 206 L94 206Z" fill="#E9DDC2" stroke={C.goldInk} strokeWidth={0.5} />
      <Sparkle x={cx} y={118} s={7} className="destello d1" />
      <Sparkle x={144} y={150} s={3.5} className="destello d2" />
      <Sparkle x={178} y={166} s={3} className="destello d3" />
      {/* Romero a ambos lados */}
      <Rosemary x={74} y={214} length={150} angle={-78} bend={-12} leaves={38} leafLength={20} seed={4} flowers={3} />
      <Rosemary x={88} y={214} length={100} angle={-60} bend={10} leaves={28} leafLength={17} seed={8} />
      <Rosemary x={62} y={216} length={84} angle={-104} bend={-8} leaves={22} leafLength={15} seed={10} />
      <Rosemary x={246} y={214} length={150} angle={-102} bend={12} leaves={38} leafLength={20} seed={6} flowers={3} />
      <Rosemary x={232} y={214} length={100} angle={-120} bend={-10} leaves={28} leafLength={17} seed={12} />
      <Rosemary x={258} y={216} length={84} angle={-76} bend={8} leaves={22} leafLength={15} seed={14} />
      <Leaf x={140} y={224} length={9} width={3} angle={-20} tone={2} seed={3} />
      <Leaf x={186} y={228} length={8} width={3} angle={200} tone={3} seed={5} />
    </Frame>
  )
}

/* ─────────────── II. Romero y papel manuscrito ─────────────── */

function Memoria() {
  const rnd = seeded(77)
  const lines: ReactNode[] = []
  for (let i = 0; i < 8; i++) {
    const y = 72 + i * 13
    const end = i === 7 ? 150 : 218 - rnd() * 22
    const pts: [number, number][] = []
    for (let xx = 98; xx <= end; xx += 3.2) {
      pts.push([xx, y + Math.sin(xx * 0.9 + i) * (1.2 + rnd() * 1.8) - (rnd() > 0.88 ? 2.8 : 0)])
    }
    lines.push(<path key={i} d={smoothPath(pts)} fill="none" stroke="#6E5C8C" strokeWidth={0.6} opacity={0.65} strokeLinecap="round" />)
  }
  return (
    <Frame>
      <Glow x={160} y={120} r={130} opacity={0.45} />
      <Wash x={160} y={132} rx={120} ry={70} color="#E3D7BB" opacity={0.3} />
      <g transform="rotate(-6 160 120)">
        <path d="M84 50 L238 50 L238 180 Q228 196 206 190 L84 190Z" fill="#FBF8EF" />
        <path d="M84 50 L238 50 L238 180 Q228 196 206 190 L84 190Z" fill="#E9DDC2" opacity={0.35} filter="url(#acuarela)" />
        <path d="M84 50 L238 50 L238 180 Q228 196 206 190 L84 190Z" fill="none" stroke={INK_SOFT} strokeWidth={0.6} />
        <path d="M238 180 Q222 178 206 190 Q218 186 222 176Z" fill="#E7DAC0" stroke={INK_SOFT} strokeWidth={0.5} />
        <text x={98} y={63} fontFamily="'Cormorant Garamond', Georgia, serif" fontStyle="italic" fontSize={10} fill="#6E5C8C" opacity={0.85}>
          Gracias, Alejo, por…
        </text>
        {lines}
      </g>
      {/* Lápiz violeta */}
      <g transform="translate(206 208) rotate(-26)">
        <rect x={0} y={-3.6} width={80} height={7.2} rx={1} fill="#9A86B6" filter="url(#acuarela)" />
        <rect x={0} y={-3.6} width={80} height={7.2} rx={1} fill="none" stroke="#4A3E63" strokeWidth={0.45} />
        <line x1={0} y1={-1.2} x2={80} y2={-1.2} stroke="#C8BADC" strokeWidth={0.6} />
        <polygon points="0,-3.6 -12,0 0,3.6" fill="#EAD9B6" stroke="#4A3E63" strokeWidth={0.4} />
        <polygon points="-8,-1.2 -12,0 -8,1.2" fill="#4A3E63" />
        <rect x={76} y={-3.6} width={7} height={7.2} fill={C.goldLight} stroke="#4A3E63" strokeWidth={0.4} />
      </g>
      {/* Ramita de romero envuelta con hilo violeta */}
      <Rosemary x={40} y={202} length={200} angle={-36} bend={-14} leaves={46} leafLength={19} seed={14} flowers={3} />
      <g transform="translate(78 175) rotate(-36)">
        <rect x={-10} y={-6} width={20} height={12} rx={5} fill="#FBF8EF" stroke={INK_SOFT} strokeWidth={0.5} />
        <path d="M-4 -6.5 L-1 6.5 M2 -6.5 L5 6.5" stroke="#8E6FB5" strokeWidth={0.8} />
      </g>
      <Sparkle x={252} y={64} s={4.5} className="destello d2" />
    </Frame>
  )
}

/* ─────────────── III. Amatista entre manos abiertas ─────────────── */

function Manos() {
  return (
    <Frame>
      <Glow x={160} y={128} r={128} color={C.amethystLight} opacity={0.55} className="halo-respira" />
      <Glow x={160} y={140} r={62} color="#FFF5DE" opacity={0.85} />
      <Rays x={160} y={130} from={40} to={96} count={11} start={-160} end={-20} opacity={0.35} />
      <Rosemary x={52} y={226} length={110} angle={-30} bend={-8} leaves={28} leafLength={16} seed={81} flowers={2} />
      <Rosemary x={268} y={226} length={110} angle={-150} bend={8} leaves={28} leafLength={16} seed={83} flowers={2} />
      <OpenHand x={186} y={232} scale={1.38} />
      <OpenHand x={134} y={232} scale={1.38} mirror />
      <g stroke={INK_SOFT} strokeWidth={0.5} fill="none" opacity={0.7}>
        <path d="M110 232 Q134 236 158 232 M162 232 Q186 236 210 232" />
      </g>
      <AmethystCluster x={160} y={168} scale={0.95} />
      <Sparkle x={126} y={70} s={4} className="destello d1" />
      <Sparkle x={198} y={60} s={5} className="destello d3" />
      <Sparkle x={160} y={104} s={3.5} className="destello d2" />
    </Frame>
  )
}

/* ─────────────── IV. Cuenco con agua y luz de ventana ─────────────── */

function Casa() {
  return (
    <Frame>
      <Glow x={226} y={70} r={110} opacity={0.5} />
      {/* Ventana con cortina */}
      <path d="M196 122 L196 52 A34 34 0 0 1 264 52 L264 122Z" fill="#FFF8E8" />
      <path d="M196 122 L196 52 A34 34 0 0 1 264 52 L264 122Z" fill="#F4E3B8" opacity={0.5} filter="url(#acuarela)" />
      <path d="M230 18 L230 122 M196 78 L264 78 M196 100 L264 100" stroke={C.goldInk} strokeWidth={0.6} />
      <path d="M196 122 L196 52 A34 34 0 0 1 264 52 L264 122Z" fill="none" stroke={C.goldInk} strokeWidth={0.9} />
      <path d="M188 128 L272 128 L268 122 L192 122Z" fill="#EADDC0" stroke={C.goldInk} strokeWidth={0.6} />
      <path d="M266 20 Q258 60 276 128 L290 128 Q276 70 286 22Z" fill="#E8E2D0" opacity={0.85} filter="url(#acuarela)" />
      <path d="M266 20 Q258 60 276 128 M286 22 Q276 70 290 128 M272 30 Q268 80 282 126" fill="none" stroke={INK_SOFT} strokeWidth={0.45} />
      {/* Haz de luz */}
      <polygon points="200,122 262,122 172,206 60,206" fill={C.goldLight} opacity={0.28} filter="url(#acuarela)" />
      <polygon points="214,122 248,122 142,206 96,206" fill="#FFF3D6" opacity={0.55} />
      {/* Repisa y cuenco */}
      <path d="M30 206 L290 206" stroke={INK_SOFT} strokeWidth={0.6} />
      <Wash x={160} y={214} rx={140} ry={10} color="#D9CBA8" opacity={0.45} />
      <WaterBowl x={112} y={174} w={46} />
      <Sparkle x={124} y={173} s={4} fill="#FFFFFF" opacity={0.95} className="destello d2" />
      <Rosemary x={186} y={204} length={96} angle={-10} bend={-6} leaves={26} leafLength={14} seed={41} flowers={2} />
      <Leaf x={58} y={200} length={10} width={3.4} angle={-30} tone={1} seed={8} />
      <Sparkle x={240} y={40} s={4} className="destello d1" />
    </Frame>
  )
}

/* ─────────────── V. Raíces y romero ─────────────── */

function Raices() {
  const id = useSvgId('tierra')
  const rnd = seeded(5)
  return (
    <Frame>
      <defs>
        <radialGradient id={id} cx="0.5" cy="0" r="0.8">
          <stop offset="0" stopColor="#CDBC97" stopOpacity={0.65} />
          <stop offset="1" stopColor="#CDBC97" stopOpacity={0} />
        </radialGradient>
      </defs>
      <Glow x={160} y={64} r={110} opacity={0.5} />
      <rect x={10} y={128} width={300} height={112} fill={`url(#${id})`} filter="url(#acuarela)" />
      <path d="M36 128 Q100 123 160 128 T284 128" fill="none" stroke={INK_SOFT} strokeWidth={0.7} />
      {Array.from({ length: 14 }, (_, i) => (
        <ellipse key={i} cx={r2(40 + rnd() * 240)} cy={r2(140 + rnd() * 80)} rx={r2(2 + rnd() * 3)} ry={r2(1.4 + rnd() * 1.6)} fill="#D8CCAF" stroke={INK_SOFT} strokeWidth={0.3} opacity={0.7} />
      ))}
      <Roots x={160} y={128} length={30} depth={5} seed={19} spread={34} />
      <Roots x={150} y={129} length={22} depth={4} seed={23} spread={30} angle={115} />
      <Roots x={170} y={129} length={22} depth={4} seed={29} spread={30} angle={65} />
      <Rosemary x={160} y={130} length={112} angle={-90} bend={-6} leaves={34} leafLength={18} seed={51} flowers={3} />
      <Rosemary x={156} y={130} length={92} angle={-118} bend={-10} leaves={28} leafLength={16} seed={53} flowers={1} />
      <Rosemary x={164} y={130} length={96} angle={-62} bend={10} leaves={28} leafLength={16} seed={55} flowers={1} />
      <Rosemary x={158} y={130} length={64} angle={-146} bend={-6} leaves={18} leafLength={13} seed={57} />
      <Rosemary x={162} y={130} length={66} angle={-34} bend={6} leaves={18} leafLength={13} seed={59} />
      <Sparkle x={84} y={176} s={3} fill={C.goldInk} opacity={0.5} className="destello d1" />
      <Sparkle x={240} y={194} s={3} fill={C.goldInk} opacity={0.5} className="destello d3" />
    </Frame>
  )
}

/* ─────────────── VI. Manzanilla y luz de mañana ─────────────── */

function Teacup({ x, y }: { x: number; y: number }) {
  const id = useSvgId('te')
  return (
    <g transform={`translate(${x} ${y})`}>
      <defs>
        <radialGradient id={id} cx="0.45" cy="0.45" r="0.6">
          <stop offset="0" stopColor="#F3DC9C" />
          <stop offset="1" stopColor="#D9AE57" />
        </radialGradient>
      </defs>
      <ellipse cx={0} cy={14} rx={34} ry={6} fill="#EFE7D6" stroke={INK_SOFT} strokeWidth={0.5} />
      <path d="M-24 -10 Q-23 12 0 13 Q23 12 24 -10Z" fill="#FBF7EE" stroke={INK_SOFT} strokeWidth={0.55} />
      <path d="M-24 -10 Q-23 12 0 13 Q23 12 24 -10Z" fill="#E7DCC4" opacity={0.4} filter="url(#acuarela)" />
      <path d="M23 -4 q12 -2 10 8 q-2 7 -12 5" fill="none" stroke={INK_SOFT} strokeWidth={0.6} />
      <ellipse cx={0} cy={-10} rx={24} ry={4.5} fill={`url(#${id})`} stroke={INK_SOFT} strokeWidth={0.5} />
      <g fill="none" stroke={INK_SOFT} strokeWidth={0.45} opacity={0.55} strokeLinecap="round" className="vapor">
        <path d="M-8 -16 C-14 -24 -2 -28 -8 -38 C-12 -44 -6 -48 -8 -54" />
        <path d="M4 -17 C-2 -26 10 -30 4 -40 C1 -46 6 -50 4 -56" />
      </g>
      <Chamomile x={-6} y={-10} size={5} tilt={0.4} seed={41} petals={14} />
    </g>
  )
}

function Alegria() {
  return (
    <Frame>
      <Glow x={160} y={170} r={160} color="#F6DFA6" opacity={0.6} className="halo-respira" />
      <Rays x={160} y={170} from={46} to={142} count={15} start={-174} end={-6} opacity={0.4} />
      <path d="M116 170 A44 44 0 0 1 204 170Z" fill="#FBE3A6" filter="url(#acuarela)" />
      <path d="M116 170 A44 44 0 0 1 204 170" fill="none" stroke={C.goldInk} strokeWidth={0.6} />
      <line x1="20" y1="170" x2="300" y2="170" stroke={INK_SOFT} strokeWidth={0.5} opacity={0.6} />
      {/* Ramo de manzanilla */}
      <g fill="none" strokeLinecap="round">
        {['M98 238 Q94 170 82 112', 'M112 238 Q120 176 134 86', 'M124 238 Q140 190 176 130', 'M86 238 Q76 196 54 158', 'M104 238 Q104 200 108 150'].map((d) => (
          <g key={d}>
            <path d={d} stroke="#93A985" strokeWidth={1.8} filter="url(#acuarela)" />
            <path d={d} stroke={INK} strokeWidth={0.5} />
          </g>
        ))}
      </g>
      <ChamomileLeaf x={98} y={214} length={40} angle={-134} seed={2} />
      <ChamomileLeaf x={114} y={206} length={36} angle={-52} seed={4} />
      <ChamomileLeaf x={92} y={226} length={30} angle={-160} seed={6} />
      <Chamomile x={82} y={110} size={16} rotate={-12} seed={3} />
      <Chamomile x={134} y={84} size={19} rotate={8} seed={5} />
      <Chamomile x={176} y={128} size={15} rotate={-4} seed={7} tilt={0.72} />
      <Chamomile x={54} y={156} size={12} rotate={-20} seed={11} tilt={0.66} />
      <Chamomile x={108} y={148} size={11} rotate={10} seed={13} tilt={0.6} />
      <Teacup x={240} y={208} />
      <Sparkle x={190} y={70} s={4.5} className="destello d1" />
      <Sparkle x={280} y={110} s={3.5} className="destello d2" />
    </Frame>
  )
}

/* ─────────────── VII. Amatista y resplandor interior ─────────────── */

function Mujer() {
  return (
    <Frame>
      <Glow x={160} y={126} r={140} color={C.amethystLight} opacity={0.6} className="halo-respira" />
      <Glow x={160} y={122} r={72} color="#FFF4DA" opacity={0.95} />
      {[46, 64, 84].map((r, i) => (
        <circle key={r} cx={160} cy={126} r={r} fill="none" stroke={C.gold} strokeWidth={0.5} opacity={0.5 - i * 0.12} strokeDasharray={i === 1 ? '1 3' : undefined} />
      ))}
      <Rays x={160} y={126} from={90} to={116} count={36} start={0} end={350} opacity={0.45} />
      <AmethystCluster x={160} y={168} scale={1.45} />
      <OrchidSpray
        points={[
          [262, 222],
          [270, 186],
          [258, 150],
          [236, 124],
        ]}
        flowers={[
          { at: [266, 182], size: 0.42, rotate: 10, seed: 4 },
          { at: [252, 144], size: 0.38, rotate: -12, seed: 6 },
        ]}
        buds={[{ at: [236, 124], size: 0.55, rotate: -60 }]}
      />
      <Rosemary x={46} y={222} length={96} angle={-34} bend={-6} leaves={26} leafLength={14} seed={61} flowers={2} />
      <Sparkle x={160} y={52} s={6} className="destello d1" />
      <Sparkle x={108} y={96} s={3.5} className="destello d2" />
      <Sparkle x={214} y={84} s={4} className="destello d3" />
    </Frame>
  )
}

/* ─────────────── VIII. Orquídea blanca viva ─────────────── */

function Jardin() {
  return (
    <Frame>
      <Glow x={184} y={88} r={130} opacity={0.5} />
      <Wash x={160} y={232} rx={90} ry={8} color="#D9CBA8" opacity={0.5} />
      {/* Maceta */}
      <path d="M120 196 L127 232 L193 232 L200 196Z" fill="#E9DDC4" filter="url(#acuarela)" />
      <path d="M120 196 L127 232 L193 232 L200 196Z" fill="none" stroke={INK_SOFT} strokeWidth={0.6} />
      <g stroke={INK_SOFT} strokeWidth={0.3} opacity={0.6}>
        {[184, 188, 192, 196].map((xx) => (
          <line key={xx} x1={xx} y1={200} x2={xx - 2} y2={230} />
        ))}
      </g>
      <path d="M116 190 L204 190 L204 198 L116 198Z" fill="#E2D3B4" stroke={INK_SOFT} strokeWidth={0.6} />
      <AerialRoot d="M148 188 Q132 196 130 216" />
      <AerialRoot d="M172 188 Q192 194 198 210 Q200 218 194 224" />
      <OrchidLeaf x={160} y={188} length={98} width={26} angle={-170} seed={1} />
      <OrchidLeaf x={160} y={188} length={92} width={25} angle={-12} seed={2} />
      <OrchidLeaf x={160} y={186} length={64} width={20} angle={-132} seed={4} />
      <OrchidSpray
        points={[
          [160, 186],
          [158, 140],
          [168, 90],
          [196, 56],
          [236, 38],
          [270, 44],
        ]}
        flowers={[
          { at: [160, 130], size: 0.6, rotate: -10, seed: 1 },
          { at: [176, 82], size: 0.66, rotate: 4, seed: 2 },
          { at: [222, 46], size: 0.58, rotate: 12, seed: 3 },
        ]}
        buds={[
          { at: [256, 39], size: 0.85, rotate: 74 },
          { at: [270, 44], size: 0.7, rotate: 96 },
        ]}
      />
      <Sparkle x={96} y={68} s={4} className="destello d2" />
      <Sparkle x={272} y={110} s={3.5} className="destello d1" />
    </Frame>
  )
}

/* ─────────────── IX. Luna llena, romero, fuego y agua ─────────────── */

export function Luna({ className = '' }: { className?: string }) {
  return (
    <Frame className={className}>
      <g className="luna-resplandor">
        <Glow x={160} y={76} r={150} color="#F1E3BC" opacity={0.9} />
      </g>
      <Glow x={160} y={76} r={70} color="#FFFBEE" opacity={0.9} />
      <FullMoon x={160} y={76} r={42} />
      <g fill="none" stroke={C.gold} strokeWidth={0.5} opacity={0.55} strokeLinecap="round">
        <path d="M70 108 Q96 100 120 108 T170 110" />
        <path d="M182 46 Q212 38 236 46 T272 44" />
      </g>
      <Sparkle x={70} y={40} s={3.5} className="destello d1" />
      <Sparkle x={254} y={28} s={4.5} className="destello d3" />
      <Sparkle x={276} y={96} s={3} className="destello d2" />
      <Sparkle x={44} y={120} s={2.6} className="destello d3" />
      <Wash x={160} y={214} rx={140} ry={12} color="#D9CBA8" opacity={0.45} />
      <line x1="24" y1="208" x2="296" y2="208" stroke={INK_SOFT} strokeWidth={0.5} opacity={0.6} />
      <PillarCandle x={80} y={208} w={22} h={52} />
      <WaterBowl x={160} y={182} w={42} reflection={false} />
      <ellipse cx={160} cy={182} rx={9} ry={3} fill="#FFFDF2" />
      <ellipse cx={160} cy={182} rx={16} ry={4.8} fill="none" stroke="#FFFFFF" strokeWidth={0.5} opacity={0.8} />
      <Rosemary x={208} y={206} length={100} angle={-20} bend={-8} leaves={28} leafLength={15} seed={71} flowers={2} />
      <Rosemary x={216} y={208} length={72} angle={-4} bend={-4} leaves={20} leafLength={12} seed={73} />
    </Frame>
  )
}

/* ─────────────── Preparación del altar ─────────────── */

export function AltarIllustration() {
  return (
    <Frame>
      <Glow x={160} y={120} r={130} opacity={0.55} className="halo-respira" />
      {/* Tela clara */}
      <path d="M24 170 Q160 160 296 170 L304 224 Q160 236 16 224Z" fill="#F1EADB" filter="url(#acuarela)" />
      <path d="M24 170 Q160 160 296 170 L304 224 Q160 236 16 224Z" fill="none" stroke={INK_SOFT} strokeWidth={0.55} />
      <path d="M70 174 Q74 200 66 228 M250 174 Q246 200 254 228 M160 168 Q164 200 158 232" fill="none" stroke={INK_SOFT} strokeWidth={0.35} opacity={0.6} />
      {/* Orquídea en su maceta */}
      <path d="M232 152 L236 174 L264 174 L268 152Z" fill="#E9DDC4" stroke={INK_SOFT} strokeWidth={0.55} />
      <OrchidLeaf x={250} y={152} length={42} width={12} angle={-166} seed={3} />
      <OrchidLeaf x={250} y={152} length={40} width={12} angle={-16} seed={4} />
      <OrchidSpray
        points={[
          [250, 150],
          [250, 116],
          [238, 84],
          [214, 62],
        ]}
        flowers={[
          { at: [248, 108], size: 0.4, rotate: 8, seed: 5 },
          { at: [232, 76], size: 0.38, rotate: -8, seed: 6 },
        ]}
        buds={[{ at: [214, 62], size: 0.6, rotate: -70 }]}
      />
      <PillarCandle x={78} y={174} w={22} h={56} />
      <Pyramid x={160} y={174} w={38} h={84} />
      <Sparkle x={160} y={86} s={5} className="destello d1" />
      <WaterBowl x={110} y={196} w={24} />
      <AmethystCluster x={206} y={204} scale={0.48} />
      <g transform="translate(240 206) rotate(-8)">
        <rect x={0} y={-10} width={34} height={22} rx={1} fill="#FBF8EF" stroke={INK_SOFT} strokeWidth={0.5} />
        <path d="M5 -4 q6 -2 12 0 t12 0 M5 1 q6 -2 12 0 t8 0" fill="none" stroke="#8E6FB5" strokeWidth={0.4} />
        <rect x={6} y={6} width={40} height={3.4} rx={1} fill="#9A86B6" stroke="#4A3E63" strokeWidth={0.3} transform="rotate(-14 6 6)" />
      </g>
      <Rosemary x={118} y={224} length={98} angle={-6} bend={-6} leaves={26} leafLength={13} seed={81} flowers={2} />
      <Chamomile x={58} y={214} size={7} seed={91} tilt={0.6} petals={16} />
    </Frame>
  )
}

/* ─────────────── Inicio: corona de romero ─────────────── */

export function WreathIllustration() {
  const cx = 160
  const cy = 114
  const R = 78
  const sprigs: ReactNode[] = []
  for (let i = 0; i < 3; i++) {
    const a0 = 104 + i * 54
    const ra = (a0 * Math.PI) / 180
    sprigs.push(<Rosemary key={`l${i}`} x={r2(cx + R * Math.cos(ra))} y={r2(cy + R * Math.sin(ra))} length={74} angle={a0 + 117} bend={-17} leaves={24} leafLength={14} seed={100 + i} flowers={i === 1 ? 2 : 1} />)
    const b0 = 76 - i * 54
    const rb = (b0 * Math.PI) / 180
    sprigs.push(<Rosemary key={`r${i}`} x={r2(cx + R * Math.cos(rb))} y={r2(cy + R * Math.sin(rb))} length={74} angle={b0 - 117} bend={17} leaves={24} leafLength={14} seed={200 + i} flowers={i === 1 ? 2 : 1} />)
  }
  return (
    <Frame>
      <Glow x={cx} y={cy} r={112} opacity={0.7} className="halo-respira" />
      <Wash x={cx} y={cy} rx={56} ry={56} color="#F3E3B6" opacity={0.35} />
      {sprigs}
      <Sparkle x={cx} y={cy} s={9} className="destello d1" />
      <Sparkle x={cx - 26} y={cy - 18} s={3} className="destello d2" />
      <Sparkle x={cx + 22} y={cy + 14} s={3.5} className="destello d3" />
      <Chamomile x={cx - 30} y={cy + R - 4} size={8} rotate={-20} seed={6} tilt={0.7} petals={16} />
      <Chamomile x={cx + 30} y={cy + R - 4} size={8} rotate={20} seed={8} tilt={0.7} petals={16} />
      <OrchidSpray points={[[cx - 12, cy + R + 10], [cx, cy + R]]} flowers={[{ at: [cx, cy + R], size: 0.6, seed: 9 }]} />
    </Frame>
  )
}

/* ─────────────── Lo que aún florece ─────────────── */

export function BloomIllustration() {
  return (
    <Frame>
      <Glow x={170} y={110} r={140} color="#F6E3B0" opacity={0.6} className="halo-respira" />
      <Wash x={160} y={226} rx={150} ry={12} color="#D9CBA8" opacity={0.4} />
      <OrchidSpray
        points={[
          [44, 230],
          [46, 170],
          [74, 112],
          [130, 74],
          [196, 58],
          [252, 64],
        ]}
        flowers={[
          { at: [52, 152], size: 0.6, rotate: -18, seed: 1 },
          { at: [96, 96], size: 0.66, rotate: -6, seed: 2 },
          { at: [158, 64], size: 0.6, rotate: 8, seed: 3 },
        ]}
        buds={[
          { at: [222, 58], size: 0.85, rotate: 78 },
          { at: [252, 64], size: 0.7, rotate: 100 },
        ]}
      />
      <Rosemary x={20} y={234} length={120} angle={-28} bend={-12} leaves={32} leafLength={17} seed={301} flowers={2} />
      <g fill="none" strokeLinecap="round">
        {['M246 236 Q242 196 226 158', 'M262 236 Q268 200 284 170', 'M232 236 Q220 214 200 194'].map((d) => (
          <g key={d}>
            <path d={d} stroke="#93A985" strokeWidth={1.6} filter="url(#acuarela)" />
            <path d={d} stroke={INK} strokeWidth={0.45} />
          </g>
        ))}
      </g>
      <ChamomileLeaf x={248} y={222} length={30} angle={-128} seed={12} />
      <ChamomileLeaf x={262} y={218} length={28} angle={-52} seed={14} />
      <Chamomile x={226} y={156} size={15} rotate={-10} seed={21} />
      <Chamomile x={284} y={168} size={12} rotate={12} seed={23} tilt={0.72} />
      <Chamomile x={200} y={192} size={11} rotate={-24} seed={25} tilt={0.68} />
      <Sparkle x={124} y={150} s={4} className="destello d2" />
      <Sparkle x={262} y={110} s={5} className="destello d1" />
      <Sparkle x={60} y={70} s={3} className="destello d3" />
    </Frame>
  )
}

/* ─────────────── Despedida: el jardín en plenitud ─────────────── */

export function FarewellIllustration() {
  const cx = 160
  const cy = 120
  const R = 84
  const sprigs: ReactNode[] = []
  for (let i = 0; i < 3; i++) {
    const a0 = 104 + i * 54
    const ra = (a0 * Math.PI) / 180
    sprigs.push(<Rosemary key={`l${i}`} x={r2(cx + R * Math.cos(ra))} y={r2(cy + R * Math.sin(ra))} length={80} angle={a0 + 117} bend={-18} leaves={26} leafLength={14} seed={400 + i} flowers={2} />)
    const b0 = 76 - i * 54
    const rb = (b0 * Math.PI) / 180
    sprigs.push(<Rosemary key={`r${i}`} x={r2(cx + R * Math.cos(rb))} y={r2(cy + R * Math.sin(rb))} length={80} angle={b0 - 117} bend={18} leaves={26} leafLength={14} seed={500 + i} flowers={2} />)
  }
  return (
    <Frame>
      <Glow x={cx} y={cy} r={130} color="#F6E2AA" opacity={0.8} className="halo-respira" />
      <Rays x={cx} y={cy - 30} from={30} to={86} count={19} start={-170} end={-10} opacity={0.35} />
      {sprigs}
      <FullMoon x={cx} y={58} r={10} />
      <Pyramid x={cx} y={150} w={30} h={62} />
      <Chamomile x={cx - 34} y={cy + R - 6} size={8} seed={12} tilt={0.7} petals={16} />
      <Chamomile x={cx + 34} y={cy + R - 6} size={8} seed={14} tilt={0.7} petals={16} />
      <OrchidSpray points={[[cx - 14, cy + R + 10], [cx, cy + R]]} flowers={[{ at: [cx, cy + R], size: 0.62, seed: 7 }]} />
      <Sparkle x={cx - 40} y={cy - 30} s={4} className="destello d1" />
      <Sparkle x={cx + 44} y={cy - 20} s={5} className="destello d2" />
      <Sparkle x={cx + 30} y={cy + 40} s={3} className="destello d3" />
      <Sparkle x={cx - 46} y={cy + 30} s={3.5} className="destello d2" />
    </Frame>
  )
}

const SCENES: Record<IllustrationKey, () => ReactNode> = {
  umbral: Umbral,
  memoria: Memoria,
  manos: Manos,
  casa: Casa,
  raices: Raices,
  alegria: Alegria,
  mujer: Mujer,
  jardin: Jardin,
  luna: () => <Luna />,
}

export function DayIllustration({ name }: { name: IllustrationKey }) {
  const Scene = SCENES[name]
  return <Scene />
}
