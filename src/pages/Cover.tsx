import { cover } from '../content/novena'
import { CoverIllustration } from '../illustrations/scenes'
import { href } from '../routes'

export function Cover() {
  return (
    <main id="contenido" className="portada">
      <div className="portada-luz" aria-hidden="true" />
      <div className="portada-interior">
        <div className="portada-lamina">
          <CoverIllustration />
        </div>
        <h1 className="portada-titulo" id="titulo-pagina" tabIndex={-1}>
          {cover.title}
        </h1>
        <p className="portada-subtitulo">{cover.subtitle}</p>
        <div className="portada-filete" aria-hidden="true">
          <span />
          <svg viewBox="0 0 20 20" width="14" height="14">
            <path d="M10 1 L12 8 L19 10 L12 12 L10 19 L8 12 L1 10 L8 8Z" fill="#B69B65" />
          </svg>
          <span />
        </div>
        <p className="portada-dedicatoria">
          <span>{cover.dedication[0]}</span>
          <span>{cover.dedication[1]}</span>
          <span className="portada-lugar">{cover.dedication[2]}</span>
        </p>
        <a className="boton-entrar" href={href.inicio}>
          {cover.enter}
        </a>
        <p className="portada-frase">{cover.tagline}</p>
      </div>
    </main>
  )
}
