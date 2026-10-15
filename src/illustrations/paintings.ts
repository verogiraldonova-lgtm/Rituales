/**
 * Láminas pintadas de la novena (imágenes locales optimizadas).
 * Para agregar una nueva: copiar el archivo a src/assets y registrarlo aquí.
 */
import altar from '../assets/altar.webp'
import altarSmall from '../assets/altar-900.webp'
import invocacion from '../assets/invocacion.webp'
import invocacionSmall from '../assets/invocacion-800.webp'
import dia1 from '../assets/dia-1.webp'
import dia1Small from '../assets/dia-1-800.webp'
import dia2 from '../assets/dia-2.webp'
import dia2Small from '../assets/dia-2-800.webp'
import dia3 from '../assets/dia-3.webp'
import dia3Small from '../assets/dia-3-800.webp'
import dia4 from '../assets/dia-4.webp'
import dia4Small from '../assets/dia-4-800.webp'
import iconoApertura from '../assets/icono-apertura.webp'
import iconoInvocacion from '../assets/icono-invocacion.webp'
import iconoDia1 from '../assets/icono-dia-1.webp'
import iconoDia2 from '../assets/icono-dia-2.webp'
import iconoDia3 from '../assets/icono-dia-3.webp'
import iconoDia4 from '../assets/icono-dia-4.webp'

export interface PaintingData {
  src: string
  small: string
  width: number
  height: number
  smallWidth: number
  alt: string
}

export const paintings = {
  altar: {
    src: altar,
    small: altarSmall,
    width: 1536,
    height: 1024,
    smallWidth: 900,
    alt: 'El altar: la pirámide sobre una tela clara, el velón encendido, la orquídea blanca viva, la amatista, el cuenco con agua, ramas de romero, flores de manzanilla y un papel con un lápiz violeta.',
  },
  invocacion: {
    src: invocacion,
    small: invocacionSmall,
    width: 1376,
    height: 1143,
    smallWidth: 800,
    alt: 'El altar bajo un arco celeste con las fases de la luna, el número nueve en el centro rodeado de luz, la pirámide, el velón, la orquídea y el romero.',
  },
  'dia-1': {
    src: dia1,
    small: dia1Small,
    width: 1376,
    height: 1143,
    smallWidth: 800,
    alt: 'Un umbral de piedra con una reja dorada abierta hacia un jardín luminoso, romero florecido a un lado y orquídeas blancas al otro.',
  },
  'dia-2': {
    src: dia2,
    small: dia2Small,
    width: 1376,
    height: 1143,
    smallWidth: 800,
    alt: 'Un papel manuscrito con letra violeta y una ramita de romero atada sobre él, junto al velón, la amatista, el cuenco con agua y la pirámide.',
  },
  'dia-3': {
    src: dia3,
    small: dia3Small,
    width: 1376,
    height: 1143,
    smallWidth: 800,
    alt: 'Dos manos abiertas sostienen una amatista bajo una estrella dorada, rodeadas de romero y orquídeas blancas.',
  },
  'dia-4': {
    src: dia4,
    small: dia4Small,
    width: 1376,
    height: 1143,
    smallWidth: 800,
    alt: 'Un cuenco con agua y flores de manzanilla junto a una ventana abierta al paisaje, con la orquídea, la pirámide y el velón.',
  },
} satisfies Record<string, PaintingData>

export type PaintingKey = keyof typeof paintings

/** Recortes circulares para las estaciones de la novena. */
export const stationImages: Partial<Record<string, string>> = {
  apertura: iconoApertura,
  invocacion: iconoInvocacion,
  'dia-1': iconoDia1,
  'dia-2': iconoDia2,
  'dia-3': iconoDia3,
  'dia-4': iconoDia4,
}
