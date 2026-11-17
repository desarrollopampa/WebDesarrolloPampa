<script setup lang="ts">
import { ref } from 'vue'
import { Calendar, Clock, CreditCard, Check, Zap } from 'lucide-vue-next'

const slots = ['09:00', '10:30', '14:00'] as const
type Slot = (typeof slots)[number]

const selectedSlot = ref<Slot>('10:30')

const selectSlot = (slot: Slot) => {
  selectedSlot.value = slot
}
</script>

<template>
  <div
    class="w-full max-w-[320px] rounded-xl p-3.5 select-none font-sans border transition-all duration-200 bg-white/90 dark:bg-zinc-950/90 border-zinc-200/80 dark:border-blue-900/30 text-zinc-800 dark:text-zinc-100 shadow-sm"
  >
    <!-- Header: MiAgenda y Motor en tiempo real -->
    <div class="flex items-center justify-between gap-2 pb-2.5 border-b border-zinc-100 dark:border-zinc-800/80">
      <div class="flex items-center gap-1.5">
        <Calendar class="w-3.5 h-3.5 text-blue-500" />
        <span class="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          MiAgenda · SaaS
        </span>
      </div>
      <div class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
        <Zap class="w-2.5 h-2.5" />
        <span>Redis Cache</span>
      </div>
    </div>

    <!-- Servicio a agendar -->
    <div class="mt-2.5 flex items-center justify-between">
      <div>
        <p class="text-xs font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
          Consulta / Turno · 45 min
        </p>
        <p class="text-[10px] text-zinc-500 dark:text-zinc-400 flex items-center gap-1 mt-0.5">
          <Clock class="w-3 h-3 text-zinc-400" />
          <span>Disponibilidad inmediata</span>
        </p>
      </div>
      <span class="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
        Hoy
      </span>
    </div>

    <!-- Selector interactivo de horarios -->
    <div class="mt-3">
      <p class="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
        Horarios disponibles:
      </p>
      <div class="grid grid-cols-3 gap-1.5">
        <button
          v-for="slot in slots"
          :key="slot"
          type="button"
          @click.stop="selectSlot(slot)"
          class="py-1.5 px-2 rounded-lg text-xs font-mono font-semibold flex items-center justify-center gap-1 transition-all duration-150 cursor-pointer border"
          :class="
            selectedSlot === slot
              ? 'bg-blue-500 text-white border-blue-600 shadow-xs ring-2 ring-blue-500/20'
              : 'bg-zinc-50 dark:bg-zinc-900/60 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30'
          "
        >
          <Check v-if="selectedSlot === slot" class="w-3 h-3" />
          <span>{{ slot }}</span>
        </button>
      </div>
      <p class="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 mt-1.5 text-center">
        Slot {{ selectedSlot }} bloqueado temporalmente (10m)
      </p>
    </div>

    <!-- Footer: Seña MercadoPago y Calendar -->
    <div class="mt-2.5 pt-2 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-[10px]">
      <div class="flex items-center gap-1 text-zinc-600 dark:text-zinc-300">
        <CreditCard class="w-3.5 h-3.5 text-blue-500" />
        <span class="font-medium">Seña MercadoPago</span>
      </div>
      <div class="flex items-center gap-1 text-zinc-500 dark:text-zinc-400 font-mono text-[9px]">
        <span>+ Google Calendar</span>
      </div>
    </div>
  </div>
</template>
