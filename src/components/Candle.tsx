import { candleRestMessage } from '../content/novena'
import { useSanctuary } from '../state/Sanctuary'
import { useSvgId } from '../illustrations/botanicals'
import velon from '../assets/velon.webp'

/**
 * Vela digital: acompañamiento simbólico.
 * Un toque la enciende; otro toque la deja descansar.
 * El estado es compartido entre páginas durante la visita.
 */
export function Candle({ size = 'full' }: { size?: 'full' | 'compact' }) {
  const { candle, lightCandle, restCandle } = useSanctuary()
  const lit = candle === 'lit'
  const halo = useSvgId('halo')
  const flame = useSvgId('llama')

  const toggle = () => (lit ? restCandle() : lightCandle())

  return (
    <div className={`vela vela-${size} ${lit ? 'encendida' : ''} ${candle === 'resting' ? 'en-reposo' : ''}`}>
      <button
        type="button"
        className="vela-boton"
        onClick={toggle}
        aria-pressed={lit}
        aria-label={lit ? 'Apagar la vela digital' : 'Encender la vela digital'}
      >
        <svg viewBox="0 0 100 138" aria-hidden="true" focusable="false">
          <defs>
            <radialGradient id={halo}>
              <stop offset="0" stopColor="#FCE7B0" stopOpacity="0.95" />
              <stop offset="0.4" stopColor="#F5D894" stopOpacity="0.35" />
              <stop offset="1" stopColor="#F5D894" stopOpacity="0" />
            </radialGradient>
            <radialGradient id={flame} cx="0.5" cy="0.75" r="0.75">
              <stop offset="0" stopColor="#FFFBEA" />
              <stop offset="0.45" stopColor="#FBE3A0" />
              <stop offset="1" stopColor="#E9AE4F" />
            </radialGradient>
          </defs>
          <circle className="vela-halo" cx="50" cy="26" r="44" fill={`url(#${halo})`} />
          <image href={velon} x="0" y="30" width="100" height="108" preserveAspectRatio="xMidYMax meet" />
          <g transform="translate(50.3 33.6) scale(0.4) translate(-60 -82)">
            <path className="vela-humo" d="M60 78 C54 66 66 58 59 46 C54 37 63 30 60 20" stroke="#B9B2A3" strokeWidth="2" fill="none" strokeLinecap="round" />
            <g className="vela-llama">
              <path d="M60 82 C72 72 72 54 60 30 C48 54 48 72 60 82Z" fill={`url(#${flame})`} />
              <path d="M60 80 C65 74 65 64 60 54 C55 64 55 74 60 80Z" fill="#FFFDF5" opacity="0.9" />
            </g>
          </g>
        </svg>
      </button>
      <p className="vela-indicacion" aria-hidden="true">
        {lit ? 'Toca de nuevo para dejarla descansar' : 'Toca la vela para encenderla'}
      </p>
      <p className="vela-mensaje" aria-live="polite">
        {candle === 'resting' ? candleRestMessage : ''}
      </p>
      {size === 'full' && (
        <p className="vela-nota">La vela digital es un acompañamiento simbólico: no sustituye el velón ni los gestos del altar.</p>
      )}
    </div>
  )
}
