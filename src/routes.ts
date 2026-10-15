import { useEffect, useState } from 'react'
import { days, finalDay } from './content/novena'

/**
 * Enrutado por hash (#/dia/3): funciona en GitHub Pages sin configuración
 * adicional y permite abrir cualquier jornada con un enlace directo.
 */

export type Route =
  | { name: 'portada' }
  | { name: 'inicio' }
  | { name: 'altar' }
  | { name: 'apertura' }
  | { name: 'invocacion' }
  | { name: 'dia'; day: number }
  | { name: 'cierre' }
  | { name: 'florece' }
  | { name: 'no-encontrada' }

export const href = {
  portada: '#/',
  inicio: '#/inicio',
  altar: '#/altar',
  apertura: '#/apertura',
  invocacion: '#/invocacion',
  dia: (n: number) => `#/dia/${n}`,
  cierre: '#/cierre',
  florece: '#/florece',
}

export function parseHash(hash: string): Route {
  const path = hash.replace(/^#/, '').replace(/\/+$/, '') || '/'
  if (path === '/' || path === '') return { name: 'portada' }
  const dayMatch = path.match(/^\/dia\/(\d)$/)
  if (dayMatch) {
    const n = Number(dayMatch[1])
    if (n >= 1 && n <= 9) return { name: 'dia', day: n }
    return { name: 'no-encontrada' }
  }
  switch (path) {
    case '/inicio':
      return { name: 'inicio' }
    case '/altar':
      return { name: 'altar' }
    case '/apertura':
      return { name: 'apertura' }
    case '/invocacion':
      return { name: 'invocacion' }
    case '/cierre':
      return { name: 'cierre' }
    case '/florece':
      return { name: 'florece' }
    default:
      return { name: 'no-encontrada' }
  }
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash))
  useEffect(() => {
    const onChange = () => setRoute(parseHash(window.location.hash))
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}

export function routeKey(route: Route): string {
  return route.name === 'dia' ? `dia-${route.day}` : route.name
}

/** Nombre corto de cada jornada para menús: «Día I · El umbral». */
export const dayLabel = (n: number) => {
  const d = n === 9 ? finalDay : days[n - 1]
  return `Día ${d.roman} · ${d.title}`
}

export const dayRoman = (n: number) => (n === 9 ? finalDay.roman : days[n - 1].roman)

export interface NavEntry {
  label: string
  href: string
  key: string
}

/** Orden completo del recorrido, tal como aparece en el menú. */
export const navEntries: NavEntry[] = [
  { label: 'Inicio', href: href.inicio, key: 'inicio' },
  { label: 'Preparación del altar', href: href.altar, key: 'altar' },
  { label: 'Oración de apertura', href: href.apertura, key: 'apertura' },
  { label: 'Invocación de las nueve luces', href: href.invocacion, key: 'invocacion' },
  ...Array.from({ length: 9 }, (_, i) => ({ label: dayLabel(i + 1), href: href.dia(i + 1), key: `dia-${i + 1}` })),
  { label: 'Oración de cierre', href: href.cierre, key: 'cierre' },
  { label: 'Lo que aún florece', href: href.florece, key: 'florece' },
]

export function pageTitle(route: Route): string {
  const base = 'La luz que permanece'
  switch (route.name) {
    case 'portada':
      return `${base} · Novena botánica`
    case 'dia':
      return `${dayLabel(route.day)} · ${base}`
    case 'no-encontrada':
      return base
    default: {
      const entry = navEntries.find((e) => e.key === route.name)
      return entry ? `${entry.label} · ${base}` : base
    }
  }
}
