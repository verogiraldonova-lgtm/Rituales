import { StationIcon, type StationKind } from '../illustrations/emblems'
import { TinyFlower } from '../illustrations/botanicals'
import { dayRoman, navEntries } from '../routes'
import { useSanctuary } from '../state/Sanctuary'

/**
 * El recorrido como un jardín: un sendero de piedras que serpentea
 * entre estaciones circulares, cada una lleva a su página.
 */
export function Garden() {
  const { isRead } = useSanctuary()
  const stations = navEntries.slice(1)
  return (
    <ol className="jardin">
      {stations.map((entry, i) => {
        const n = entry.key.startsWith('dia-') ? Number(entry.key.slice(4)) : null
        const side = i % 2 === 0 ? 'izquierda' : 'derecha'
        const next = i < stations.length - 1
        const read = n !== null && isRead(n)
        const title = n ? entry.label.split(' · ')[1] : entry.label
        return (
          <li key={entry.key} className={`estacion estacion-${side}`}>
            {next && (
              <svg className="sendero" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
                <path
                  className="sendero-tierra"
                  d={side === 'izquierda' ? 'M28 0 C28 55, 72 45, 72 100' : 'M72 0 C72 55, 28 45, 28 100'}
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  className="sendero-piedras"
                  d={side === 'izquierda' ? 'M28 0 C28 55, 72 45, 72 100' : 'M72 0 C72 55, 28 45, 28 100'}
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            )}
            <a href={entry.href} className="estacion-enlace">
              <span className="estacion-circulo">
                <StationIcon kind={entry.key as StationKind} />
                {read && (
                  <svg className="estacion-leida" viewBox="-7 -7 14 14" aria-hidden="true" focusable="false">
                    <TinyFlower r={6} />
                  </svg>
                )}
              </span>
              <span className="estacion-texto">
                {n && <span className="estacion-dia">Día {dayRoman(n)}</span>}
                <span className="estacion-titulo">{title}</span>
                {read && <span className="sr-only">, leída</span>}
              </span>
            </a>
          </li>
        )
      })}
    </ol>
  )
}
