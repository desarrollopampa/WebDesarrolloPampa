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
    class="w-full max-w-[280px] sm:max-w-[290px] rounded-xl p-3 select-none font-sans border transition-all duration-200 bg-[var(--surface-card)] border-[var(--border-hairline)] text-[var(--ink-primary)] shadow-xs"
  >
    <!-- Header: MiAgenda y Motor en tiempo real -->
    <div class="flex items-center justify-between gap-1.5 pb-2 border-b border-[var(--border-hairline)]">
      <div class="flex items-center gap-1.5">
        <Calendar class="w-3.5 h-3.5 text-[var(--brand-primary)]" />
        <span class="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--ink-secondary)]">
          MiAgenda · SaaS
        </span>
      </div>
      <div class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-mono bg-[var(--surface-accent-soft)] text-[var(--ink-secondary)] border border-[var(--border-hairline)]">
        <Zap class="w-2.5 h-2.5 text-[var(--brand-action)]" />
        <span>Tiempo Real</span>
      </div>
    </div>

    <!-- Servicio a agendar -->
    <div class="mt-2 flex items-center justify-between">
      <div>
        <p class="text-xs font-bold text-[var(--ink-primary)] leading-tight">
          Consulta / Turno · 45 min
        </p>
        <p class="text-[9px] text-[var(--ink-secondary)] flex items-center gap-1 mt-0.5">
          <Clock class="w-2.5 h-2.5" />
          <span>Disponibilidad inmediata</span>
        </p>
      </div>
      <span class="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-[var(--surface-accent-soft)] text-[var(--ink-primary)] border border-[var(--border-hairline)]">
        Hoy
      </span>
    </div>

    <!-- Selector interactivo de horarios -->
    <div class="mt-2.5">
      <p class="text-[9px] font-mono text-[var(--ink-secondary)] uppercase tracking-wider mb-1">
        Horarios disponibles:
      </p>
      <div class="grid grid-cols-3 gap-1">
        <button
          v-for="slot in slots"
          :key="slot"
          type="button"
          @click.stop="selectSlot(slot)"
          class="py-1 px-1.5 rounded-lg text-xs font-mono font-semibold flex items-center justify-center gap-0.5 transition-all duration-150 cursor-pointer border"
          :class="
            selectedSlot === slot
              ? 'bg-[var(--brand-action)] text-[var(--brand-action-ink)] border-[var(--brand-action)] shadow-xs'
              : 'bg-[var(--surface-accent-soft)] text-[var(--ink-secondary)] border-[var(--border-hairline)] hover:border-[var(--brand-action)]'
          "
        >
          <Check v-if="selectedSlot === slot" class="w-3 h-3" />
          <span>{{ slot }}</span>
        </button>
      </div>
      <p class="text-[9px] font-mono text-[var(--brand-action)] mt-1.5 text-center">
        Slot {{ selectedSlot }} bloqueado temporalmente (10m)
      </p>
    </div>

    <!-- Footer: Seña MercadoPago y Calendar -->
    <div class="mt-2 pt-1.5 border-t border-[var(--border-hairline)] flex items-center justify-between text-[10px]">
      <div class="flex items-center gap-1 text-[var(--ink-secondary)]">
        <CreditCard class="w-3 h-3 text-[var(--brand-action)]" />
        <span class="font-medium text-[9px]">Seña MercadoPago</span>
      </div>
      <div class="flex items-center gap-1 text-[var(--ink-secondary)] font-mono text-[8.5px]">
        <span>+ Google Calendar</span>
      </div>
    </div>
  </div>
</template>
