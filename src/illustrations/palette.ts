/** Colores de las ilustraciones (coinciden con los tokens de diseño en CSS). */
export const C = {
  ivory: '#F7F3EA',
  orchid: '#FAF9F4',
  sage: '#A4AE98',
  sageLight: '#C5CCBA',
  forest: '#465B49',
  gold: '#B69B65',
  goldLight: '#D9C79E',
  goldInk: '#7E6631',
  sand: '#DDD3BF',
  sandDeep: '#C9BB9E',
  petalShade: '#E9E4D6',
  lip: '#D7B98C',
  amethyst: '#A796BC',
  amethystDeep: '#7D6B98',
  amethystLight: '#D8CFE3',
  water: '#C9D3CB',
  flame: '#F2C46D',
  flameCore: '#FFF4D6',
} as const

/** Generador pseudoaleatorio determinista: las ilustraciones son siempre idénticas. */
export function seeded(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export const r2 = (n: number) => Math.round(n * 100) / 100
