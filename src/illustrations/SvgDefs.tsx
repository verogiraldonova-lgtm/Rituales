/**
 * Filtros compartidos por todas las ilustraciones.
 * #acuarela: bordes orgánicos y granulado de pigmento para las aguadas.
 */
export function SvgDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true" focusable="false">
      <defs>
        <filter id="acuarela" x="-15%" y="-15%" width="130%" height="130%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" seed="7" result="ruido" />
          <feDisplacementMap in="SourceGraphic" in2="ruido" scale="3.2" xChannelSelector="R" yChannelSelector="G" result="borde" />
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="3" result="grano" />
          <feColorMatrix in="grano" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -0.75 1.12" result="granoAlfa" />
          <feComposite in="borde" in2="granoAlfa" operator="in" result="pigmento" />
          <feGaussianBlur in="pigmento" stdDeviation="0.3" />
        </filter>
      </defs>
    </svg>
  )
}
