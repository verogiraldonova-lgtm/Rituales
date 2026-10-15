/** Inicio, Preparación del altar, Oración de apertura, Oración de cierre. */
import {
  afterClosing,
  afterOpening,
  altar,
  beforeBeginning,
  closingIntro,
  closingPrayer,
  dailyEncounter,
  dedication,
  openingPrayer,
} from '../content/novena'
import { Blocks, Verse } from '../components/Blocks'
import { Candle } from '../components/Candle'
import { Divider, Pager } from '../components/Chrome'
import { AltarIllustration, WreathIllustration } from '../illustrations/scenes'
import { useSanctuary } from '../state/Sanctuary'
import { dayLabel, dayRoman, href, navEntries } from '../routes'
import { PageHero } from './PageHero'

export function Inicio() {
  const { isRead } = useSanctuary()
  return (
    <article className="pagina">
      <PageHero eyebrow="Inicio" title={dedication.title} illustration={<WreathIllustration />} />
      <section className="carta" aria-label={dedication.title}>
        <Blocks blocks={dedication.blocks} />
      </section>
      <Divider seed={4} />
      <section aria-labelledby="antes">
        <h2 id="antes" className="titulo-seccion">
          {beforeBeginning.title}
        </h2>
        <Blocks blocks={beforeBeginning.blocks} dropCap />
      </section>
      <Divider seed={6} />
      <section aria-labelledby="recorrido" className="recorrido">
        <h2 id="recorrido" className="titulo-seccion">
          El recorrido
        </h2>
        <ol className="recorrido-lista">
          {navEntries.slice(1).map((entry) => {
            const n = entry.key.startsWith('dia-') ? Number(entry.key.slice(4)) : null
            return (
              <li key={entry.key} className={n ? 'recorrido-dia' : undefined}>
                <a href={entry.href}>
                  {n ? (
                    <>
                      <span className="recorrido-romano" aria-hidden="true">
                        {dayRoman(n)}
                      </span>
                      <span className="sr-only">{`Día ${dayRoman(n)}: `}</span>
                      <span>{dayLabel(n).split(' · ')[1]}</span>
                      {isRead(n) && <span className="marca-leida"> ✓<span className="sr-only">, leída</span></span>}
                    </>
                  ) : (
                    <span>{entry.label}</span>
                  )}
                </a>
              </li>
            )
          })}
        </ol>
      </section>
      <Pager next={{ href: href.altar, label: 'Preparación del altar' }} />
    </article>
  )
}

export function Altar() {
  return (
    <article className="pagina">
      <PageHero eyebrow="Preparación del altar" title={altar.title} illustration={<AltarIllustration />} />
      <section aria-label={altar.title}>
        <Blocks blocks={altar.blocks} />
      </section>
      <Pager prev={{ href: href.inicio, label: 'Inicio' }} next={{ href: href.apertura, label: 'Oración de apertura' }} />
    </article>
  )
}

export function Apertura() {
  return (
    <article className="pagina">
      <PageHero eyebrow="Cada día" title={openingPrayer.title} />
      <section aria-labelledby="encuentro">
        <h2 id="encuentro" className="titulo-seccion">
          {dailyEncounter.title}
        </h2>
        <Blocks blocks={dailyEncounter.blocks} />
      </section>
      <Candle />
      <section aria-label={openingPrayer.title} className="oracion">
        <Verse verse={openingPrayer} showTitle={false} className="verso-principal" />
      </section>
      <Divider seed={9} />
      <Blocks blocks={afterOpening} />
      <p className="accion-central">
        <a className="boton-suave" href={href.invocacion}>
          Invocación de las nueve luces
        </a>
      </p>
      <Pager
        prev={{ href: href.altar, label: 'Preparación del altar' }}
        next={{ href: href.invocacion, label: 'Invocación de las nueve luces' }}
      />
    </article>
  )
}

export function Cierre() {
  return (
    <article className="pagina">
      <PageHero eyebrow="Cada día" title={closingPrayer.title} />
      <section aria-labelledby="cierre-encuentro">
        <h2 id="cierre-encuentro" className="titulo-seccion">
          {closingIntro.title}
        </h2>
        <Blocks blocks={closingIntro.blocks} />
      </section>
      <section aria-label={closingPrayer.title} className="oracion">
        <Verse verse={closingPrayer} showTitle={false} className="verso-principal" />
      </section>
      <Candle />
      <Divider seed={13} />
      <Blocks blocks={afterClosing} />
      <Pager
        prev={{ href: href.dia(9), label: dayLabel(9) }}
        next={{ href: href.florece, label: 'Lo que aún florece' }}
      />
    </article>
  )
}
