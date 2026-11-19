<script setup lang="ts">
import { computed, ref } from 'vue'

interface Item {
  id: string
  nombre: string
  precio: number
  granel?: boolean
}

const catalogo: Item[] = [
  { id: 'aceite', nombre: 'Aceite 5W40 suelto', precio: 9800, granel: true },
  { id: 'filtro-a', nombre: 'Filtro de aceite', precio: 14500 },
  { id: 'filtro-b', nombre: 'Filtro de aire', precio: 18900 },
  { id: 'mano', nombre: 'Mano de obra service', precio: 25000 },
]

const patente = ref('AB 123 CD')
const modo = ref<'lan' | 'nube'>('lan')
const litros = ref(4.5)
const carrito = ref<string[]>(['aceite'])
const factura = ref<string | null>(null)

const lineas = computed(() =>
  carrito.value.map((id) => {
    const it = catalogo.find((c) => c.id === id)!
    const cant = it.granel ? litros.value : 1
    return { ...it, cant, subtotal: Math.round(it.precio * cant) }
  }),
)
const total = computed(() => lineas.value.reduce((a, l) => a + l.subtotal, 0))

const toggle = (id: string) => {
  factura.value = null
  carrito.value = carrito.value.includes(id) ? carrito.value.filter((x) => x !== id) : [...carrito.value, id]
}

const facturar = () => {
  const n = String(Math.floor(Math.random() * 9000) + 1000)
  factura.value = `Factura B 0003-0000${n}`
}

const fmt = (n: number) => `$ ${n.toLocaleString('es-AR')}`
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <label class="flex items-center gap-2">
        <span class="sr-only">Patente</span>
        <span class="flex flex-col overflow-hidden rounded-md bg-white ring-1 ring-grafito/30">
          <span class="bg-[#1E4FA8] px-2 text-center text-[8px] font-bold tracking-widest text-white">ARGENTINA</span>
          <input v-model="patente" class="w-[110px] bg-transparent px-2 py-0.5 text-center font-mono text-sm font-bold tracking-widest text-grafito outline-none" maxlength="9" />
        </span>
        <span class="text-xs text-grafito-2">Último service: 12.000 km atrás</span>
      </label>
      <button
        type="button"
        class="min-h-11 rounded-full px-3 font-mono text-[11px] uppercase tracking-wider ring-1"
        :class="modo === 'lan' ? 'bg-durazno/30 text-durazno-osc ring-durazno' : 'bg-cielo/40 text-cielo-osc ring-cielo'"
        :aria-label="`Modo ${modo === 'lan' ? 'servidor local' : 'nube'}, tocar para cambiar`"
        @click="modo = modo === 'lan' ? 'nube' : 'lan'"
      >{{ modo === 'lan' ? 'Servidor local · sin internet' : 'Nube · sincronizado' }}</button>
    </div>

    <div class="grid grid-cols-2 gap-1.5">
      <button
        v-for="(c, i) in catalogo"
        :key="c.id"
        type="button"
        :aria-pressed="carrito.includes(c.id)"
        class="flex min-h-12 items-center justify-between gap-2 rounded-lg px-3 text-left text-[13px] transition-colors"
        :class="carrito.includes(c.id) ? 'bg-grafito text-niebla' : 'bg-white text-grafito ring-1 ring-grafito/10 hover:ring-grafito/30'"
        @click="toggle(c.id)"
      >
        <span>{{ c.nombre }}</span>
        <kbd class="rounded bg-black/10 px-1.5 font-mono text-[10px]">F{{ i + 1 }}</kbd>
      </button>
    </div>

    <label v-if="carrito.includes('aceite')" class="flex items-center gap-3 rounded-lg bg-white px-3 py-2 ring-1 ring-grafito/10">
      <span class="text-xs text-grafito">Del tambor 200 L</span>
      <input v-model.number="litros" type="range" min="0.5" max="8" step="0.5" class="flex-1 accent-[#9A4520]" @input="factura = null" />
      <span class="w-14 text-right font-mono text-sm text-grafito">{{ litros.toFixed(1) }} L</span>
    </label>

    <div class="rounded-xl bg-white p-3 ring-1 ring-grafito/10">
      <div v-for="l in lineas" :key="l.id" class="flex justify-between py-0.5 font-mono text-[12px] text-grafito">
        <span>{{ l.nombre }}{{ l.granel ? ` × ${l.cant} L` : '' }}</span>
        <span>{{ fmt(l.subtotal) }}</span>
      </div>
      <div class="mt-2 flex items-center justify-between border-t border-dashed border-grafito/20 pt-2">
        <span class="font-display text-xl font-bold text-grafito">{{ fmt(total) }}</span>
        <button type="button" :disabled="!lineas.length" class="min-h-11 rounded-lg bg-durazno px-4 text-sm font-semibold text-grafito disabled:opacity-50" @click="facturar">Facturar</button>
      </div>
    </div>

    <p v-if="factura" class="rounded-lg bg-petroleo px-3 py-2 font-mono text-[12px] text-niebla" aria-live="polite">
      {{ factura }} · CAE emitido · QR listo para imprimir
      <span class="block text-niebla/60">Simulación: en el sistema real sale de ARCA en segundos.</span>
    </p>
  </div>
</template>
