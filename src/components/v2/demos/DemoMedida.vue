<script setup lang="ts">
import { computed, ref } from 'vue'

const cotizacion = 1200
const moneda = ref<'USD' | 'ARS'>('USD')
const dias = ref([
  { titulo: 'Traslado aeropuerto y hotel', usd: 60, on: true },
  { titulo: 'Excursión Cerro Champaquí', usd: 140, on: true },
  { titulo: 'Bodega y almuerzo', usd: 95, on: false },
  { titulo: 'Regreso con traslado', usd: 60, on: true },
])

const total = computed(() => dias.value.filter((d) => d.on).reduce((a, d) => a + d.usd, 0))
const fmt = (usd: number) =>
  moneda.value === 'USD' ? `US$ ${usd.toLocaleString('es-AR')}` : `$ ${(usd * cotizacion).toLocaleString('es-AR')}`
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex items-center justify-between gap-2">
      <p class="font-display text-lg font-semibold text-grafito">Itinerario · Familia [Apellido]</p>
      <div class="flex rounded-lg bg-white p-1 ring-1 ring-grafito/10" role="group" aria-label="Moneda">
        <button
          v-for="m in (['USD', 'ARS'] as const)"
          :key="m"
          type="button"
          :aria-pressed="moneda === m"
          class="min-h-9 min-w-12 rounded-md font-mono text-xs"
          :class="moneda === m ? 'bg-petroleo text-niebla' : 'text-grafito'"
          @click="moneda = m"
        >{{ m }}</button>
      </div>
    </div>

    <ol class="relative flex flex-col gap-1.5 pl-6 before:absolute before:bottom-3 before:left-[9px] before:top-3 before:w-px before:bg-grafito/20">
      <li v-for="(d, i) in dias" :key="d.titulo">
        <label class="relative flex min-h-12 cursor-pointer items-center gap-3 rounded-lg bg-white px-3 ring-1 ring-grafito/10">
          <span
            class="absolute -left-[22px] flex h-[18px] w-[18px] items-center justify-center rounded-full font-mono text-[9px]"
            :class="d.on ? 'bg-petroleo text-lima' : 'bg-niebla-2 text-grafito-2'"
            aria-hidden="true"
          >{{ i + 1 }}</span>
          <input v-model="d.on" type="checkbox" class="h-4 w-4 accent-[#103B3F]" />
          <span class="flex-1 text-sm" :class="d.on ? 'text-grafito' : 'text-grafito-2 line-through'">Día {{ i + 1 }} · {{ d.titulo }}</span>
          <span class="font-mono text-[12px] text-grafito">{{ fmt(d.usd) }}</span>
        </label>
      </li>
    </ol>

    <div class="flex items-end justify-between rounded-xl bg-petroleo p-4 text-niebla">
      <div>
        <p class="font-mono text-[11px] uppercase tracking-wider text-lima">Cotización para el pasajero</p>
        <p class="font-display text-2xl font-bold">{{ fmt(total) }}</p>
      </div>
      <p class="text-right font-mono text-[11px] text-niebla/70">Cuenta corriente<br />ARS / USD · ejemplo</p>
    </div>
  </div>
</template>
