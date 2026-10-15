import type { ReactNode } from 'react'
import { closingPrayer, invocation, openingPrayer } from '../content/novena'
import type { Day as DayContent } from '../content/types'
import { Blocks, Verse } from '../components/Blocks'
import { Candle } from '../components/Candle'
import { DayNav, Disclosure, Divider, Fold, Pager, ReadToggle } from '../components/Chrome'
import { DayIllustration } from '../illustrations/scenes'
import { dayLabel, href } from '../routes'
import { PageHero } from './PageHero'

/** Invitación a encender la luz, con las oraciones a mano. */
export function OpeningInvitation({ children }: { children?: ReactNode }) {
  return (
    <>
      {children}
      <Candle size="compact" />
      <div className="desplegables">
        <Disclosure summary={openingPrayer.title}>
          <Verse verse={openingPrayer} showTitle={false} />
          <p className="enlace-discreto">
            <a href={href.apertura}>Abrir la página de la oración de apertura</a>
          </p>
        </Disclosure>
        <Disclosure summary={invocation.title}>
          <Verse verse={invocation} showTitle={false} />
          <p className="enlace-discreto">
            <a href={href.invocacion}>Abrir la página de la invocación</a>
          </p>
        </Disclosure>
      </div>
    </>
  )
}

export function DayPage({ day }: { day: DayContent }) {
  const n = day.number
  const prev = n === 1 ? { href: href.invocacion, label: 'Invocación de las nueve luces' } : { href: href.dia(n - 1), label: dayLabel(n - 1) }
  const next = { href: href.dia(n + 1), label: dayLabel(n + 1) }

  return (
    <article className={`pagina jornada jornada-${n}`}>
      <DayNav current={n} />
      <PageHero
        eyebrow="Día"
        srPrefix={`Día ${day.roman}:`}
        numeral={day.roman}
        title={day.title}
        subtitle={day.subtitle}
        illustration={<DayIllustration name={day.illustration} />}
        className="encabezado-jornada"
      />

      <section className="momento momento-apertura" aria-labelledby={`apertura-${n}`}>
        <h2 id={`apertura-${n}`} className="etiqueta">
          Encender la luz
        </h2>
        <OpeningInvitation>
          <Blocks blocks={day.opening} />
        </OpeningInvitation>
      </section>

      <Divider seed={n * 3} />

      <section className="momento lectura" aria-labelledby={`lectura-${n}`}>
        <h2 id={`lectura-${n}`} className="etiqueta">
          Lectura
        </h2>
        <Blocks blocks={day.reading} dropCap seed={n * 5} />
      </section>

      <Divider seed={n * 3 + 1} />

      <div className="plegables-jornada">
        <Fold eyebrow="Oración" title={day.prayer.title} className="plegable-oracion">
          <Verse verse={day.prayer} showTitle={false} className="verso-principal" />
        </Fold>
        <Fold eyebrow="Gesto" title={day.gesture.title} className="plegable-gesto">
          <Blocks blocks={day.gesture.blocks} />
        </Fold>
      </div>

      <Divider seed={n * 3 + 7} />

      <section className="momento momento-cierre" aria-labelledby={`cierre-${n}`}>
        <h2 id={`cierre-${n}`} className="etiqueta">
          Al terminar
        </h2>
        <Blocks blocks={day.closing} />
        <Disclosure summary={closingPrayer.title}>
          <Verse verse={closingPrayer} showTitle={false} />
          <p className="enlace-discreto">
            <a href={href.cierre}>Abrir la página de la oración de cierre</a>
          </p>
        </Disclosure>
        <Candle size="compact" />
      </section>

      <ReadToggle day={n} />
      <Pager prev={prev} next={next} />
    </article>
  )
}
