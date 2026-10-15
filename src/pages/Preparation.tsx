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
import { Divider, Fold, Pager } from '../components/Chrome'
import { Garden } from '../components/Garden'
import { TinyFlower } from '../illustrations/botanicals'
import { useSanctuary } from '../state/Sanctuary'
import { AltarIllustration, WreathIllustration } from '../illustrations/scenes'
import { dayLabel, href } from '../routes'
import { PageHero } from './PageHero'

export function Inicio() {
  const [salutation, ...letter] = dedication.blocks
  const greeting = salutation.type === 'p' ? salutation.text : ''
  return (
    <article className="pagina">
      <PageHero title={greeting} illustration={<WreathIllustration />} className="encabezado-carta" />
      <section className="carta" aria-label={dedication.title}>
        <Blocks blocks={letter} />
      </section>
      <Divider seed={4} />
      <Fold title={beforeBeginning.title} className="plegable-antes">
        <Blocks blocks={beforeBeginning.blocks} dropCap seed={3} />
      </Fold>
      <Fold title="Preparación del altar" eyebrow={altar.title} className="plegable-altar">
        <div className="altar-lamina">
          <AltarIllustration />
        </div>
        <Blocks blocks={altar.blocks} />
      </Fold>
      <p className="accion-comenzar">
        <a className="boton-entrar" href={href.jardin}>
          Comenzar novena
        </a>
      </p>
    </article>
  )
}

export function Jardin() {
  const { allRead } = useSanctuary()
  return (
    <article className="pagina pagina-jardin">
      <PageHero eyebrow="La novena" title="El jardín" />
      <p className="nota-discreta jardin-nota">
        Toca cada espacio para entrar. La flor
        <svg viewBox="-7 -7 14 14" width="18" height="18" aria-hidden="true" focusable="false" className="nota-flor">
          <TinyFlower r={6} />
        </svg>
        señala las jornadas completadas.
      </p>
      <Garden />
      {allRead && (
        <p className="accion-central">
          <a className="boton-suave" href={href.despedida}>
            Cerrar la novena
          </a>
        </p>
      )}
      <Pager prev={{ href: href.inicio, label: 'Inicio' }} next={{ href: href.apertura, label: 'Oración de apertura' }} />
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
