import { candleRestMessage } from '../content/novena'
import { useSanctuary } from '../state/Sanctuary'
import { useSvgId } from '../illustrations/botanicals'

/**
 * Vela digital: acompañamiento simbólico.
 * Un toque la enciende; otro toque la deja descansar.
 * El estado es compartido entre páginas durante la visita.
 */
export function Candle({ size = 'full' }: { size?: 'full' | 'compact' }) {
  const { candle, lightCandle, restCandle } = useSanctuary()
  const lit = candle === 'lit'
  const body = useSvgId('cirio')
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
        <svg viewBox="0 0 120 220" aria-hidden="true" focusable="false">
          <defs>
            <radialGradient id={halo}>
              <stop offset="0" stopColor="#FCE7B0" stopOpacity="0.95" />
              <stop offset="0.4" stopColor="#F5D894" stopOpacity="0.35" />
              <stop offset="1" stopColor="#F5D894" stopOpacity="0" />
            </radialGradient>
            <linearGradient id={body} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#E9E1CE" />
              <stop offset="0.35" stopColor="#FBF8F0" />
              <stop offset="0.7" stopColor="#F4EEDF" />
              <stop offset="1" stopColor="#DDD3BF" />
            </linearGradient>
            <radialGradient id={flame} cx="0.5" cy="0.75" r="0.75">
              <stop offset="0" stopColor="#FFFBEA" />
              <stop offset="0.45" stopColor="#FBE3A0" />
              <stop offset="1" stopColor="#E9AE4F" />
            </radialGradient>
          </defs>
          <circle className="vela-halo" cx="60" cy="62" r="58" fill={`url(#${halo})`} />
          {/* Cuerpo del velón */}
          <path d="M34 92 L34 206 Q60 214 86 206 L86 92Z" fill={`url(#${body})`} stroke="#CDBF9F" strokeWidth="0.8" />
          <ellipse cx="60" cy="92" rx="26" ry="6" fill="#F6F1E4" stroke="#CDBF9F" strokeWidth="0.8" />
          <ellipse className="vela-cera" cx="60" cy="92" rx="10" ry="2.4" fill="#F1DFAF" />
          <path d="M44 100 Q46 140 42 180" stroke="#FFFFFF" strokeWidth="3" opacity="0.6" fill="none" strokeLinecap="round" />
          {/* Ramita de romero al pie */}
          <path d="M18 210 Q60 204 104 210" stroke="#B69B65" strokeWidth="0.8" fill="none" />
          {/* Pabilo */}
          <path d="M60 92 Q61 86 60 80" stroke="#4E463A" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          {/* Humo al apagar */}
          <path className="vela-humo" d="M60 78 C54 66 66 58 59 46 C54 37 63 30 60 20" stroke="#B9B2A3" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          {/* Llama */}
          <g className="vela-llama">
            <path d="M60 82 C72 72 72 54 60 30 C48 54 48 72 60 82Z" fill={`url(#${flame})`} />
            <path d="M60 80 C65 74 65 64 60 54 C55 64 55 74 60 80Z" fill="#FFFDF5" opacity="0.9" />
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
