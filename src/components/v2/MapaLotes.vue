<script setup lang="ts">
import { computed, ref, type Component } from 'vue'
import { LOTES, type LoteId } from '@/data/lotes'
import { useSeleccion } from '@/composables/useSeleccion'
import { vReveal } from '@/composables/useReveal'
import DemoTienda from './demos/DemoTienda.vue'
import DemoTurnos from './demos/DemoTurnos.vue'
import DemoTaller from './demos/DemoTaller.vue'
import DemoMedida from './demos/DemoMedida.vue'

const DEMOS: Record<LoteId, Component> = {
  tienda: DemoTienda,
  turnos: DemoTurnos,
  taller: DemoTaller,
  medida: DemoMedida,
}

const GEO: Record<LoteId, { x: number; y: number; w: number; h: number }> = {
  tienda: { x: 16, y: 16, w: 330, h: 250 },
  turnos: { x: 362, y: 16, w: 222, h: 360 },
  taller: { x: 16, y: 282, w: 330, h: 302 },
  medida: { x: 362, y: 392, w: 222, h: 192 },
}

const activo = ref<LoteId>('tienda')
const hover = ref<LoteId | null>(null)
const lote = computed(() => LOTES.find((l) => l.id === activo.value)!)
const { pedirLote } = useSeleccion()

const stack = computed(() => {
  const s = lote.value.project.techStack
  return [...s.frontend.slice(0, 2), ...s.backend.slice(0, 3), ...s.infrastructure.slice(0, 1)]
})

const elegir = (id: LoteId) => {
  activo.value = id
}

const tabs = ref<HTMLButtonElement[]>([])
const onTabKey = (ev: KeyboardEvent, i: number) => {
  const dir = ev.key === 'ArrowRight' ? 1 : ev.key === 'ArrowLeft' ? -1 : 0
  if (!dir) return
  ev.preventDefault()
  const next = (i + dir + LOTES.length) % LOTES.length
  const l = LOTES[next]
  if (!l) return
  activo.value = l.id
  tabs.value[next]?.focus()
}
</script>

<template>
  <section id="lotes" class="bg-niebla py-24 sm:py-32">
    <div class="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
      <div class="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
        <div v-reveal>
          <p class="font-mono text-xs uppercase tracking-[0.18em] text-grafito-2">01 · El campo</p>
          <h2 class="mt-4 font-display text-[clamp(2.2rem,5vw,4.4rem)] font-bold leading-[0.95] tracking-[-0.03em] text-petroleo">
            Cuatro lotes sembrados.<br />Todos funcionando.
          </h2>
        </div>
        <p v-reveal="120" class="max-w-[520px] text-lg leading-relaxed text-grafito lg:justify-self-end">
          Visto desde arriba, esto es lo que ya hicimos. Elegí un lote y probalo acá mismo: son versiones reales de los sistemas, con datos de ejemplo.
        </p>
      </div>

      <div
        class="mt-12 flex gap-1.5 overflow-x-auto pb-2"
        role="tablist"
        aria-label="Lotes"
      >
        <button
          v-for="(l, i) in LOTES"
          :id="`tab-${l.id}`"
          :key="l.id"
          ref="tabs"
          type="button"
          role="tab"
          :aria-selected="activo === l.id"
          :aria-controls="`panel-lote`"
          :tabindex="activo === l.id ? 0 : -1"
          class="flex min-h-12 shrink-0 items-center gap-2.5 rounded-xl px-4 font-display text-sm font-semibold transition-colors"
          :class="activo === l.id ? 'bg-petroleo text-niebla' : 'bg-white text-grafito ring-1 ring-grafito/10 hover:ring-grafito/30'"
          @click="elegir(l.id)"
          @keydown="onTabKey($event, i)"
        >
          <span class="h-3 w-3 rounded-[3px] ring-1 ring-black/10" :style="{ background: l.color }" aria-hidden="true"></span>
          <span class="font-mono text-[11px] opacity-70">{{ l.numero }}</span>
          {{ l.nombre }}
        </button>
      </div>

      <div class="mt-4 grid gap-4 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        <div class="relative overflow-hidden rounded-[22px] bg-petroleo p-3 sm:p-4 lg:sticky lg:top-24 lg:self-start">
          <svg viewBox="0 0 600 600" class="block h-auto w-full" aria-hidden="true">
            <defs>
              <pattern
                v-for="l in LOTES"
                :id="`surco-${l.id}`"
                :key="l.id"
                width="12"
                height="12"
                patternUnits="userSpaceOnUse"
                :patternTransform="`rotate(${l.angulo})`"
              >
                <rect width="12" height="12" :fill="activo === l.id ? l.color : '#174649'" />
                <rect
                  v-if="l.id !== 'medida'"
                  width="12"
                  height="3"
                  :fill="activo === l.id ? 'rgba(16,59,63,0.22)' : l.color"
                  :opacity="activo === l.id ? 1 : hover === l.id ? 0.7 : 0.38"
                />
                <circle
                  v-else
                  cx="6"
                  cy="6"
                  r="1.4"
                  :fill="activo === l.id ? '#103B3F' : '#F4F6F0'"
                  :opacity="activo === l.id ? 0.35 : hover === l.id ? 0.7 : 0.35"
                />
              </pattern>
            </defs>

            <g
              v-for="l in LOTES"
              :key="l.id"
              class="cursor-pointer"
              @click="elegir(l.id)"
              @mouseenter="hover = l.id"
              @mouseleave="hover = null"
            >
              <rect
                :x="GEO[l.id].x"
                :y="GEO[l.id].y"
                :width="GEO[l.id].w"
                :height="GEO[l.id].h"
                rx="18"
                :fill="`url(#surco-${l.id})`"
                :stroke="l.id === 'medida' && activo !== l.id ? '#F4F6F0' : 'none'"
                stroke-opacity="0.45"
                stroke-width="1.5"
                :stroke-dasharray="l.id === 'medida' ? '6 6' : undefined"
              />
              <rect
                :x="GEO[l.id].x + 14"
                :y="GEO[l.id].y + 14"
                :width="l.nombre.length * 11 + 70"
                height="52"
                rx="10"
                :fill="activo === l.id ? '#103B3F' : '#F4F6F0'"
              />
              <text
                :x="GEO[l.id].x + 28"
                :y="GEO[l.id].y + 34"
                font-family="IBM Plex Mono, monospace"
                font-size="11"
                letter-spacing="1.5"
                :fill="activo === l.id ? l.id === 'medida' ? '#F4F6F0' : l.color : '#4A5658'"
              >LOTE {{ l.numero }}</text>
              <text
                :x="GEO[l.id].x + 28"
                :y="GEO[l.id].y + 55"
                font-family="Space Grotesk, sans-serif"
                font-weight="700"
                font-size="18"
                :fill="activo === l.id ? '#F4F6F0' : '#103B3F'"
              >{{ l.nombre }}</text>
            </g>

            <g transform="translate(548 560)" opacity="0.7">
              <path d="M0 -14 L6 4 L0 0 L-6 4 Z" fill="#F4F6F0" />
              <text x="0" y="18" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="10" fill="#F4F6F0">N</text>
            </g>
          </svg>
          <p class="mt-3 px-1 font-mono text-[11px] uppercase tracking-[0.14em] text-niebla/70">
            Vista aérea · cada surco es un negocio que ya usa el sistema
          </p>
        </div>

        <div
          id="panel-lote"
          role="tabpanel"
          :aria-labelledby="`tab-${lote.id}`"
          class="flex flex-col rounded-[22px] bg-white p-5 ring-1 ring-grafito/10 sm:p-8"
        >
          <Transition mode="out-in" enter-from-class="opacity-0 translate-y-2" leave-to-class="opacity-0 -translate-y-2" enter-active-class="transition duration-300" leave-active-class="transition duration-200">
            <div :key="lote.id" class="flex h-full flex-col">
              <div class="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p class="font-mono text-xs uppercase tracking-[0.16em]" :style="{ color: lote.colorTexto }">
                    Lote {{ lote.numero }} · {{ lote.producto }}
                  </p>
                  <h3 class="mt-2 font-display text-3xl font-bold tracking-tight text-petroleo sm:text-4xl">{{ lote.nombre }}</h3>
                  <p class="mt-1 text-sm text-grafito-2">{{ lote.rubro }}</p>
                </div>
                <span class="rounded-full bg-niebla px-3 py-1.5 font-mono text-[11px] text-grafito">
                  {{ lote.project.deploymentModes.join(' · ') }}
                </span>
              </div>

              <p class="mt-4 max-w-[560px] text-lg leading-relaxed text-grafito">{{ lote.promesa }}</p>

              <div class="mt-6 rounded-2xl bg-niebla p-4 sm:p-5">
                <div class="mb-3 flex items-center justify-between">
                  <span class="font-mono text-[11px] uppercase tracking-[0.14em] text-grafito-2">Probalo · datos de ejemplo</span>
                  <span class="flex gap-1" aria-hidden="true">
                    <span class="h-2 w-2 rounded-full bg-grafito/20"></span>
                    <span class="h-2 w-2 rounded-full bg-grafito/20"></span>
                    <span class="h-2 w-2 rounded-full" :style="{ background: lote.id === 'medida' ? '#103B3F' : lote.color }"></span>
                  </span>
                </div>
                <component :is="DEMOS[lote.id]" />
              </div>

              <div class="mt-6 grid gap-6 sm:grid-cols-2">
                <ul class="space-y-2">
                  <li v-for="r in lote.resuelve" :key="r" class="flex gap-2.5 text-sm text-grafito">
                    <svg width="16" height="16" viewBox="0 0 40 40" class="mt-0.5 shrink-0" aria-hidden="true"><path d="M18 0H27.5A12.5 12.5 0 0 1 27.5 25H18A3 3 0 0 1 15 22V3A3 3 0 0 1 18 0Z" :fill="lote.id === 'medida' ? '#103B3F' : lote.colorTexto" /></svg>
                    {{ r }}
                  </li>
                </ul>
                <div class="flex flex-wrap content-start gap-1.5">
                  <span v-for="t in stack" :key="t" class="rounded-md bg-niebla px-2 py-1 font-mono text-[11px] text-grafito-2">{{ t }}</span>
                </div>
              </div>

              <div class="mt-auto flex flex-wrap gap-2 pt-8">
                <button
                  type="button"
                  class="inline-flex min-h-12 items-center rounded-xl bg-petroleo px-5 font-display font-semibold text-niebla transition-transform hover:-translate-y-0.5"
                  @click="pedirLote(lote.id)"
                >{{ lote.id === 'medida' ? 'Quiero algo a medida' : 'Quiero este lote' }}</button>
                <a
                  v-if="lote.project.liveUrl"
                  :href="lote.project.liveUrl"
                  target="_blank"
                  rel="noopener"
                  class="inline-flex min-h-12 items-center gap-2 rounded-xl px-5 font-display font-semibold text-petroleo ring-1 ring-petroleo/25 hover:bg-niebla"
                >
                  Abrir la demo completa
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" /></svg>
                </a>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>
