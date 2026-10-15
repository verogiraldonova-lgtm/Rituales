import { useEffect, useRef, useState } from 'react'
import { closingPrayer, finalDay } from '../content/novena'
import { Blocks, Verse } from '../components/Blocks'
import { Candle } from '../components/Candle'
import { DayNav, Disclosure, Divider, Pager, ReadToggle } from '../components/Chrome'
import { MomentArt } from '../illustrations/emblems'
import { Luna } from '../illustrations/scenes'
import { dayLabel, href } from '../routes'
import { OpeningInvitation } from './Day'
import { PageHero } from './PageHero'

type MomentKey = 'ofrenda' | 'fuego' | 'luna'

/** Los tres elementos de la transformación: cada uno se abre al tocarlo. */
function Transformation() {
  const d = finalDay
  const [open, setOpen] = useState<MomentKey | null>(null)
  const moments: { key: MomentKey; section: (typeof d.moments)['ofrenda'] }[] = [
    { key: 'ofrenda', section: d.moments.ofrenda },
    { key: 'fuego', section: d.moments.fuegoAgua },
    { key: 'luna', section: d.moments.luna },
  ]
  return (
    <section className="transformacion" aria-labelledby="ix-transformacion">
      <h2 id="ix-transformacion" className="titulo-seccion titulo-transformacion">
        {d.gestureTitle}
      </h2>
      <p className="nota-discreta">Toca cada elemento para abrir su gesto.</p>
      <div className="elementos">
        {moments.map(({ key, section }) => (
          <button
            key={key}
            type="button"
            className={`elemento elemento-${key}`}
            aria-expanded={open === key}
            aria-controls={`ix-${key}`}
            onClick={() => setOpen(open === key ? null : key)}
          >
            <MomentArt kind={key} />
            <span className="elemento-titulo">{section.title}</span>
          </button>
        ))}
      </div>
      {moments.map(({ key, section }) => (
        <section
          key={key}
          id={`ix-${key}`}
          className={`momento-lunar momento-${key}`}
          hidden={open !== key}
          aria-labelledby={`ix-${key}-titulo`}
        >
          <h3 id={`ix-${key}-titulo`}>{section.title}</h3>
          <Blocks blocks={section.blocks} headingLevel="h4" />
        </section>
      ))}
    </section>
  )
}

export function DayNine() {
  const d = finalDay
  const ref = useRef<HTMLElement>(null)

  // El resplandor lunar se intensifica suavemente a medida que avanza la ceremonia.
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const el = ref.current
      if (!el) return
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 1
      el.style.setProperty('--luz', (0.3 + progress * 0.7).toFixed(3))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <article ref={ref} className="pagina jornada jornada-9 ceremonia-lunar">
      <div className="claridad-lunar" aria-hidden="true" />
      <DayNav current={9} />
      <PageHero
        eyebrow="Día"
        srPrefix={`Día ${d.roman}:`}
        numeral={d.roman}
        title={d.title}
        subtitle={d.subtitle}
        illustration={<Luna className="lamina-luna" />}
        className="encabezado-jornada encabezado-lunar"
      />

      <section className="momento momento-apertura" aria-labelledby="ix-apertura">
        <h2 id="ix-apertura" className="titulo-seccion">
          {d.opening.title}
        </h2>
        <OpeningInvitation>
          <Blocks blocks={d.opening.blocks} />
        </OpeningInvitation>
      </section>

      <Divider seed={31} />

      <section className="momento lectura" aria-labelledby="ix-lectura">
        <h2 id="ix-lectura" className="titulo-seccion">
          {d.reading.title}
        </h2>
        <Blocks blocks={d.reading.blocks} dropCap seed={45} />
      </section>

      <Divider seed={33} />

      <section className="momento oracion bendicion" aria-labelledby="ix-bendicion">
        <h2 id="ix-bendicion" className="verso-titulo">
          {d.blessing.title}
        </h2>
        <Verse verse={d.blessing} showTitle={false} className="verso-principal" />
      </section>

      <Divider seed={35} />

      <Transformation />

      <Divider seed={37} />

      <section className="momento ultima-luz" aria-labelledby="ix-ultima">
        <h2 id="ix-ultima" className="titulo-seccion">
          {d.lastLight.title}
        </h2>
        <Blocks blocks={d.lastLight.blocks} headingLevel="h3" />
        <Candle />
        <Disclosure summary={closingPrayer.title}>
          <Verse verse={closingPrayer} showTitle={false} />
          <p className="enlace-discreto">
            <a href={href.cierre}>Abrir la página de la oración de cierre</a>
          </p>
        </Disclosure>
      </section>

      <ReadToggle day={9} />
      <Pager prev={{ href: href.dia(8), label: dayLabel(8) }} next={{ href: href.florece, label: 'Lo que aún florece' }} />
    </article>
  )
}
