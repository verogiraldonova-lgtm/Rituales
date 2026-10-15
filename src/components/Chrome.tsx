/**
 * Elementos de navegación compartidos: cabecera, menú, controles de letra,
 * navegación por jornadas, anterior/siguiente y pie de página.
 */
import { useEffect, useRef, type ReactNode } from 'react'
import { cover } from '../content/novena'
import { useSanctuary } from '../state/Sanctuary'
import { dayRoman, href, navEntries, type NavEntry } from '../routes'
import { MoonPhase, SprigDivider } from '../illustrations/botanicals'
import { C } from '../illustrations/palette'

export function Emblem() {
  return (
    <svg viewBox="0 0 40 40" width="34" height="34" aria-hidden="true" focusable="false" className="emblema">
      <circle cx="20" cy="20" r="18" fill="none" stroke={C.gold} strokeWidth="0.8" />
      <MoonPhase x={20} y={17} r={8} k={1} lit="#F4EBD3" outline={C.gold} />
      <path d="M9 31 Q20 25 31 31" fill="none" stroke={C.forest} strokeWidth="1" />
      {[12, 16, 20, 24, 28].map((x, i) => (
        <path key={x} d={`M${x} ${29.4 - (i === 2 ? 1.2 : 0)} l${i < 2 ? -2 : i > 2 ? 2 : 0} -3.4`} stroke={C.sage} strokeWidth="1.1" strokeLinecap="round" />
      ))}
    </svg>
  )
}

export function FontControls() {
  const { canDecrease, canIncrease, decreaseFont, increaseFont } = useSanctuary()
  return (
    <div className="control-letra" role="group" aria-label="Tamaño de la letra">
      <button type="button" onClick={decreaseFont} disabled={!canDecrease} aria-label="Reducir el tamaño de la letra">
        <span aria-hidden="true" className="letra-menor">A</span>
        <span aria-hidden="true">−</span>
      </button>
      <button type="button" onClick={increaseFont} disabled={!canIncrease} aria-label="Aumentar el tamaño de la letra">
        <span aria-hidden="true" className="letra-mayor">A</span>
        <span aria-hidden="true">+</span>
      </button>
    </div>
  )
}

export function Header({ currentKey }: { currentKey: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const openButtonRef = useRef<HTMLButtonElement>(null)

  // Cerrar el menú al cambiar de página.
  useEffect(() => {
    const dialog = dialogRef.current
    if (dialog?.open) dialog.close()
  }, [currentKey])

  const open = () => dialogRef.current?.showModal()
  const close = () => dialogRef.current?.close()

  return (
    <header className="cabecera">
      <div className="cabecera-interior">
        <a className="cabecera-marca" href={href.inicio} aria-label="La luz que permanece · Ir al inicio">
          <Emblem />
          <span className="marca-texto">La luz que permanece</span>
        </a>
        <div className="cabecera-acciones">
          <FontControls />
          <button
            ref={openButtonRef}
            type="button"
            className="boton-menu"
            onClick={open}
            aria-haspopup="dialog"
            aria-controls="menu-principal"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
              <path d="M4 7h16M4 12h16M4 17h11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <span>Menú</span>
          </button>
        </div>
      </div>
      <dialog
        ref={dialogRef}
        id="menu-principal"
        className="menu"
        aria-labelledby="menu-titulo"
        onClick={(e) => {
          if (e.target === e.currentTarget) close()
        }}
        onClose={() => openButtonRef.current?.focus()}
      >
        <MenuContent currentKey={currentKey} onClose={close} />
      </dialog>
    </header>
  )
}

function MenuLink({ entry, currentKey, onNavigate }: { entry: NavEntry; currentKey: string; onNavigate: () => void }) {
  const { isRead } = useSanctuary()
  const dayNumber = entry.key.startsWith('dia-') ? Number(entry.key.slice(4)) : null
  const read = dayNumber !== null && isRead(dayNumber)
  const current = entry.key === currentKey
  return (
    <li>
      <a href={entry.href} aria-current={current ? 'page' : undefined} onClick={onNavigate}>
        {dayNumber !== null ? (
          <>
            <span className="menu-romano" aria-hidden="true">
              {dayRoman(dayNumber)}
            </span>
            <span>{entry.label.replace(/^Día [IVX]+ · /, '')}</span>
            <span className="sr-only">{`, ${entry.label.split(' · ')[0]}`}</span>
          </>
        ) : (
          <span>{entry.label}</span>
        )}
        {read && (
          <span className="marca-leida" title="Leída">
            <span aria-hidden="true">✓</span>
            <span className="sr-only">, leída</span>
          </span>
        )}
      </a>
    </li>
  )
}

function MenuContent({ currentKey, onClose }: { currentKey: string; onClose: () => void }) {
  const preparation = navEntries.slice(0, 4)
  const dayEntries = navEntries.slice(4, 13)
  const closing = navEntries.slice(13)
  return (
    <div className="menu-panel">
      <div className="menu-cabecera">
        <h2 id="menu-titulo" className="menu-titulo">
          La luz que permanece
        </h2>
        <button type="button" className="menu-cerrar" onClick={onClose}>
          <span>Cerrar</span>
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      <nav aria-label="Menú principal">
        <ul className="menu-lista">
          {preparation.map((e) => (
            <MenuLink key={e.key} entry={e} currentKey={currentKey} onNavigate={onClose} />
          ))}
        </ul>
        <h3 className="menu-grupo">Las nueve jornadas</h3>
        <ul className="menu-lista menu-jornadas">
          {dayEntries.map((e) => (
            <MenuLink key={e.key} entry={e} currentKey={currentKey} onNavigate={onClose} />
          ))}
        </ul>
        <ul className="menu-lista">
          {closing.map((e) => (
            <MenuLink key={e.key} entry={e} currentKey={currentKey} onNavigate={onClose} />
          ))}
        </ul>
        <a className="menu-portada" href={href.portada} onClick={onClose}>
          Volver a la portada
        </a>
      </nav>
    </div>
  )
}

/** Navegación secundaria: las nueve jornadas en una sola fila. */
export function DayNav({ current }: { current: number }) {
  const { isRead } = useSanctuary()
  return (
    <nav className="nav-jornadas" aria-label="Las nueve jornadas">
      <ol>
        {Array.from({ length: 9 }, (_, i) => {
          const n = i + 1
          const read = isRead(n)
          return (
            <li key={n}>
              <a
                href={href.dia(n)}
                aria-current={n === current ? 'page' : undefined}
                className={read ? 'leida' : undefined}
                aria-label={`Día ${dayRoman(n)}${read ? ', leída' : ''}`}
              >
                {dayRoman(n)}
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export interface PagerLink {
  href: string
  label: string
}

export function Pager({ prev, next }: { prev?: PagerLink; next?: PagerLink }) {
  return (
    <nav className="paginador" aria-label="Continuar el recorrido">
      {prev ? (
        <a className="paginador-anterior" href={prev.href} rel="prev">
          <span className="paginador-direccion" aria-hidden="true">
            ← Anterior
          </span>
          <span className="sr-only">Anterior: </span>
          <span className="paginador-titulo">{prev.label}</span>
        </a>
      ) : (
        <span />
      )}
      {next ? (
        <a className="paginador-siguiente" href={next.href} rel="next">
          <span className="paginador-direccion" aria-hidden="true">
            Siguiente →
          </span>
          <span className="sr-only">Siguiente: </span>
          <span className="paginador-titulo">{next.label}</span>
        </a>
      ) : (
        <span />
      )}
    </nav>
  )
}

export function Divider({ seed = 2 }: { seed?: number }) {
  return (
    <div className="separador" role="presentation">
      <SprigDivider seed={seed} />
    </div>
  )
}

/** Bloque desplegable para consultar una oración sin salir de la página. */
export function Disclosure({ summary, children }: { summary: string; children: ReactNode }) {
  return (
    <details className="desplegable">
      <summary>
        <span>{summary}</span>
      </summary>
      <div className="desplegable-contenido">{children}</div>
    </details>
  )
}

export function ReadToggle({ day }: { day: number }) {
  const { isRead, toggleRead } = useSanctuary()
  const read = isRead(day)
  return (
    <div className="marcar-leida">
      <button type="button" aria-pressed={read} onClick={() => toggleRead(day)}>
        <span className="casilla" aria-hidden="true">
          {read ? '✓' : ''}
        </span>
        <span>{read ? 'Jornada leída' : 'Marcar esta jornada como leída'}</span>
      </button>
      <p className="nota-discreta">Todas las jornadas permanecen abiertas, en cualquier orden y en cualquier momento.</p>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="pie">
      <Divider seed={88} />
      <p>
        {cover.dedication.map((line, i) => (
          <span key={line}>
            {line}
            {i < cover.dedication.length - 1 && <br />}
          </span>
        ))}
      </p>
      <p className="pie-enlaces">
        <a href={href.inicio}>Inicio</a>
        <span aria-hidden="true"> · </span>
        <a href={href.portada}>Portada</a>
      </p>
    </footer>
  )
}
