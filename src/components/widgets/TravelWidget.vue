<script setup lang="ts">
import { ref } from 'vue'
import { Plane, Users, CheckCircle2, FileText, ArrowRight } from 'lucide-vue-next'

const selectedCurrency = ref<'usd' | 'ars'>('usd')
</script>

<template>
  <div
    class="w-full max-w-[280px] sm:max-w-[290px] rounded-xl p-3 select-none font-sans border transition-all duration-200 bg-[var(--surface-card)] border-[var(--border-hairline)] text-[var(--ink-primary)] shadow-xs"
  >
    <!-- Header: Módulo Operativo Agencia -->
    <div class="flex items-center justify-between pb-2 border-b border-[var(--border-hairline)]">
      <div class="flex items-center gap-1.5">
        <Plane class="w-3.5 h-3.5 text-[var(--brand-primary)]" />
        <span class="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--ink-secondary)]">
          Travel Ops · Enterprise
        </span>
      </div>
      <span class="inline-flex items-center gap-1 text-[8.5px] font-mono font-semibold px-1.5 py-0.5 rounded-full bg-[var(--surface-accent-soft)] text-[var(--brand-action)] border border-[var(--border-hairline)]">
        <CheckCircle2 class="w-2.5 h-2.5" />
        <span>Voucher Emitido</span>
      </span>
    </div>

    <!-- Ruta de vuelo -->
    <div class="mt-2 p-2 rounded-lg bg-[var(--surface-accent-soft)] border border-[var(--border-hairline)]">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="text-center">
            <span class="text-sm font-mono font-black text-[var(--ink-primary)]">EZE</span>
            <p class="text-[9px] text-[var(--ink-secondary)]">Bs. As.</p>
          </div>
          <div class="flex flex-col items-center px-1">
            <ArrowRight class="w-3.5 h-3.5 text-[var(--brand-action)]" />
            <span class="text-[8px] font-mono text-[var(--ink-secondary)]">Directo</span>
          </div>
          <div class="text-center">
            <span class="text-sm font-mono font-black text-[var(--ink-primary)]">MAD</span>
            <p class="text-[9px] text-[var(--ink-secondary)]">Madrid</p>
          </div>
        </div>

        <div class="text-right">
          <div class="flex items-center gap-1 text-[10px] font-semibold text-[var(--ink-primary)] justify-end">
            <Users class="w-3 h-3 text-[var(--brand-action)]" />
            <span>2 Pasajeros</span>
          </div>
          <span class="text-[9px] text-[var(--brand-action)] font-medium">
            Confirmados
          </span>
        </div>
      </div>
    </div>

    <!-- Saldo Bimonetario Interactivo -->
    <div class="mt-2">
      <div class="flex items-center justify-between text-[9px] text-[var(--ink-secondary)] font-mono mb-1">
        <span>CUENTA CORRIENTE:</span>
        <span class="text-[var(--brand-action)] font-semibold">100% Conciliado</span>
      </div>
      <div class="grid grid-cols-2 gap-1.5 text-center">
        <button
          type="button"
          @click.stop="selectedCurrency = 'usd'"
          class="p-1.5 rounded transition-all duration-150 cursor-pointer border text-center"
          :class="
            selectedCurrency === 'usd'
              ? 'bg-[var(--surface-accent-soft)] border-[var(--brand-action)] ring-1 ring-[var(--brand-action)]/30'
              : 'bg-[var(--surface-card)] border-[var(--border-hairline)] text-[var(--ink-secondary)] hover:border-[var(--brand-primary)]'
          "
        >
          <span class="text-[8.5px] font-mono text-[var(--ink-secondary)]">USD (Divisa)</span>
          <p class="text-xs font-mono font-bold text-[var(--ink-primary)]">
            USD 2.450
          </p>
        </button>

        <button
          type="button"
          @click.stop="selectedCurrency = 'ars'"
          class="p-1.5 rounded transition-all duration-150 cursor-pointer border text-center"
          :class="
            selectedCurrency === 'ars'
              ? 'bg-[var(--surface-accent-soft)] border-[var(--brand-action)] ring-1 ring-[var(--brand-action)]/30'
              : 'bg-[var(--surface-card)] border-[var(--border-hairline)] text-[var(--ink-secondary)] hover:border-[var(--brand-primary)]'
          "
        >
          <span class="text-[8.5px] font-mono text-[var(--ink-secondary)]">ARS (Oficial)</span>
          <p class="text-xs font-mono font-bold text-[var(--ink-primary)]">
            $ 2.940.000
          </p>
        </button>
      </div>
    </div>

    <!-- Footer: Itinerario confirmado -->
    <div class="mt-2 pt-1.5 border-t border-[var(--border-hairline)] flex items-center justify-between text-[10px]">
      <div class="flex items-center gap-1 text-[var(--ink-secondary)] font-medium">
        <FileText class="w-3 h-3 text-[var(--brand-action)]" />
        <span class="text-[9px]">Itinerario V2 · Confirmado</span>
      </div>
      <span class="text-[8.5px] font-mono text-[var(--ink-secondary)]">
        PDF + Web
      </span>
    </div>
  </div>
</template>
