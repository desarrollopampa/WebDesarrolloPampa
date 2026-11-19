<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import PMark from './PMark.vue'

const canvas = ref<HTMLCanvasElement | null>(null)
const host = ref<HTMLElement | null>(null)
const sembrados = ref(0)

type Rgb = [number, number, number]
interface Tile {
  x: number
  y: number
  e: number
  semilla: Rgb | null
}

const hex = (h: string): Rgb => [
  parseInt(h.slice(1, 3), 16),
  parseInt(h.slice(3, 5), 16),
  parseInt(h.slice(5, 7), 16),
]
const mix = (a: Rgb, b: Rgb, t: number) =>
  `rgb(${Math.round(a[0] + (b[0] - a[0]) * t)},${Math.round(a[1] + (b[1] - a[1]) * t)},${Math.round(a[2] + (b[2] - a[2]) * t)})`

const BASE_TALLO = hex('#1A4D51')
const BASE_PIE = hex('#174649')
const BASE_BOWL = hex('#1E5A5E')
const LIMA = hex('#D6F46A')
const SEMILLAS: Rgb[] = [hex('#D6F46A'), hex('#A9C8F5'), hex('#F4A27C'), hex('#F4F6F0')]

const BOWL = new Path2D('M18 0H27.5A12.5 12.5 0 0 1 27.5 25H18A3 3 0 0 1 15 22V3A3 3 0 0 1 18 0Z')

let tiles: Tile[] = []
let cell = 56
let cols = 0
let rows = 0
let raf = 0
let start = 0
let mouse: { x: number; y: number } | null = null
let ctx: CanvasRenderingContext2D | null = null
let dpr = 1
let reduced = false
let ro: ResizeObserver | null = null

const layout = () => {
  const c = canvas.value
  const h = host.value
  if (!c || !h) return
  const w = h.clientWidth
  const hh = h.clientHeight
  dpr = Math.min(window.devicePixelRatio || 1, 2)
  c.width = Math.round(w * dpr)
  c.height = Math.round(hh * dpr)
  c.style.width = `${w}px`
  c.style.height = `${hh}px`
  cell = w < 640 ? 40 : 56
  cols = Math.ceil(w / cell) + 1
  rows = Math.ceil(hh / cell) + 1
  const prev = new Map(tiles.map((t) => [`${t.x},${t.y}`, t.semilla]))
  tiles = []
  for (let r = 0; r < rows; r++) {
    for (let col = 0; col < cols; col++) {
      tiles.push({ x: col, y: r, e: 0, semilla: prev.get(`${col},${r}`) ?? null })
    }
  }
  ctx = c.getContext('2d')
  draw(performance.now())
}

const drawP = (t: Tile, color: Rgb | null) => {
  if (!ctx) return
  const s = (cell * 0.64) / 40
  const ox = t.x * cell + cell * 0.18
  const oy = t.y * cell + cell * 0.18
  const e = t.e
  ctx.save()
  ctx.translate(ox, oy)
  ctx.scale(s, s)
  const target = color ?? LIMA
  const k = color ? 1 : e
  ctx.fillStyle = mix(BASE_TALLO, target, k * 0.85)
  ctx.beginPath()
  ctx.roundRect(0, 0, 12, 25, 3)
  ctx.fill()
  ctx.fillStyle = mix(BASE_PIE, target, k * 0.7)
  ctx.beginPath()
  ctx.roundRect(0, 28, 12, 12, 3)
  ctx.fill()
  ctx.fillStyle = mix(BASE_BOWL, target, k)
  ctx.fill(BOWL)
  ctx.restore()
}

const draw = (now: number) => {
  if (!ctx || !canvas.value) return
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.fillStyle = '#103B3F'
  ctx.fillRect(0, 0, canvas.value.width, canvas.value.height)
  const elapsed = (now - start) / 1000
  let activo = false
  for (const t of tiles) {
    if (!reduced && elapsed < 2.4) {
      const frente = elapsed * 1.1 - (t.x / cols) * 1.2 - (t.y / rows) * 0.35
      if (frente > 0 && frente < 0.5) t.e = Math.max(t.e, Math.sin((frente / 0.5) * Math.PI) * 0.9)
    }
    if (mouse) {
      const cx = t.x * cell + cell / 2
      const cy = t.y * cell + cell / 2
      const d = Math.hypot(cx - mouse.x, cy - mouse.y)
      const R = cell * 2.6
      if (d < R) t.e = Math.max(t.e, 1 - d / R)
    }
    drawP(t, t.semilla)
    t.e *= 0.93
    if (t.e > 0.01) activo = true
    else t.e = 0
  }
  if (!reduced && (activo || elapsed < 2.4)) raf = requestAnimationFrame(draw)
  else raf = 0
}

const kick = () => {
  if (!raf && !reduced) raf = requestAnimationFrame(draw)
}

const onMove = (ev: PointerEvent) => {
  const rect = host.value?.getBoundingClientRect()
  if (!rect) return
  mouse = { x: ev.clientX - rect.left, y: ev.clientY - rect.top }
  kick()
}

const onLeave = () => {
  mouse = null
}

const onClick = (ev: MouseEvent) => {
  const target = ev.target as HTMLElement
  if (target.closest('a,button')) return
  const rect = host.value?.getBoundingClientRect()
  if (!rect) return
  const col = Math.floor((ev.clientX - rect.left) / cell)
  const row = Math.floor((ev.clientY - rect.top) / cell)
  const t = tiles.find((x) => x.x === col && x.y === row)
  if (!t) return
  if (t.semilla) {
    t.semilla = null
    sembrados.value--
  } else {
    t.semilla = SEMILLAS[sembrados.value % SEMILLAS.length] ?? LIMA
    sembrados.value++
  }
  if (reduced) draw(performance.now())
  else kick()
}

onMounted(() => {
  reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  start = performance.now()
  layout()
  kick()
  ro = new ResizeObserver(() => layout())
  if (host.value) ro.observe(host.value)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  ro?.disconnect()
})
</script>

<template>
  <section
    id="inicio"
    ref="host"
    class="relative min-h-[100svh] overflow-hidden bg-petroleo text-niebla"
    @pointermove="onMove"
    @pointerleave="onLeave"
    @click="onClick"
  >
    <canvas ref="canvas" class="absolute inset-0 block" aria-hidden="true"></canvas>

    <div class="pointer-events-none relative z-10 mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-end px-4 pb-10 pt-28 sm:px-8 lg:px-12 lg:pb-14">
      <div class="pointer-events-auto max-w-[760px] rounded-[18px] bg-petroleo/95 p-6 ring-1 ring-white/10 sm:p-9">
        <p class="font-mono text-xs uppercase tracking-[0.18em] text-cielo">
          Lote 00 · Córdoba, Argentina · Software por lotes
        </p>
        <h1 class="mt-5 font-display text-[clamp(2.3rem,min(5.4vw,8vh),4.9rem)] font-bold leading-[0.92] tracking-[-0.035em]">
          Una familia del interior que siembra
          <span class="text-lima">software</span> para negocios reales.
        </h1>
        <p class="mt-5 max-w-[560px] text-lg leading-relaxed text-niebla/85">
          Tenemos cuatro sistemas funcionando. Usá uno tal como viene, pedinos que lo adaptemos o lo hacemos a medida, con la misma base.
        </p>
        <div class="mt-7 flex flex-wrap gap-3">
          <a
            href="#lotes"
            class="inline-flex min-h-12 items-center gap-2 rounded-xl bg-lima px-6 font-display text-base font-semibold text-petroleo transition-transform hover:-translate-y-0.5"
          >
            Recorrer los lotes
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M6 13l6 6 6-6" /></svg>
          </a>
          <a
            href="#presupuesto"
            class="inline-flex min-h-12 items-center rounded-xl px-6 font-display text-base font-semibold text-niebla ring-1 ring-niebla/30 transition-colors hover:bg-niebla/10"
          >
            Contanos tu proyecto
          </a>
        </div>
      </div>

      <div class="pointer-events-none mt-6 flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.14em] text-niebla/70">
        <span class="hidden items-center gap-2 sm:flex">
          <PMark :size="14" tallo="#F4F6F0" bowl="#D6F46A" pie="#A9C8F5" />
          Pasá el cursor: el campo responde. Hacé clic para sembrar.
        </span>
        <span class="sm:hidden">Tocá el campo para sembrar.</span>
        <span aria-live="polite">{{ sembrados }} {{ sembrados === 1 ? 'lote sembrado' : 'lotes sembrados' }}</span>
      </div>
    </div>
  </section>
</template>
