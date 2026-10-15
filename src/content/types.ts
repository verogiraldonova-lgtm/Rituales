/**
 * Tipos del contenido de la novena.
 * El texto vive en `novena.ts`; los componentes solo deciden cómo mostrarlo.
 */

/** Un párrafo de prosa. */
export interface ParagraphBlock {
  type: 'p'
  text: string
}

/** Palabras que se pronuncian (por ejemplo «Gracias, Alejo, por…»). */
export interface SpokenBlock {
  type: 'spoken'
  text: string
}

/** Una lista de elementos (como los elementos del altar). */
export interface ListBlock {
  type: 'list'
  items: string[]
}

/** Texto en verso: oraciones, invocaciones, bendiciones. Cada estrofa es un arreglo de versos. */
export interface VerseBlock {
  type: 'verse'
  title?: string
  stanzas: string[][]
}

/** Subtítulo interno de una sección. */
export interface HeadingBlock {
  type: 'heading'
  text: string
}

export type Block = ParagraphBlock | SpokenBlock | ListBlock | VerseBlock | HeadingBlock

/** Una sección con título opcional y bloques de contenido. */
export interface Section {
  title?: string
  blocks: Block[]
}

export type IllustrationKey =
  | 'umbral'
  | 'memoria'
  | 'manos'
  | 'casa'
  | 'raices'
  | 'alegria'
  | 'mujer'
  | 'jardin'
  | 'luna'

/** Una de las jornadas I a VIII. */
export interface Day {
  number: number
  roman: string
  title: string
  subtitle: string
  illustration: IllustrationKey
  /** Invitación a encender la luz (línea inicial del manuscrito). */
  opening: Block[]
  /** Lectura completa del día. */
  reading: Block[]
  /** Oración particular. */
  prayer: VerseBlock & { title: string }
  /** Gesto botánico o ceremonial. */
  gesture: Section & { title: string }
  /** Línea final que conduce a la oración de cierre. */
  closing: Block[]
}

/** La novena jornada tiene una estructura propia: ceremonia lunar. */
export interface FinalDay {
  number: 9
  roman: 'IX'
  title: string
  subtitle: string
  illustration: 'luna'
  opening: Section & { title: string }
  reading: Section & { title: string }
  blessing: VerseBlock & { title: string }
  gestureTitle: string
  moments: {
    ofrenda: Section & { title: string }
    fuegoAgua: Section & { title: string }
    luna: Section & { title: string }
  }
  lastLight: Section & { title: string }
}
