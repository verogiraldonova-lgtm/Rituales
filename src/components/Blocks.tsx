import type { Block, VerseBlock } from '../content/types'

type HeadingLevel = 'h2' | 'h3' | 'h4'

/** Texto en verso: cada estrofa es un párrafo y cada verso una línea. */
export function Verse({
  verse,
  headingLevel = 'h2',
  showTitle = true,
  className = '',
}: {
  verse: VerseBlock
  headingLevel?: HeadingLevel
  showTitle?: boolean
  className?: string
}) {
  const Heading = headingLevel
  return (
    <div className={`verso ${className}`}>
      {showTitle && verse.title && <Heading className="verso-titulo">{verse.title}</Heading>}
      {verse.stanzas.map((stanza, i) => (
        <p className="estrofa" key={i}>
          {stanza.map((line, j) => (
            <span className="verso-linea" key={j}>
              {line}
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
}: {
  blocks: Block[]
  dropCap?: boolean
  headingLevel?: HeadingLevel
}) {
  let firstParagraph = dropCap
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'p': {
            const cap = firstParagraph
            firstParagraph = false
            return (
              <p key={i} className={cap ? 'capitular' : undefined}>
                {block.text}
              </p>
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
