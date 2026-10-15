import { afterInvocation, invocation } from '../content/novena'
import { Blocks, Verse } from '../components/Blocks'
import { Pager } from '../components/Chrome'
import { Glow, MoonPhase, Rosemary, Sparkle } from '../illustrations/botanicals'
import { C } from '../illustrations/palette'
import { useSanctuary } from '../state/Sanctuary'
import { dayLabel, dayRoman, href } from '../routes'

/** Medallón del nueve: numeral IX en un anillo de romero. */
function NineMedallion() {
  return (
    <svg viewBox="0 0 200 200" className="medallon" aria-hidden="true" focusable="false">
      <Glow x={100} y={100} r={100} opacity={0.7} className="halo-respira" />
      <circle cx="100" cy="100" r="74" fill="none" stroke={C.gold} strokeWidth="1" />
      <circle cx="100" cy="100" r="68" fill="none" stroke={C.gold} strokeWidth="0.5" />
      {Array.from({ length: 9 }, (_, i) => {
        const a = ((i * 40 - 90) * Math.PI) / 180
        return <circle key={i} cx={100 + Math.cos(a) * 82} cy={100 + Math.sin(a) * 82} r={3} fill={C.gold} opacity={0.4 + i * 0.07} />
      })}
      <Rosemary x={40} y={160} length={58} angle={-62} bend={-6} leaves={14} leafLength={11} seed={5} />
      <Rosemary x={160} y={160} length={58} angle={-118} bend={6} leaves={14} leafLength={11} seed={7} />
      <text x="100" y="118" textAnchor="middle" className="medallon-numeral">
        IX
      </text>
      <Sparkle x={100} y={44} s={5} className="destello d1" />
    </svg>
  )
}

/** Las nueve luces: fases lunares que crecen hasta la luna llena. */
function NineLights() {
  const { isRead } = useSanctuary()
  return (
    <nav className="nueve-luces" aria-label="Las nueve jornadas, hacia la luna llena">
      <ol>
        {Array.from({ length: 9 }, (_, i) => {
          const n = i + 1
          const k = n === 9 ? 1 : 0.08 + (i / 8) * 0.84
          const full = n === 9
          return (
            <li key={n} className={full ? 'luz-llena' : undefined}>
              <a href={href.dia(n)} aria-label={`${dayLabel(n)}${isRead(n) ? ', leída' : ''}`}>
                <svg viewBox="-24 -24 48 48" aria-hidden="true" focusable="false">
                  {full && <Glow x={0} y={0} r={24} color="#F3E3B6" opacity={0.95} />}
                  <MoonPhase x={0} y={0} r={full ? 15 : 12} k={k} lit={full ? '#FBF3DC' : '#EEDDAF'} dark="#F7F3EA" outline={C.gold} />
                </svg>
                <span className="luz-romano" aria-hidden="true">
                  {dayRoman(n)}
                </span>
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export function Invocacion() {
  return (
    <article className="pagina folio">
      <div className="folio-marco">
        <span className="esquina esquina-si" aria-hidden="true" />
        <span className="esquina esquina-sd" aria-hidden="true" />
        <span className="esquina esquina-ii" aria-hidden="true" />
        <span className="esquina esquina-id" aria-hidden="true" />
        <header className="encabezado folio-encabezado">
          <NineMedallion />
          <h1 id="titulo-pagina" tabIndex={-1}>
            {invocation.title}
          </h1>
        </header>
        <Verse verse={invocation} showTitle={false} className="verso-iluminado" />
        <div className="folio-transicion">
          <NineLights />
        </div>
        <div className="folio-cierre">
          <Blocks blocks={afterInvocation} />
          <p className="accion-central">
            <a className="boton-suave" href={href.dia(1)}>
              {dayLabel(1)}
            </a>
          </p>
        </div>
      </div>
      <Pager prev={{ href: href.apertura, label: 'Oración de apertura' }} next={{ href: href.dia(1), label: dayLabel(1) }} />
    </article>
  )
}
