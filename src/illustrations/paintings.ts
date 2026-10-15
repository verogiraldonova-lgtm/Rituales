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
import dia5 from '../assets/dia-5.webp'
import dia5Small from '../assets/dia-5-800.webp'
import iconoDia5 from '../assets/icono-dia-5.webp'
import dia6 from '../assets/dia-6.webp'
import dia6Small from '../assets/dia-6-800.webp'
import iconoDia6 from '../assets/icono-dia-6.webp'
import dia7 from '../assets/dia-7.webp'
import dia7Small from '../assets/dia-7-800.webp'
import iconoDia7 from '../assets/icono-dia-7.webp'
import dia8 from '../assets/dia-8.webp'
import dia8Small from '../assets/dia-8-800.webp'
import iconoDia8 from '../assets/icono-dia-8.webp'
import dia9 from '../assets/dia-9.webp'
import dia9Small from '../assets/dia-9-800.webp'
import iconoDia9 from '../assets/icono-dia-9.webp'
import portada from '../assets/portada.webp'
import portadaSmall from '../assets/portada-small.webp'
import corona from '../assets/corona.webp'
import coronaSmall from '../assets/corona-small.webp'
import floreceImg from '../assets/florece.webp'
import floreceSmall from '../assets/florece-small.webp'
import despedidaImg from '../assets/despedida.webp'
import despedidaSmall from '../assets/despedida-small.webp'
import iconoCierre from '../assets/icono-cierre.webp'
import iconoFlorece from '../assets/icono-florece.webp'
import iconoDespedida from '../assets/icono-despedida.webp'
import elementoFuego from '../assets/elemento-fuego.webp'

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
  'dia-5': {
    src: dia5,
    small: dia5Small,
    width: 1376,
    height: 1143,
    smallWidth: 800,
    alt: 'Una planta de romero florecido con sus raíces doradas a la vista bajo la tierra, entre orquídeas blancas y cuarzos, bajo un arco de lunas.',
  },
  'dia-6': {
    src: dia6,
    small: dia6Small,
    width: 1376,
    height: 1143,
    smallWidth: 800,
    alt: 'Una taza de infusión de manzanilla humeante junto a un frasco con flores de manzanilla, una amatista y romero, frente a una ventana con luz de mañana.',
  },
  'dia-7': {
    src: dia7,
    small: dia7Small,
    width: 1376,
    height: 1143,
    smallWidth: 800,
    alt: 'Una amatista que brilla desde adentro sobre una piedra, entre romero y orquídeas blancas, con un cuenco de agua al pie y un arco de estrellas.',
  },
  'dia-8': {
    src: dia8,
    small: dia8Small,
    width: 1376,
    height: 1143,
    smallWidth: 800,
    alt: 'Una orquídea blanca viva en su maceta junto al velón, la pirámide, las amatistas y el cuenco con agua, rodeada de romero.',
  },
  'dia-9': {
    src: dia9,
    small: dia9Small,
    width: 1376,
    height: 1143,
    smallWidth: 800,
    alt: 'La luna llena sobre la pirámide, el velón encendido, el cuenco con agua que refleja la luna, romero florecido y una amatista sobre el altar.',
  },
  portada: {
    src: portada,
    small: portadaSmall,
    width: 1254,
    height: 1254,
    smallWidth: 800,
    alt: 'Un altar luminoso con la pirámide, velones encendidos, el cuenco con agua y manzanilla, orquídeas blancas, romero y amatistas, bajo la luna llena y el número nueve.',
  },
  corona: {
    src: corona,
    small: coronaSmall,
    width: 1145,
    height: 1374,
    smallWidth: 700,
    alt: 'Una corona de romero florecido con dos orquídeas blancas, suspendida entre estrellas y fases de la luna en oro.',
  },
  florece: {
    src: floreceImg,
    small: floreceSmall,
    width: 1536,
    height: 1024,
    smallWidth: 900,
    alt: 'Una vara de orquídeas blancas y flores de manzanilla que crecen entre romero, bajo un arco de luz dorada y lunas.',
  },
  despedida: {
    src: despedidaImg,
    small: despedidaSmall,
    width: 1145,
    height: 1374,
    smallWidth: 700,
    alt: 'Una corona de romero, orquídeas y lavanda rodea la pirámide, el número nueve y la luna llena entre estrellas doradas.',
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
  'dia-5': iconoDia5,
  'dia-6': iconoDia6,
  'dia-7': iconoDia7,
  'dia-8': iconoDia8,
  'dia-9': iconoDia9,
  cierre: iconoCierre,
  florece: iconoFlorece,
  despedida: iconoDespedida,
}

/** Imágenes de los tres gestos de la transformación (Día IX). */
export const momentImages = {
  ofrenda: iconoDia2,
  fuego: elementoFuego,
  luna: iconoDia9,
}
