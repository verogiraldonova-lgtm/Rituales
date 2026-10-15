import { StationIcon, type StationKind } from '../illustrations/emblems'
import { TinyFlower } from '../illustrations/botanicals'
import { dayLabel, dayRoman, href } from '../routes'
import { useSanctuary } from '../state/Sanctuary'

/**
 * El jardín de la novena: hoyos de tierra unidos por un sendero de piedras,
 * en zigzag de tres columnas para verlos casi todos de un vistazo.
 */
interface Station {
  kind: StationKind
  href: string
  title: string
  day?: number
}

const COLUMNS = 3

function stations(allRead: boolean): Station[] {
  const list: Station[] = [
    { kind: 'apertura', href: href.apertura, title: 'Oración de apertura' },
    { kind: 'invocacion', href: href.invocacion, title: 'Invocación de las nueve luces' },
    ...Array.from({ length: 9 }, (_, i) => ({
      kind: `dia-${i + 1}` as StationKind,
      href: href.dia(i + 1),
      title: dayLabel(i + 1).split(' · ')[1],
      day: i + 1,
    })),
    { kind: 'cierre', href: href.cierre, title: 'Oración de cierre' },
    { kind: 'florece', href: href.florece, title: 'Lo que aún florece' },
  ]
  if (allRead) list.push({ kind: 'despedida', href: href.despedida, title: 'Despedida' })
  return list
}

export function Garden() {
  const { isRead, allRead } = useSanctuary()
  const list = stations(allRead)
  return (
    <ol className="jardin">
      {list.map((st, i) => {
        const row = Math.floor(i / COLUMNS)
        const forward = row % 2 === 0
        const col = forward ? i % COLUMNS : COLUMNS - 1 - (i % COLUMNS)
        const hasNext = i < list.length - 1
        const nextSameRow = hasNext && Math.floor((i + 1) / COLUMNS) === row
        const path = !hasNext ? null : nextSameRow ? (forward ? 'derecha' : 'izquierda') : 'abajo'
        const read = st.day !== undefined && isRead(st.day)
        return (
          <li
            key={st.kind}
            className={`hoyo ${st.kind === 'despedida' ? 'hoyo-despedida' : ''}`}
            style={{ gridRow: row + 1, gridColumn: col + 1 }}
          >
            {path && (
              <svg className={`sendero sendero-${path} ${path === 'abajo' ? (col === COLUMNS - 1 ? 'por-derecha' : 'por-izquierda') : ''}`} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
                <path
                  className="sendero-tierra"
                  d={path === 'abajo' ? 'M0 0 C100 20, 100 80, 0 100' : 'M0 50 C33 15, 66 85, 100 50'}
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  className="sendero-piedras"
                  d={path === 'abajo' ? 'M0 0 C100 20, 100 80, 0 100' : 'M0 50 C33 15, 66 85, 100 50'}
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            )}
            <a href={st.href} className="hoyo-enlace">
              <span className="hoyo-circulo">
                <StationIcon kind={st.kind} />
                {read && (
                  <svg className="hoyo-leido" viewBox="-7 -7 14 14" aria-hidden="true" focusable="false">
                    <TinyFlower r={6} />
                  </svg>
                )}
              </span>
              <span className="hoyo-texto">
                {st.day && <span className="hoyo-dia">Día {dayRoman(st.day)}</span>}
                <span className="hoyo-titulo">{st.title}</span>
                {read && <span className="sr-only">, completada</span>}
              </span>
            </a>
          </li>
        )
      })}
    </ol>
  )
}
