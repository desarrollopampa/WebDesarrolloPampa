<script setup lang="ts">
import { computed } from 'vue'
import { useSeleccion, type Modalidad } from '@/composables/useSeleccion'
import { vReveal } from '@/composables/useReveal'

const modos: { id: Modalidad; parte: string; titulo: string; texto: string; color: string }[] = [
  { id: 'listo', parte: 'El tallo', titulo: 'Listo', texto: 'Usás uno de nuestros sistemas tal como viene, desde el primer día.', color: '#103B3F' },
  { id: 'adaptado', parte: 'El bowl', titulo: 'Adaptado', texto: 'Partimos de nuestra base y la ajustamos a tu forma de trabajar, tu marca y tus datos.', color: '#9CC33A' },
  { id: 'medida', parte: 'El pie', titulo: 'A medida', texto: 'Construimos lo que todavía no existe, con la misma base sólida.', color: '#5F8FDB' },
]

const { modalidad } = useSeleccion()
const actual = computed(() => modalidad.value ?? 'listo')
const fill = (id: Modalidad, color: string) => (actual.value === id ? color : '#DDE2DA')
</script>

<template>
  <section id="como" class="bg-niebla py-24 sm:py-32">
    <div class="mx-auto grid max-w-[1440px] gap-12 px-4 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-12">
      <div v-reveal class="relative mx-auto w-full max-w-[460px]">
        <svg viewBox="-6 -6 52 52" class="block h-auto w-full" role="img" aria-label="La P de Desarrollo Pampa dividida en tres lotes">
          <g class="cursor-pointer" @click="modalidad = 'listo'">
            <rect x="0" y="0" width="12" height="25" rx="3" :fill="fill('listo', '#103B3F')" class="transition-[fill] duration-500" />
          </g>
          <g class="cursor-pointer" @click="modalidad = 'medida'">
            <rect
              x="0"
              y="28"
              width="12"
              height="12"
              rx="3"
              :fill="fill('medida', '#5F8FDB')"
              class="transition-all duration-500"
              :style="{ transform: actual === 'medida' ? 'translate(-2px, 2px)' : 'none' }"
            />
          </g>
          <g class="cursor-pointer" @click="modalidad = 'adaptado'">
            <path
              d="M18 0H27.5A12.5 12.5 0 0 1 27.5 25H18A3 3 0 0 1 15 22V3A3 3 0 0 1 18 0Z"
              :fill="fill('adaptado', '#9CC33A')"
              class="transition-all duration-500"
              :style="{ transform: actual === 'adaptado' ? 'translate(2px, -2px)' : 'none' }"
            />
          </g>
        </svg>
      </div>

      <div>
        <p v-reveal class="font-mono text-xs uppercase tracking-[0.18em] text-grafito-2">03 · Cómo trabajamos</p>
        <h2 v-reveal="80" class="mt-4 font-display text-[clamp(2.2rem,5vw,4.4rem)] font-bold leading-[0.95] tracking-[-0.03em] text-petroleo">
          Tres formas de trabajar.<br />Una sola P.
        </h2>
        <p v-reveal="140" class="mt-5 max-w-[520px] text-lg text-grafito">
          Cada parte del logo es una manera de ayudarte. Elegí la tuya y la llevamos al presupuesto.
        </p>

        <div class="mt-10 grid gap-2" role="radiogroup" aria-label="Forma de trabajo">
          <button
            v-for="(m, i) in modos"
            :key="m.id"
            type="button"
            role="radio"
            :aria-checked="actual === m.id"
            class="grid min-h-[88px] grid-cols-[48px_1fr] items-center gap-4 rounded-2xl px-5 py-4 text-left transition-colors"
            :class="actual === m.id ? 'bg-white ring-2 ring-petroleo' : 'bg-transparent ring-1 ring-grafito/12 hover:bg-white/70'"
            @click="modalidad = m.id"
          >
            <span class="font-mono text-sm text-grafito-2">0{{ i + 1 }}</span>
            <span>
              <span class="flex flex-wrap items-baseline gap-x-3">
                <span class="font-display text-2xl font-bold text-petroleo">{{ m.titulo }}</span>
                <span class="font-mono text-[11px] uppercase tracking-[0.14em] text-grafito-2">{{ m.parte }}</span>
              </span>
              <span class="mt-1 block text-grafito">{{ m.texto }}</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
