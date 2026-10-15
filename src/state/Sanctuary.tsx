import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { readStored, writeStored } from './storage'

/**
 * Estado compartido del santuario:
 * - tamaño de letra (recordado en el dispositivo)
 * - jornadas marcadas como leídas (recordadas en el dispositivo)
 * - la vela digital (encendida o en reposo, solo durante la visita)
 */

export const FONT_STEPS = [0.9, 1, 1.12, 1.25, 1.4, 1.55] as const
const DEFAULT_STEP = 1

export type CandleState = 'unlit' | 'lit' | 'resting'

interface SanctuaryValue {
  fontStep: number
  canDecrease: boolean
  canIncrease: boolean
  decreaseFont: () => void
  increaseFont: () => void
  readDays: number[]
  isRead: (day: number) => boolean
  toggleRead: (day: number) => void
  candle: CandleState
  lightCandle: () => void
  restCandle: () => void
}

const SanctuaryContext = createContext<SanctuaryValue | null>(null)

export function SanctuaryProvider({ children }: { children: ReactNode }) {
  const [fontStep, setFontStep] = useState<number>(() => {
    const stored = readStored<number>('tamano-letra', DEFAULT_STEP)
    return Number.isInteger(stored) && stored >= 0 && stored < FONT_STEPS.length ? stored : DEFAULT_STEP
  })
  const [readDays, setReadDays] = useState<number[]>(() => {
    const stored = readStored<unknown>('jornadas-leidas', [])
    return Array.isArray(stored) ? stored.filter((n): n is number => Number.isInteger(n) && n >= 1 && n <= 9) : []
  })
  const [candle, setCandle] = useState<CandleState>('unlit')

  useEffect(() => {
    document.documentElement.style.setProperty('--escala-texto', String(FONT_STEPS[fontStep]))
    writeStored('tamano-letra', fontStep)
  }, [fontStep])

  useEffect(() => {
    writeStored('jornadas-leidas', readDays)
  }, [readDays])

  const decreaseFont = useCallback(() => setFontStep((s) => Math.max(0, s - 1)), [])
  const increaseFont = useCallback(() => setFontStep((s) => Math.min(FONT_STEPS.length - 1, s + 1)), [])
  const toggleRead = useCallback(
    (day: number) =>
      setReadDays((list) => (list.includes(day) ? list.filter((d) => d !== day) : [...list, day].sort((a, b) => a - b))),
    [],
  )
  const lightCandle = useCallback(() => setCandle('lit'), [])
  const restCandle = useCallback(() => setCandle((c) => (c === 'lit' ? 'resting' : c)), [])

  const value = useMemo<SanctuaryValue>(
    () => ({
      fontStep,
      canDecrease: fontStep > 0,
      canIncrease: fontStep < FONT_STEPS.length - 1,
      decreaseFont,
      increaseFont,
      readDays,
      isRead: (day) => readDays.includes(day),
      toggleRead,
      candle,
      lightCandle,
      restCandle,
    }),
    [fontStep, decreaseFont, increaseFont, readDays, toggleRead, candle, lightCandle, restCandle],
  )

  return <SanctuaryContext.Provider value={value}>{children}</SanctuaryContext.Provider>
}

export function useSanctuary(): SanctuaryValue {
  const ctx = useContext(SanctuaryContext)
  if (!ctx) throw new Error('useSanctuary debe usarse dentro de SanctuaryProvider')
  return ctx
}
