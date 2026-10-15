/**
 * Escenas ilustradas: portada y una lámina distinta para cada jornada.
 */
import type { ReactNode } from 'react'
import type { IllustrationKey } from '../content/types'
import { C, r2, seeded } from './palette'
import {
  AmethystCluster,
  Chamomile,
  ChamomileLeaf,
  FullMoon,
  Glow,
  Orchid,
  OrchidBud,
  OrchidLeaf,
  Rosemary,
  Roots,
  SmallFlame,
  Sparkle,
  useSvgId,
} from './botanicals'

function Frame({ children, viewBox = '0 0 320 240', className = '' }: { children: ReactNode; viewBox?: string; className?: string }) {
  return (
    <svg viewBox={viewBox} className={`lamina ${className}`} aria-hidden="true" focusable="false" role="presentation">
      {children}
    </svg>
  )
}

/* ─────────────── Portada: orquídeas blancas y romero en luz dorada ─────────────── */

export function CoverIllustration() {
  return (
    <Frame viewBox="0 0 400 330" className="lamina-portada">
      <Glow x={205} y={150} r={170} color={C.goldLight} opacity={0.75} className="halo-respira" />
      <Glow x={250} y={110} r={80} color="#FFF6DD" opacity={0.9} />
      {/* Vara de orquídea */}
      <path
        d="M352 300 C350 220 320 120 250 78 C205 52 150 52 104 78"
        fill="none"
        stroke="#6F7F66"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <path d="M352 300 C350 220 320 120 250 78" fill="none" stroke="#9AAA8D" strokeWidth={0.7} />
      <OrchidBud x={104} y={78} size={0.8} rotate={-112} />
      <OrchidBud x={124} y={66} size={1} rotate={-100} />
      {/* Romero cruzado */}
      <Rosemary x={30} y={300} length={210} angle={-26} bend={-22} leaves={44} leafLength={26} seed={11} flowers={4} />
      <Rosemary x={70} y={318} length={160} angle={-50} bend={14} leaves={34} leafLength={22} seed={21} flowers={2} />
      <Rosemary x={395} y={318} length={150} angle={-148} bend={-12} leaves={30} leafLength={21} seed={31} />
      <Orchid x={170} y={78} size={0.78} rotate={-14} />
      <Orchid x={244} y={96} size={0.98} rotate={6} />
      <Orchid x={318} y={160} size={1.05} rotate={18} />
      <Orchid x={330} y={250} size={0.78} rotate={-8} />
      <Sparkle x={120} y={140} s={5} className="destello d1" />
      <Sparkle x={290} y={56} s={4} className="destello d2" />
      <Sparkle x={210} y={200} s={6} className="destello d3" />
      <Sparkle x={68} y={210} s={3.5} className="destello d2" />
      <Sparkle x={372} y={100} s={3} className="destello d1" />
    </Frame>
  )
}

/* ─────────────── I. Romero y umbral iluminado ─────────────── */

function Umbral() {
  const id = useSvgId('umbral')
  return (
    <Frame>
      <defs>
        <radialGradient id={id} cx="0.5" cy="0.62" r="0.7">
          <stop offset="0" stopColor="#FFF8E4" />
          <stop offset="0.6" stopColor="#F4E6C3" />
          <stop offset="1" stopColor="#E3CF9F" />
        </radialGradient>
      </defs>
      <Glow x={160} y={130} r={130} opacity={0.55} className="halo-respira" />
      <polygon points="118,200 202,200 262,236 58,236" fill={C.goldLight} opacity={0.35} />
      <path d="M118 200 L118 104 A42 42 0 0 1 202 104 L202 200Z" fill={`url(#${id})`} />
      <path d="M118 200 L118 104 A42 42 0 0 1 202 104 L202 200" fill="none" stroke={C.gold} strokeWidth={1.4} />
      <path d="M110 200 L110 104 A50 50 0 0 1 210 104 L210 200" fill="none" stroke={C.gold} strokeWidth={0.6} opacity={0.7} />
      <line x1="40" y1="200" x2="280" y2="200" stroke={C.sandDeep} strokeWidth={0.8} />
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1={160} y1={150} x2={124 + i * 18} y2={236} stroke={C.gold} strokeWidth={0.4} opacity={0.35} />
      ))}
      <Sparkle x={160} y={120} s={7} className="destello d1" />
      <Sparkle x={143} y={150} s={3.5} className="destello d2" />
      <Sparkle x={178} y={164} s={3} className="destello d3" />
      <Rosemary x={70} y={214} length={150} angle={-74} bend={-14} leaves={32} leafLength={20} seed={4} flowers={2} />
      <Rosemary x={88} y={214} length={96} angle={-58} bend={10} leaves={22} leafLength={16} seed={8} />
      <Rosemary x={250} y={214} length={150} angle={-106} bend={14} leaves={32} leafLength={20} seed={6} flowers={2} />
      <Rosemary x={232} y={214} length={96} angle={-122} bend={-10} leaves={22} leafLength={16} seed={12} />
    </Frame>
  )
}

/* ─────────────── II. Romero y papel manuscrito ─────────────── */

function Memoria() {
  const rnd = seeded(77)
  const lines: ReactNode[] = []
  for (let i = 0; i < 7; i++) {
    const y = 74 + i * 15
    const end = i === 6 ? 150 : 214 - rnd() * 18
    let d = `M96 ${y}`
    for (let x = 96; x < end; x += 8) {
      const amp = 1.6 + rnd() * 2.2
      d += ` q2 ${r2(-amp)} 4 0 q2 ${r2(amp * 0.6)} 4 0`
    }
    lines.push(<path key={i} d={d} fill="none" stroke="#7D6B98" strokeWidth={0.8} opacity={0.55} strokeLinecap="round" />)
  }
  return (
    <Frame>
      <Glow x={160} y={120} r={120} opacity={0.45} />
      <g transform="rotate(-6 160 120)">
        <path
          d="M84 52 L236 52 L236 182 Q226 196 206 190 L84 190Z"
          fill={C.orchid}
          stroke={C.sandDeep}
          strokeWidth={0.9}
        />
        <path d="M236 182 Q222 180 206 190 Q216 186 220 178Z" fill={C.sand} stroke={C.sandDeep} strokeWidth={0.6} />
        {lines}
      </g>
      {/* Lápiz violeta */}
      <g transform="translate(212 206) rotate(-28)">
        <rect x={0} y={-3.5} width={78} height={7} rx={1.2} fill="#9C88B8" />
        <rect x={0} y={-3.5} width={78} height={2.4} rx={1} fill="#B7A6CF" />
        <polygon points="0,-3.5 -12,0 0,3.5" fill="#E8D9B9" />
        <polygon points="-8,-1.2 -12,0 -8,1.2" fill="#5C4D72" />
        <rect x={74} y={-3.5} width={6} height={7} fill={C.goldLight} />
      </g>
      <Rosemary x={52} y={196} length={190} angle={-38} bend={-16} leaves={40} leafLength={20} seed={14} flowers={3} />
      <Sparkle x={250} y={66} s={4.5} className="destello d2" />
    </Frame>
  )
}

/* ─────────────── III. Amatista entre manos abiertas ─────────────── */

const HAND =
  'M4 214 C4 182 1 150 2 120 L2 90 Q8 76 14 90 L15 112 L16 68 Q22 54 28 68 L29 108 L30 60 Q36 46 42 60 L43 108 L44 72 Q50 59 56 72 L57 122 C62 118 72 106 80 99 Q89 95 87 106 C81 124 71 140 64 160 C61 182 60 198 58 214'

function Manos() {
  return (
    <Frame>
      <Glow x={160} y={132} r={120} color={C.amethystLight} opacity={0.55} className="halo-respira" />
      <Glow x={160} y={140} r={60} color="#FFF5DE" opacity={0.8} />
      {[-1, 1].map((s) => (
        <g key={s} transform={`translate(${160 + s * 3} 26) scale(${s * 0.9} 0.9)`}>
          <path d={HAND} fill={C.orchid} fillOpacity={0.7} stroke={C.goldInk} strokeWidth={1.1} strokeLinejoin="round" strokeLinecap="round" />
          <path d="M10 150 Q28 138 46 146 M14 168 Q30 160 44 166" fill="none" stroke={C.gold} strokeWidth={0.6} opacity={0.6} />
          <path d="M6 214 L56 214" stroke={C.goldInk} strokeWidth={0.8} opacity={0.5} />
        </g>
      ))}
      <AmethystCluster x={160} y={168} scale={0.95} />
      {[-60, -30, 0, 30, 60].map((a) => (
        <line
          key={a}
          x1={160}
          y1={118}
          x2={r2(160 + Math.sin((a * Math.PI) / 180) * 70)}
          y2={r2(118 - Math.cos((a * Math.PI) / 180) * 70)}
          stroke={C.gold}
          strokeWidth={0.5}
          opacity={0.45}
        />
      ))}
      <Sparkle x={128} y={74} s={4} className="destello d1" />
      <Sparkle x={196} y={64} s={5} className="destello d3" />
    </Frame>
  )
}

/* ─────────────── IV. Cuenco con agua y luz de ventana ─────────────── */

function Casa() {
  const id = useSvgId('agua')
  return (
    <Frame>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E3EAE2" />
          <stop offset="1" stopColor={C.water} />
        </linearGradient>
      </defs>
      {/* Ventana */}
      <path d="M196 120 L196 50 A34 34 0 0 1 264 50 L264 120Z" fill="#FFF8E6" stroke={C.gold} strokeWidth={1.2} />
      <path d="M230 16 L230 120 M196 76 L264 76" stroke={C.gold} strokeWidth={0.8} />
      <path d="M188 128 L272 128" stroke={C.sandDeep} strokeWidth={1.2} />
      {/* Haz de luz */}
      <polygon points="198,120 262,120 168,214 56,214" fill={C.goldLight} opacity={0.28} />
      <polygon points="212,120 248,120 140,214 92,214" fill="#FFF3D6" opacity={0.5} />
      <line x1="30" y1="214" x2="290" y2="214" stroke={C.sandDeep} strokeWidth={0.8} />
      {/* Cuenco */}
      <ellipse cx={112} cy={212} rx={46} ry={5} fill={C.sand} opacity={0.6} />
      <path d="M64 176 Q66 210 112 212 Q158 210 160 176Z" fill="#F1EADB" stroke={C.goldInk} strokeWidth={1} />
      <ellipse cx={112} cy={176} rx={48} ry={10} fill={`url(#${id})`} stroke={C.goldInk} strokeWidth={1} />
      <ellipse cx={120} cy={176} rx={20} ry={3.5} fill="none" stroke="#FFFFFF" strokeWidth={0.8} opacity={0.9} />
      <ellipse cx={120} cy={176} rx={32} ry={5.5} fill="none" stroke="#FFFFFF" strokeWidth={0.5} opacity={0.6} />
      <Sparkle x={126} y={175} s={4} fill="#FFFFFF" opacity={0.95} className="destello d2" />
      <Rosemary x={196} y={210} length={86} angle={-12} bend={-6} leaves={20} leafLength={14} seed={41} />
      <Sparkle x={240} y={36} s={4} className="destello d1" />
    </Frame>
  )
}

/* ─────────────── V. Raíces y romero ─────────────── */

function Raices() {
  const id = useSvgId('tierra')
  return (
    <Frame>
      <defs>
        <radialGradient id={id} cx="0.5" cy="0" r="0.75">
          <stop offset="0" stopColor={C.sand} stopOpacity={0.55} />
          <stop offset="1" stopColor={C.sand} stopOpacity={0} />
        </radialGradient>
      </defs>
      <Glow x={160} y={70} r={110} opacity={0.5} />
      <rect x={10} y={128} width={300} height={112} fill={`url(#${id})`} />
      <path d="M40 128 Q100 123 160 128 T280 128" fill="none" stroke={C.sandDeep} strokeWidth={0.9} />
      <Roots x={160} y={128} length={30} depth={5} seed={19} spread={34} />
      <Roots x={150} y={128} length={22} depth={4} seed={23} spread={30} angle={110} />
      <Roots x={170} y={128} length={22} depth={4} seed={29} spread={30} angle={70} />
      <Rosemary x={160} y={130} length={112} angle={-90} bend={-6} leaves={28} leafLength={18} seed={51} flowers={2} />
      <Rosemary x={156} y={130} length={92} angle={-118} bend={-10} leaves={24} leafLength={16} seed={53} />
      <Rosemary x={164} y={130} length={96} angle={-62} bend={10} leaves={24} leafLength={16} seed={55} flowers={1} />
      <Rosemary x={158} y={130} length={64} angle={-146} bend={-6} leaves={16} leafLength={13} seed={57} />
      <Rosemary x={162} y={130} length={66} angle={-34} bend={6} leaves={16} leafLength={13} seed={59} />
      <Sparkle x={86} y={170} s={3} fill={C.goldInk} opacity={0.5} className="destello d1" />
      <Sparkle x={238} y={190} s={3} fill={C.goldInk} opacity={0.5} className="destello d3" />
    </Frame>
  )
}

/* ─────────────── VI. Manzanilla y luz de mañana ─────────────── */

function Alegria() {
  return (
    <Frame>
      <Glow x={160} y={176} r={150} color="#F6DFA6" opacity={0.6} className="halo-respira" />
      {Array.from({ length: 13 }, (_, i) => {
        const a = (-90 + (i - 6) * 13) * (Math.PI / 180)
        return (
          <line
            key={i}
            x1={r2(160 + Math.cos(a) * 46)}
            y1={r2(176 + Math.sin(a) * 46)}
            x2={r2(160 + Math.cos(a) * 140)}
            y2={r2(176 + Math.sin(a) * 140)}
            stroke={C.gold}
            strokeWidth={0.6}
            opacity={0.45}
          />
        )
      })}
      <path d="M118 176 A42 42 0 0 1 202 176Z" fill="#FBEBC3" stroke={C.gold} strokeWidth={0.9} />
      <line x1="24" y1="176" x2="296" y2="176" stroke={C.sandDeep} strokeWidth={0.8} />
      {/* Tallos */}
      <g fill="none" stroke={C.sage} strokeWidth={1.2} strokeLinecap="round">
        <path d="M100 236 Q96 170 84 118" />
        <path d="M120 236 Q126 180 136 92" />
        <path d="M206 236 Q206 186 214 132" />
        <path d="M226 236 Q236 196 256 150" />
        <path d="M70 236 Q64 200 50 168" />
      </g>
      <ChamomileLeaf x={100} y={214} length={38} angle={-130} seed={2} />
      <ChamomileLeaf x={122} y={208} length={34} angle={-48} seed={4} />
      <ChamomileLeaf x={208} y={214} length={36} angle={-136} seed={6} />
      <ChamomileLeaf x={228} y={220} length={30} angle={-40} seed={8} />
      <Chamomile x={84} y={116} size={17} rotate={-12} seed={3} />
      <Chamomile x={136} y={90} size={20} rotate={8} seed={5} />
      <Chamomile x={214} y={130} size={18} rotate={-4} seed={7} />
      <Chamomile x={256} y={148} size={14} rotate={14} seed={9} tilt={0.7} />
      <Chamomile x={50} y={166} size={12} rotate={-20} seed={11} tilt={0.7} />
      <Sparkle x={182} y={70} s={4.5} className="destello d1" />
      <Sparkle x={278} y={104} s={3.5} className="destello d2" />
    </Frame>
  )
}

/* ─────────────── VII. Amatista y resplandor interior ─────────────── */

function Mujer() {
  return (
    <Frame>
      <Glow x={160} y={130} r={140} color={C.amethystLight} opacity={0.6} className="halo-respira" />
      <Glow x={160} y={124} r={70} color="#FFF4DA" opacity={0.95} />
      {[44, 62, 82].map((r, i) => (
        <circle key={r} cx={160} cy={128} r={r} fill="none" stroke={C.gold} strokeWidth={0.6} opacity={0.5 - i * 0.12} />
      ))}
      {Array.from({ length: 24 }, (_, i) => {
        const a = (i * 15 * Math.PI) / 180
        const r1 = i % 2 ? 92 : 88
        const rr = i % 2 ? 104 : 116
        return (
          <line
            key={i}
            x1={r2(160 + Math.cos(a) * r1)}
            y1={r2(128 + Math.sin(a) * r1)}
            x2={r2(160 + Math.cos(a) * rr)}
            y2={r2(128 + Math.sin(a) * rr)}
            stroke={C.gold}
            strokeWidth={0.6}
            opacity={0.5}
          />
        )
      })}
      <AmethystCluster x={160} y={170} scale={1.5} />
      <Sparkle x={160} y={60} s={6} className="destello d1" />
      <Sparkle x={112} y={100} s={3.5} className="destello d2" />
      <Sparkle x={212} y={92} s={4} className="destello d3" />
      <Rosemary x={64} y={214} length={70} angle={-20} bend={-6} leaves={16} leafLength={12} seed={61} />
      <Rosemary x={256} y={214} length={70} angle={-160} bend={6} leaves={16} leafLength={12} seed={63} />
    </Frame>
  )
}

/* ─────────────── VIII. Orquídea blanca viva ─────────────── */

function Jardin() {
  return (
    <Frame>
      <Glow x={180} y={90} r={130} opacity={0.5} />
      {/* Maceta */}
      <path d="M118 196 L124 232 L196 232 L202 196Z" fill="#EFE6D3" stroke={C.goldInk} strokeWidth={0.9} />
      <path d="M114 190 L206 190 L206 198 L114 198Z" fill={C.sand} stroke={C.goldInk} strokeWidth={0.9} />
      {/* Raíces aéreas */}
      <g fill="none" stroke="#B9BDA9" strokeWidth={2.4} strokeLinecap="round">
        <path d="M150 188 Q136 196 132 214" />
        <path d="M172 188 Q190 194 196 210 Q198 218 192 222" />
      </g>
      <g fill="none" stroke="#9DB08E" strokeWidth={2.4} strokeLinecap="round">
        <path d="M132 213 l-0.6 3" />
        <path d="M192 222 l-2 1.4" />
      </g>
      {/* Vara */}
      <path d="M160 186 C158 130 170 70 216 44 C236 33 258 34 272 44" fill="none" stroke="#6F7F66" strokeWidth={1.8} strokeLinecap="round" />
      <OrchidLeaf x={160} y={188} length={96} width={22} angle={-168} />
      <OrchidLeaf x={160} y={188} length={92} width={22} angle={-14} />
      <OrchidLeaf x={160} y={186} length={66} width={18} angle={-128} />
      <OrchidBud x={272} y={44} size={0.75} rotate={80} />
      <OrchidBud x={258} y={37} size={0.9} rotate={70} />
      <Orchid x={162} y={128} size={0.62} rotate={-10} />
      <Orchid x={180} y={80} size={0.66} rotate={4} />
      <Orchid x={226} y={50} size={0.6} rotate={14} />
      <Sparkle x={96} y={70} s={4} className="destello d2" />
      <Sparkle x={268} y={110} s={3.5} className="destello d1" />
    </Frame>
  )
}

/* ─────────────── IX. Luna llena, romero, fuego y agua ─────────────── */

export function Luna({ className = '' }: { className?: string }) {
  const id = useSvgId('cuenco')
  return (
    <Frame className={className}>
      <rect x={0} y={0} width={320} height={240} fill="none" />
      <g className="luna-resplandor">
        <Glow x={160} y={78} r={150} color="#F1E3BC" opacity={0.9} />
      </g>
      <Glow x={160} y={78} r={70} color="#FFFBEE" opacity={0.9} />
      <FullMoon x={160} y={78} r={44} />
      <Sparkle x={70} y={42} s={3.5} className="destello d1" />
      <Sparkle x={252} y={30} s={4.5} className="destello d3" />
      <Sparkle x={274} y={96} s={3} className="destello d2" />
      <Sparkle x={42} y={110} s={2.5} className="destello d3" />
      <line x1="24" y1="210" x2="296" y2="210" stroke={C.sandDeep} strokeWidth={0.8} />
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E7EDE6" />
          <stop offset="1" stopColor={C.water} />
        </linearGradient>
      </defs>
      {/* Cuenco con el reflejo de la luna */}
      <path d="M118 184 Q120 210 160 211 Q200 210 202 184Z" fill="#F1EADB" stroke={C.goldInk} strokeWidth={1} />
      <ellipse cx={160} cy={184} rx={42} ry={8.5} fill={`url(#${id})`} stroke={C.goldInk} strokeWidth={1} />
      <ellipse cx={160} cy={184} rx={9} ry={3.2} fill="#FFFDF2" />
      <ellipse cx={160} cy={184} rx={16} ry={5} fill="none" stroke="#FFFFFF" strokeWidth={0.5} opacity={0.8} />
      {/* Velón */}
      <rect x={68} y={160} width={22} height={50} rx={2} fill={C.orchid} stroke={C.sandDeep} strokeWidth={0.8} />
      <line x1={79} y1={160} x2={79} y2={154} stroke="#5B5245" strokeWidth={1} />
      <SmallFlame x={79} y={155} s={0.7} />
      {/* Romero */}
      <Rosemary x={214} y={208} length={96} angle={-22} bend={-8} leaves={24} leafLength={15} seed={71} flowers={2} />
      <Rosemary x={222} y={210} length={70} angle={-6} bend={-4} leaves={18} leafLength={12} seed={73} />
    </Frame>
  )
}

/* ─────────────── Preparación del altar ─────────────── */

export function AltarIllustration() {
  const id = useSvgId('piramide')
  return (
    <Frame>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFDF6" />
          <stop offset="1" stopColor="#EADFC6" />
        </linearGradient>
      </defs>
      <Glow x={160} y={128} r={130} opacity={0.6} className="halo-respira" />
      {/* Tela clara */}
      <path d="M26 172 Q160 162 294 172 L302 224 Q160 236 18 224Z" fill="#F3EDE0" stroke={C.sandDeep} strokeWidth={0.8} />
      <path d="M70 176 Q74 200 66 226 M250 176 Q246 200 254 226 M160 170 Q164 200 158 232" fill="none" stroke={C.sand} strokeWidth={0.8} />
      {/* Orquídea en su maceta */}
      <path d="M232 152 L235 174 L263 174 L266 152Z" fill="#EFE6D3" stroke={C.goldInk} strokeWidth={0.8} />
      <OrchidLeaf x={249} y={152} length={40} width={10} angle={-160} />
      <OrchidLeaf x={249} y={152} length={38} width={10} angle={-20} />
      <path d="M249 150 C248 110 236 74 206 60" fill="none" stroke="#6F7F66" strokeWidth={1.3} />
      <OrchidBud x={206} y={60} size={0.6} rotate={-80} />
      <Orchid x={226} y={70} size={0.42} rotate={-8} />
      <Orchid x={242} y={102} size={0.46} rotate={10} />
      {/* Velón */}
      <rect x={66} y={118} width={24} height={56} rx={2} fill={C.orchid} stroke={C.sandDeep} strokeWidth={0.8} />
      <ellipse cx={78} cy={118} rx={12} ry={2.6} fill="#F6F1E4" stroke={C.sandDeep} strokeWidth={0.6} />
      <line x1={78} y1={118} x2={78} y2={112} stroke="#5B5245" strokeWidth={1} />
      <SmallFlame x={78} y={113} s={0.6} />
      {/* Pirámide */}
      <polygon points="122,176 160,92 160,176" fill={`url(#${id})`} />
      <polygon points="160,92 198,176 160,176" fill="#E4D8BD" />
      <polygon points="122,176 160,92 198,176" fill="none" stroke={C.gold} strokeWidth={1.1} strokeLinejoin="round" />
      <line x1={160} y1={92} x2={160} y2={176} stroke={C.gold} strokeWidth={0.6} />
      <Sparkle x={160} y={90} s={5} className="destello d1" />
      {/* Cuenco con agua */}
      <path d="M86 192 Q88 212 112 213 Q136 212 138 192Z" fill="#F1EADB" stroke={C.goldInk} strokeWidth={0.8} />
      <ellipse cx={112} cy={192} rx={26} ry={5.5} fill={C.water} stroke={C.goldInk} strokeWidth={0.8} />
      <ellipse cx={116} cy={192} rx={10} ry={2} fill="none" stroke="#FFFFFF" strokeWidth={0.6} />
      {/* Amatista */}
      <AmethystCluster x={206} y={206} scale={0.5} />
      {/* Papel y lápiz violeta */}
      <g transform="translate(240 206) rotate(-8)">
        <rect x={0} y={-10} width={34} height={22} rx={1} fill={C.orchid} stroke={C.sandDeep} strokeWidth={0.6} />
        <rect x={6} y={6} width={40} height={3.2} rx={1} fill="#9C88B8" transform="rotate(-14 6 6)" />
      </g>
      {/* Romero */}
      <Rosemary x={124} y={222} length={96} angle={-6} bend={-6} leaves={22} leafLength={13} seed={81} flowers={2} />
    </Frame>
  )
}

/* ─────────────── Inicio: corona de romero con orquídea ─────────────── */

export function WreathIllustration() {
  const cx = 160
  const cy = 116
  const R = 78
  const sprigs: ReactNode[] = []
  for (let i = 0; i < 3; i++) {
    const a0 = 104 + i * 54
    const rad = (a0 * Math.PI) / 180
    sprigs.push(
      <Rosemary key={`l${i}`} x={r2(cx + R * Math.cos(rad))} y={r2(cy + R * Math.sin(rad))} length={72} angle={a0 + 117} bend={-17} leaves={18} leafLength={14} seed={100 + i} flowers={i === 1 ? 1 : 0} />,
    )
    const b0 = 76 - i * 54
    const radB = (b0 * Math.PI) / 180
    sprigs.push(
      <Rosemary key={`r${i}`} x={r2(cx + R * Math.cos(radB))} y={r2(cy + R * Math.sin(radB))} length={72} angle={b0 - 117} bend={17} leaves={18} leafLength={14} seed={200 + i} flowers={i === 1 ? 1 : 0} />,
    )
  }
  return (
    <Frame>
      <Glow x={cx} y={cy} r={110} opacity={0.7} className="halo-respira" />
      <circle cx={cx} cy={cy} r={50} fill="none" stroke={C.gold} strokeWidth={0.5} opacity={0.6} />
      {sprigs}
      <Sparkle x={cx} y={cy} s={9} className="destello d1" />
      <Sparkle x={cx - 24} y={cy - 18} s={3} className="destello d2" />
      <Sparkle x={cx + 22} y={cy + 14} s={3.5} className="destello d3" />
      <OrchidBud x={cx - 34} y={cy + R + 2} size={0.7} rotate={-60} />
      <OrchidBud x={cx + 34} y={cy + R + 2} size={0.7} rotate={60} />
      <Orchid x={cx} y={cy + R} size={0.62} />
    </Frame>
  )
}

/* ─────────────── Lo que aún florece ─────────────── */

export function BloomIllustration() {
  return (
    <Frame>
      <Glow x={170} y={110} r={140} color="#F6E3B0" opacity={0.6} className="halo-respira" />
      <path d="M40 226 C44 170 70 110 130 76 C170 54 214 50 250 62" fill="none" stroke="#6F7F66" strokeWidth={1.7} strokeLinecap="round" />
      <OrchidBud x={250} y={62} size={0.8} rotate={80} />
      <OrchidBud x={236} y={56} size={0.9} rotate={70} />
      <Rosemary x={20} y={232} length={130} angle={-34} bend={-14} leaves={30} leafLength={18} seed={301} flowers={2} />
      <g fill="none" stroke={C.sage} strokeWidth={1.1} strokeLinecap="round">
        <path d="M246 236 Q242 196 226 160" />
        <path d="M262 236 Q268 200 284 172" />
        <path d="M232 236 Q220 214 200 196" />
      </g>
      <ChamomileLeaf x={248} y={222} length={30} angle={-128} seed={12} />
      <ChamomileLeaf x={262} y={218} length={28} angle={-52} seed={14} />
      <Chamomile x={226} y={158} size={15} rotate={-10} seed={21} />
      <Chamomile x={284} y={170} size={12} rotate={12} seed={23} tilt={0.72} />
      <Chamomile x={200} y={194} size={11} rotate={-24} seed={25} tilt={0.7} />
      <Orchid x={80} y={128} size={0.62} rotate={-18} />
      <Orchid x={136} y={80} size={0.72} rotate={-4} />
      <Orchid x={196} y={64} size={0.6} rotate={10} />
      <Sparkle x={120} y={160} s={4} className="destello d2" />
      <Sparkle x={250} y={110} s={5} className="destello d1" />
      <Sparkle x={60} y={70} s={3} className="destello d3" />
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
