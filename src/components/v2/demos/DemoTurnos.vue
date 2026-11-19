<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'

const hoy = new Date()
const dias = Array.from({ length: 5 }, (_, i) => {
  const d = new Date(hoy)
  d.setDate(hoy.getDate() + i + 1)
  return {
    key: d.toISOString().slice(0, 10),
    dia: d.toLocaleDateString('es-AR', { weekday: 'short' }).replace('.', ''),
    num: d.getDate(),
  }
})
const horarios = ['09:00', '09:30', '10:00', '11:00', '11:30', '15:00', '16:30', '17:00']
const ocupado = (dia: number, h: number) => (dia * 3 + h * 5) % 7 === 0 || (dia + h) % 5 === 0

const diaSel = ref(0)
const horaSel = ref<string | null>(null)
const estado = ref<'elegir' | 'bloqueado' | 'confirmado'>('elegir')
const restante = ref(600)
let timer: number | undefined

const reloj = computed(() => {
  const m = Math.floor(restante.value / 60)
  const s = restante.value % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
})

const elegir = (h: string) => {
  horaSel.value = h
  estado.value = 'bloqueado'
  restante.value = 600
  window.clearInterval(timer)
  timer = window.setInterval(() => {
    restante.value = Math.max(0, restante.value - 1)
    if (!restante.value) {
      window.clearInterval(timer)
      estado.value = 'elegir'
      horaSel.value = null
    }
  }, 1000)
}

const pagar = () => {
  window.clearInterval(timer)
  estado.value = 'confirmado'
}

const reiniciar = () => {
  estado.value = 'elegir'
  horaSel.value = null
}

onBeforeUnmount(() => window.clearInterval(timer))
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <p class="font-display text-lg font-semibold text-grafito">Consultorio · ejemplo</p>
      <span class="font-mono text-[11px] uppercase tracking-wider text-grafito-2">Kinesiología · 45 min</span>
    </div>

    <div class="grid grid-cols-5 gap-1.5" role="group" aria-label="Día">
      <button
        v-for="(d, i) in dias"
        :key="d.key"
        type="button"
        :aria-pressed="diaSel === i"
        class="flex min-h-14 flex-col items-center justify-center rounded-xl transition-colors"
        :class="diaSel === i ? 'bg-petroleo text-niebla' : 'bg-white text-grafito ring-1 ring-grafito/10 hover:ring-grafito/30'"
        @click="diaSel = i; reiniciar()"
      >
        <span class="font-mono text-[10px] uppercase">{{ d.dia }}</span>
        <span class="font-display text-lg font-bold leading-none">{{ d.num }}</span>
      </button>
    </div>

    <div v-if="estado === 'elegir'" class="grid grid-cols-4 gap-1.5" role="group" aria-label="Horario">
      <button
        v-for="(h, j) in horarios"
        :key="h"
        type="button"
        :disabled="ocupado(diaSel, j)"
        class="min-h-11 rounded-lg font-mono text-sm transition-colors disabled:cursor-not-allowed disabled:bg-transparent disabled:text-grafito/35 disabled:line-through"
        :class="'bg-cielo/45 text-petroleo hover:bg-cielo'"
        @click="elegir(h)"
      >{{ h }}</button>
    </div>

    <div v-else-if="estado === 'bloqueado'" class="rounded-xl bg-white p-4 ring-1 ring-cielo" aria-live="polite">
      <p class="font-mono text-[11px] uppercase tracking-wider text-cielo-osc">Turno reservado para vos · {{ reloj }}</p>
      <p class="mt-1 font-display text-xl font-semibold text-grafito">{{ dias[diaSel]?.dia }} {{ dias[diaSel]?.num }} · {{ horaSel }} h</p>
      <p class="mt-1 text-sm text-grafito-2">Nadie más puede tomarlo mientras dejás la seña.</p>
      <div class="mt-3 flex gap-2">
        <button type="button" class="min-h-11 flex-1 rounded-lg bg-[#00A0E3] px-4 text-sm font-semibold text-white" @click="pagar">Dejar seña con MercadoPago</button>
        <button type="button" class="min-h-11 rounded-lg px-3 text-sm text-grafito ring-1 ring-grafito/15" @click="reiniciar">Cambiar</button>
      </div>
    </div>

    <div v-else class="rounded-xl bg-petroleo p-4 text-niebla" aria-live="polite">
      <p class="font-mono text-[11px] uppercase tracking-wider text-lima">Confirmado</p>
      <p class="mt-1 font-display text-xl font-semibold">{{ dias[diaSel]?.dia }} {{ dias[diaSel]?.num }} · {{ horaSel }} h</p>
      <ul class="mt-2 space-y-1 text-sm text-niebla/85">
        <li>Seña acreditada en la cuenta del consultorio.</li>
        <li>Recordatorio por WhatsApp 24 h y 2 h antes.</li>
        <li>Se agenda en Google Calendar.</li>
      </ul>
      <button type="button" class="mt-3 min-h-11 rounded-lg px-3 text-sm ring-1 ring-niebla/30" @click="reiniciar">Probar otro turno</button>
    </div>
  </div>
</template>
