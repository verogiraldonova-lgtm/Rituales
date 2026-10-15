import { afterInvocation, invocation } from '../content/novena'
import { Blocks, Verse } from '../components/Blocks'
import { Pager } from '../components/Chrome'
import { Glow, MoonPhase } from '../illustrations/botanicals'
import { InvocationCard } from '../illustrations/emblems'
import { C } from '../illustrations/palette'
import { useSanctuary } from '../state/Sanctuary'
import { dayLabel, dayRoman, href } from '../routes'

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
          <InvocationCard />
          <h1 id="titulo-pagina" tabIndex={-1}>
            {invocation.title}
          </h1>
        </header>
        <Verse verse={invocation} showTitle={false} className="verso-iluminado" initial />
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
