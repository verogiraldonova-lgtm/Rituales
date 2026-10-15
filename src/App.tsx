import { useEffect, useRef } from 'react'
import { days } from './content/novena'
import { Footer, Header } from './components/Chrome'
import { CursorTrail } from './components/CursorTrail'
import { SvgDefs } from './illustrations/SvgDefs'
import { Cover } from './pages/Cover'
import { DayPage } from './pages/Day'
import { DayNine } from './pages/DayNine'
import { Florece, NotFound } from './pages/Florece'
import { Invocacion } from './pages/Invocacion'
import { Altar, Apertura, Cierre, Inicio } from './pages/Preparation'
import { pageTitle, routeKey, useRoute, type Route } from './routes'
import { SanctuaryProvider } from './state/Sanctuary'

function Page({ route }: { route: Route }) {
  switch (route.name) {
    case 'inicio':
      return <Inicio />
    case 'altar':
      return <Altar />
    case 'apertura':
      return <Apertura />
    case 'invocacion':
      return <Invocacion />
    case 'dia':
      return route.day === 9 ? <DayNine /> : <DayPage day={days[route.day - 1]} />
    case 'cierre':
      return <Cierre />
    case 'florece':
      return <Florece />
    default:
      return <NotFound />
  }
}

export function App() {
  const route = useRoute()
  const key = routeKey(route)
  const firstLoad = useRef(true)

  useEffect(() => {
    document.title = pageTitle(route)
    if (firstLoad.current) {
      firstLoad.current = false
      return
    }
    // Al cambiar de página: volver arriba y llevar el foco al título (lectores de pantalla).
    window.scrollTo({ top: 0, behavior: 'instant' })
    document.getElementById('titulo-pagina')?.focus({ preventScroll: true })
  }, [key])

  return (
    <SanctuaryProvider>
      <SvgDefs />
      <CursorTrail />
      {route.name === 'portada' ? (
        <Cover />
      ) : (
        <div className="santuario">
          <a className="saltar" href="#contenido" onClick={(e) => {
            e.preventDefault()
            document.getElementById('titulo-pagina')?.focus()
          }}>
            Saltar al contenido
          </a>
          <Header currentKey={key} />
          <main id="contenido" className="aparecer" key={key}>
            <Page route={route} />
          </main>
          <Footer />
        </div>
      )}
    </SanctuaryProvider>
  )
}

