import type { Block, VerseBlock } from '../content/types'
import { BotanicalInitial } from '../illustrations/emblems'

type HeadingLevel = 'h2' | 'h3' | 'h4'

/**
 * Texto con capitular ilustrada. La letra se dibuja en el SVG y se repite
 * oculta para lectores de pantalla, así la palabra se lee completa.
 */
function WithInitial({ text, seed }: { text: string; seed: number }) {
  const first = text.charAt(0)
  return (
    <>
      <BotanicalInitial letter={first} seed={seed} />
      <span className="sr-only">{first}</span>
      {text.slice(1)}
    </>
  )
}

/** Texto en verso: cada estrofa es un párrafo y cada verso una línea. */
export function Verse({
  verse,
  headingLevel = 'h2',
  showTitle = true,
  className = '',
  initial = false,
}: {
  verse: VerseBlock
  headingLevel?: HeadingLevel
  showTitle?: boolean
  className?: string
  /** Capitular botánica en la primera letra. */
  initial?: boolean
}) {
  const Heading = headingLevel
  return (
    <div className={`verso ${className}`}>
      {showTitle && verse.title && <Heading className="verso-titulo">{verse.title}</Heading>}
      {verse.stanzas.map((stanza, i) => (
        <p className={`estrofa ${initial && i === 0 ? 'con-capitular' : ''}`} key={i}>
          {stanza.map((line, j) => (
            <span className="verso-linea" key={j}>
              {initial && i === 0 && j === 0 ? <WithInitial text={line} seed={17} /> : line}
              {j < stanza.length - 1 && <br />}
            </span>
          ))}
        </p>
      ))}
    </div>
  )
}

/** Renderiza una secuencia de bloques del manuscrito. */
export function Blocks({
  blocks,
  dropCap = false,
  headingLevel = 'h3',
  seed = 1,
}: {
  blocks: Block[]
  dropCap?: boolean
  headingLevel?: HeadingLevel
  /** Variación de la ilustración de la capitular. */
  seed?: number
}) {
  let firstParagraph = dropCap
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'p': {
            const cap = firstParagraph
            firstParagraph = false
            return cap ? (
              <p key={i} className="con-capitular">
                <WithInitial text={block.text} seed={seed} />
              </p>
            ) : (
              <p key={i}>{block.text}</p>
            )
          }
          case 'spoken':
            return (
              <p key={i} className="palabras-dichas">
                {block.text}
              </p>
            )
          case 'list':
            return (
              <ul key={i} className="lista-botanica">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )
          case 'verse':
            return <Verse key={i} verse={block} headingLevel={headingLevel} className="verso-interior" />
          case 'heading': {
            const H = headingLevel
            return <H key={i}>{block.text}</H>
          }
        }
      })}
    </>
  )
}
