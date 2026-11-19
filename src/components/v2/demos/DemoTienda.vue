<script setup lang="ts">
import { computed, ref } from 'vue'

const talles = [
  { t: 'S', stock: 4 },
  { t: 'M', stock: 7 },
  { t: 'L', stock: 2 },
  { t: 'XL', stock: 0 },
]
const colores = [
  { id: 'hueso', label: 'Hueso', hex: '#E9E4D8' },
  { id: 'carbon', label: 'Carbón', hex: '#2B2F31' },
  { id: 'oliva', label: 'Oliva', hex: '#6B7046' },
]
const precio = 42000

const talle = ref('M')
const color = ref('carbon')
const cantidad = ref(1)
const enviado = ref(false)

const stockActual = computed(() => talles.find((x) => x.t === talle.value)?.stock ?? 0)
const colorLabel = computed(() => colores.find((c) => c.id === color.value)?.label ?? '')
const total = computed(() => (precio * cantidad.value).toLocaleString('es-AR'))

const elegirTalle = (t: string, stock: number) => {
  if (!stock) return
  talle.value = t
  cantidad.value = Math.min(cantidad.value, stock)
  enviado.value = false
}
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-[1fr_1.1fr]">
    <div class="relative aspect-[4/5] overflow-hidden rounded-xl" :style="{ background: colores.find((c) => c.id === color)?.hex }">
      <svg viewBox="0 0 120 150" class="absolute inset-0 m-auto h-[72%] w-[72%]" aria-hidden="true">
        <path
          d="M38 18 L22 26 L8 58 L24 66 L30 54 L30 136 L90 136 L90 54 L96 66 L112 58 L98 26 L82 18 C78 28 70 32 60 32 C50 32 42 28 38 18 Z"
          :fill="color === 'carbon' ? '#3A4043' : color === 'oliva' ? '#7C8152' : '#F4F0E6'"
          stroke="rgba(0,0,0,0.18)"
        />
      </svg>
      <span class="absolute left-3 top-3 rounded-md bg-grafito px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-niebla">Nuevo</span>
    </div>

    <div class="flex flex-col gap-3">
      <div>
        <p class="font-mono text-[11px] uppercase tracking-wider text-grafito-2">Buzo oversize · ejemplo</p>
        <p class="font-display text-2xl font-bold text-grafito">$ {{ precio.toLocaleString('es-AR') }}</p>
      </div>

      <fieldset>
        <legend class="mb-1.5 text-xs font-semibold text-grafito">Talle</legend>
        <div class="flex gap-1.5">
          <button
            v-for="x in talles"
            :key="x.t"
            type="button"
            :disabled="!x.stock"
            :aria-pressed="talle === x.t"
            class="min-h-11 min-w-11 rounded-lg font-mono text-sm transition-colors disabled:cursor-not-allowed disabled:text-grafito/40 disabled:line-through"
            :class="talle === x.t ? 'bg-grafito text-niebla' : 'bg-white text-grafito ring-1 ring-grafito/15 hover:ring-grafito/40'"
            @click="elegirTalle(x.t, x.stock)"
          >{{ x.t }}</button>
        </div>
        <p class="mt-1 font-mono text-[11px] text-grafito-2">{{ stockActual }} en stock · XL agotado</p>
      </fieldset>

      <fieldset>
        <legend class="mb-1.5 text-xs font-semibold text-grafito">Color · {{ colorLabel }}</legend>
        <div class="flex gap-2">
          <button
            v-for="c in colores"
            :key="c.id"
            type="button"
            :aria-label="c.label"
            :aria-pressed="color === c.id"
            class="h-11 w-11 rounded-full ring-2 ring-offset-2 ring-offset-white transition"
            :class="color === c.id ? 'ring-grafito' : 'ring-transparent'"
            :style="{ background: c.hex }"
            @click="color = c.id; enviado = false"
          ></button>
        </div>
      </fieldset>

      <div class="flex items-center gap-2">
        <button type="button" class="h-11 w-11 rounded-lg bg-white ring-1 ring-grafito/15" aria-label="Restar" @click="cantidad = Math.max(1, cantidad - 1)">−</button>
        <span class="w-8 text-center font-mono" aria-live="polite">{{ cantidad }}</span>
        <button type="button" class="h-11 w-11 rounded-lg bg-white ring-1 ring-grafito/15" aria-label="Sumar" @click="cantidad = Math.min(stockActual, cantidad + 1)">+</button>
        <button
          type="button"
          class="ml-auto min-h-11 rounded-lg bg-[#1F7A4D] px-4 text-sm font-semibold text-white"
          @click="enviado = true"
        >Pedir por WhatsApp</button>
      </div>

      <div v-if="enviado" class="rounded-xl rounded-tr-sm bg-[#DCF3D5] p-3 font-mono text-[12px] leading-relaxed text-grafito" aria-live="polite">
        Hola! Quiero hacer este pedido:<br />
        · Buzo oversize · {{ colorLabel }} · {{ talle }} × {{ cantidad }}<br />
        Total: $ {{ total }}<br />
        <span class="text-grafito-2">utm_source=catalogo</span>
      </div>
    </div>
  </div>
</template>
