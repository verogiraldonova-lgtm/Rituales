import { useEffect, useRef } from 'react'
import { closingPrayer, finalDay } from '../content/novena'
import { Blocks, Verse } from '../components/Blocks'
import { Candle } from '../components/Candle'
import { DayNav, Disclosure, Divider, Pager, ReadToggle } from '../components/Chrome'
import { FullMoon, Glow, Rosemary, SmallFlame } from '../illustrations/botanicals'
import { C } from '../illustrations/palette'
import { Luna } from '../illustrations/scenes'
import { dayLabel, href } from '../routes'
import { OpeningInvitation } from './Day'
import { PageHero } from './PageHero'

function MomentIcon({ kind }: { kind: 'ofrenda' | 'fuego' | 'luna' }) {
  return (
    <svg viewBox="0 0 120 80" className="momento-icono" aria-hidden="true" focusable="false">
      {kind === 'ofrenda' && (
        <>
          <Glow x={60} y={42} r={40} opacity={0.5} />
          <Rosemary x={14} y={52} length={92} angle={-12} bend={-6} leaves={22} leafLength={13} seed={91} />
          <rect x={48} y={34} width={22} height={16} rx={2} fill={C.orchid} stroke={C.sandDeep} strokeWidth={0.8} transform="rotate(-12 59 42)" />
          <path d="M50 44 l20 -4" stroke="#9C88B8" strokeWidth={0.7} transform="rotate(-12 59 42)" />
        </>
      )}
      {kind === 'fuego' && (
        <>
          <Glow x={60} y={36} r={40} color={C.flame} opacity={0.45} />
          <SmallFlame x={60} y={44} s={0.85} />
          <path d="M30 56 Q32 74 60 75 Q88 74 90 56Z" fill="#F1EADB" stroke={C.goldInk} strokeWidth={0.8} />
          <ellipse cx={60} cy={56} rx={30} ry={6} fill={C.water} stroke={C.goldInk} strokeWidth={0.8} />
          <ellipse cx={60} cy={56} rx={12} ry={2.4} fill="none" stroke="#FFFFFF" strokeWidth={0.6} />
        </>
      )}
      {kind === 'luna' && (
        <>
          <Glow x={60} y={40} r={42} color="#F1E3BC" opacity={0.9} />
          <FullMoon x={60} y={40} r={22} />
        </>
      )}
    </svg>
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
        <Blocks blocks={d.reading.blocks} dropCap />
      </section>

      <Divider seed={33} />

      <section className="momento oracion bendicion" aria-labelledby="ix-bendicion">
        <h2 id="ix-bendicion" className="verso-titulo">
          {d.blessing.title}
        </h2>
        <Verse verse={d.blessing} showTitle={false} className="verso-principal" />
      </section>

      <Divider seed={35} />

      <section className="transformacion" aria-labelledby="ix-transformacion">
        <h2 id="ix-transformacion" className="titulo-seccion titulo-transformacion">
          {d.gestureTitle}
        </h2>

        <section className="momento-lunar momento-ofrenda" aria-labelledby="ix-ofrenda">
          <MomentIcon kind="ofrenda" />
          <h3 id="ix-ofrenda">{d.moments.ofrenda.title}</h3>
          <Blocks blocks={d.moments.ofrenda.blocks} />
        </section>

        <section className="momento-lunar momento-fuego" aria-labelledby="ix-fuego">
          <MomentIcon kind="fuego" />
          <h3 id="ix-fuego">{d.moments.fuegoAgua.title}</h3>
          <Blocks blocks={d.moments.fuegoAgua.blocks} headingLevel="h4" />
        </section>

        <section className="momento-lunar momento-luna" aria-labelledby="ix-luna">
          <MomentIcon kind="luna" />
          <h3 id="ix-luna">{d.moments.luna.title}</h3>
          <Blocks blocks={d.moments.luna.blocks} />
        </section>
      </section>

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
