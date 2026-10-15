import altar from '../assets/altar.webp'
import altarSmall from '../assets/altar-900.webp'

/** Lámina pintada del altar (referencia visual de toda la novena). */
export function AltarImage() {
  return (
    <figure className="altar-imagen">
      <img
        src={altar}
        srcSet={`${altarSmall} 900w, ${altar} 1536w`}
        sizes="(max-width: 40rem) 100vw, 40rem"
        width={1536}
        height={1024}
        loading="lazy"
        decoding="async"
        alt="El altar: la pirámide sobre una tela clara, el velón encendido, la orquídea blanca viva, la amatista, el cuenco con agua, ramas de romero, flores de manzanilla y un papel con un lápiz violeta."
      />
    </figure>
  )
}
