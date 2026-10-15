import { farewell } from '../content/novena'
import { FarewellIllustration } from '../illustrations/scenes'
import { href } from '../routes'

/** Página de cierre de la novena, al completar los nueve encuentros. */
export function Despedida() {
  const [para, nombre, lugar] = farewell.signature
  return (
    <article className="pagina despedida">
      <div className="despedida-lamina">
        <FarewellIllustration />
      </div>
      <h1 id="titulo-pagina" tabIndex={-1} className="despedida-bendicion">
        {farewell.blessing}
      </h1>
      <div className="portada-filete" aria-hidden="true">
        <span />
        <svg viewBox="0 0 20 20" width="14" height="14">
          <path d="M10 1 L12 8 L19 10 L12 12 L10 19 L8 12 L1 10 L8 8Z" fill="#B69B65" />
        </svg>
        <span />
      </div>
      <p className="portada-dedicatoria">
        <span>{para}</span>
        <span className="portada-nombre">{nombre}</span>
        <span className="portada-lugar">{lugar}</span>
      </p>
      <p className="accion-central">
        <a className="boton-suave" href={href.jardin}>
          Volver a la novena
        </a>
      </p>
    </article>
  )
}
