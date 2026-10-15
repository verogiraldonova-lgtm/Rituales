import { paintings, type PaintingKey } from '../illustrations/paintings'

/** Lámina pintada, liviana en el celular gracias a dos tamaños. */
export function Painting({ name, eager = false }: { name: PaintingKey; eager?: boolean }) {
  const p = paintings[name]
  return (
    <figure className="pintura">
      <img
        src={p.src}
        srcSet={`${p.small} ${p.smallWidth}w, ${p.src} ${p.width}w`}
        sizes="(max-width: 40rem) 100vw, 40rem"
        width={p.width}
        height={p.height}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        alt={p.alt}
      />
    </figure>
  )
}
