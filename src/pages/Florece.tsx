import { useEffect, useRef, useState } from 'react'
import { stillBlooming } from '../content/novena'
import { Blocks } from '../components/Blocks'
import { Divider, Pager } from '../components/Chrome'
import { BloomIllustration } from '../illustrations/scenes'
import { readStored, writeStored } from '../state/storage'
import { href } from '../routes'
import { PageHero } from './PageHero'

const KEY = 'mis-palabras'

/** Espacio privado de escritura: se guarda solo en este navegador. */
function PrivateJournal() {
  const [text, setText] = useState<string>(() => readStored<string>(KEY, ''))
  const [status, setStatus] = useState('')
  const firstRender = useRef(true)

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    const t = window.setTimeout(() => {
      setStatus(writeStored(KEY, text) ? 'Guardado en este dispositivo.' : 'No fue posible guardar en este navegador.')
    }, 600)
    return () => window.clearTimeout(t)
  }, [text])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setStatus('Tus palabras se copiaron.')
    } catch {
      setStatus('No fue posible copiar automáticamente. Puedes seleccionar el texto y copiarlo.')
    }
  }

  const download = () => {
    const header = 'Lo que aún florece\n\n'
    const blob = new Blob([header + text], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'lo-que-aun-florece.txt'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
    setStatus('Se descargó un archivo con tus palabras.')
  }

  const empty = text.trim().length === 0

  return (
    <section className="diario" aria-labelledby="diario-titulo">
      <h2 id="diario-titulo" className="titulo-seccion">
        Mis palabras
      </h2>
      <label htmlFor="diario-texto" className="sr-only">
        Escribe aquí tus palabras
      </label>
      <textarea
        id="diario-texto"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={10}
        spellCheck
        aria-describedby="diario-aviso"
      />
      <p id="diario-aviso" className="nota-discreta">
        Lo que escribas aquí permanece solo en este dispositivo y no se envía a ningún lugar. Puede perderse si se borran los
        datos del navegador; si deseas conservarlo, cópialo o descárgalo.
      </p>
      <div className="diario-acciones">
        <button type="button" className="boton-suave" onClick={copy} disabled={empty}>
          Copiar mis palabras
        </button>
        <button type="button" className="boton-suave" onClick={download} disabled={empty}>
          Descargar mis palabras
        </button>
      </div>
      <p className="diario-estado" role="status">
        {status}
      </p>
    </section>
  )
}

export function Florece() {
  return (
    <article className="pagina florece">
      <PageHero title={stillBlooming.title} subtitle={stillBlooming.subtitle} illustration={<BloomIllustration />} />
      <section aria-label={stillBlooming.subtitle} className="florece-texto">
        <Blocks blocks={stillBlooming.blocks} />
        <p className="firma">
          {stillBlooming.signature[0]}
          <br />
          {stillBlooming.signature[1]}
        </p>
      </section>
      <Divider seed={44} />
      <PrivateJournal />
      <Pager prev={{ href: href.cierre, label: 'Oración de cierre' }} next={{ href: href.inicio, label: 'Inicio' }} />
    </article>
  )
}

export function NotFound() {
  return (
    <article className="pagina">
      <PageHero title="Este sendero no existe" />
      <p className="accion-central">
        <a className="boton-suave" href={href.inicio}>
          Volver al inicio
        </a>
      </p>
    </article>
  )
}
