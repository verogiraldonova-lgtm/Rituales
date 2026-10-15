import { useEffect, useRef } from 'react'

/**
 * Estela de chispas doradas que sigue al cursor (solo con ratón y
 * cuando el dispositivo no pide movimiento reducido).
 */
interface Mote {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  max: number
  size: number
  color: string
  glint: boolean
}

const COLORS = ['#C9A85E', '#E6CF95', '#B69B65', '#CDB8E0', '#F3E3B6']

export function CursorTrail() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const motes: Mote[] = []
    let frame = 0
    let last = performance.now()
    let lx = -1
    let ly = -1

    const draw = (now: number) => {
      const dt = Math.min(48, now - last)
      last = now
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      for (let i = motes.length - 1; i >= 0; i--) {
        const m = motes[i]
        m.life += dt
        if (m.life >= m.max) {
          motes.splice(i, 1)
          continue
        }
        m.x += m.vx * dt
        m.y += m.vy * dt
        m.vy += 0.00004 * dt
        const k = 1 - m.life / m.max
        ctx.globalAlpha = k * 0.9
        ctx.fillStyle = m.color
        ctx.shadowColor = m.color
        ctx.shadowBlur = 6
        ctx.beginPath()
        ctx.arc(m.x, m.y, m.size * (0.4 + k * 0.6), 0, Math.PI * 2)
        ctx.fill()
        if (m.glint) {
          const s = m.size * 3 * k
          ctx.strokeStyle = m.color
          ctx.lineWidth = 0.6
          ctx.beginPath()
          ctx.moveTo(m.x - s, m.y)
          ctx.lineTo(m.x + s, m.y)
          ctx.moveTo(m.x, m.y - s)
          ctx.lineTo(m.x, m.y + s)
          ctx.stroke()
        }
      }
      ctx.globalAlpha = 1
      ctx.shadowBlur = 0
      frame = motes.length ? requestAnimationFrame(draw) : 0
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const dist = lx < 0 ? 0 : Math.hypot(e.clientX - lx, e.clientY - ly)
      lx = e.clientX
      ly = e.clientY
      const count = Math.min(4, 1 + Math.floor(dist / 12))
      for (let i = 0; i < count; i++) {
        motes.push({
          x: e.clientX + (Math.random() - 0.5) * 4,
          y: e.clientY + (Math.random() - 0.5) * 4,
          vx: (Math.random() - 0.5) * 0.03,
          vy: (Math.random() - 0.2) * 0.03,
          life: 0,
          max: 500 + Math.random() * 600,
          size: 0.8 + Math.random() * 1.6,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          glint: Math.random() < 0.18,
        })
      }
      if (motes.length > 160) motes.splice(0, motes.length - 160)
      if (!frame) {
        last = performance.now()
        frame = requestAnimationFrame(draw)
      }
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', resize)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return <canvas ref={ref} className="estela-cursor" aria-hidden="true" />
}
