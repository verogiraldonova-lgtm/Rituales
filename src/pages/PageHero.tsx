import type { ReactNode } from 'react'

/** Encabezado de página: lámina, antetítulo, título y subtítulo. */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  illustration,
  numeral,
  srPrefix,
  className = '',
}: {
  eyebrow?: string
  title: string
  subtitle?: string
  illustration?: ReactNode
  numeral?: string
  /** Texto solo para lectores de pantalla antes del título (p. ej. «Día I:»). */
  srPrefix?: string
  className?: string
}) {
  return (
    <header className={`encabezado ${className}`}>
      {illustration && <div className="encabezado-lamina">{illustration}</div>}
      {eyebrow && (
        <p className="antetitulo" aria-hidden={srPrefix ? true : undefined}>
          {eyebrow}
        </p>
      )}
      {numeral && (
        <p className="numeral" aria-hidden="true">
          {numeral}
        </p>
      )}
      <h1 id="titulo-pagina" tabIndex={-1}>
        {srPrefix && <span className="sr-only">{srPrefix} </span>}
        {title}
      </h1>
      {subtitle && <p className="subtitulo">{subtitle}</p>}
    </header>
  )
}
