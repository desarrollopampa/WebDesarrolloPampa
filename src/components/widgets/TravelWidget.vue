<script setup lang="ts">
import { ref } from 'vue'
import { Plane, Users, CheckCircle2, FileText, ArrowRight } from 'lucide-vue-next'

const selectedCurrency = ref<'usd' | 'ars'>('usd')
</script>

<template>
  <div
    class="w-full max-w-[320px] rounded-xl p-3.5 select-none font-sans border transition-all duration-200 bg-white/90 dark:bg-zinc-950/90 border-zinc-200/80 dark:border-purple-900/30 text-zinc-800 dark:text-zinc-100 shadow-sm"
  >
    <!-- Header: Módulo Operativo Agencia -->
    <div class="flex items-center justify-between pb-2.5 border-b border-zinc-100 dark:border-zinc-800/80">
      <div class="flex items-center gap-1.5">
        <Plane class="w-3.5 h-3.5 text-purple-500" />
        <span class="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Travel Ops · Enterprise
        </span>
      </div>
      <span class="inline-flex items-center gap-1 text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
        <CheckCircle2 class="w-2.5 h-2.5" />
        <span>Voucher Emitido</span>
      </span>
    </div>

    <!-- Ruta de vuelo -->
    <div class="mt-2.5 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800/60">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="text-center">
            <span class="text-sm font-mono font-black text-zinc-900 dark:text-zinc-100">EZE</span>
            <p class="text-[9px] text-zinc-400">Bs. As.</p>
          </div>
          <div class="flex flex-col items-center px-1">
            <ArrowRight class="w-3.5 h-3.5 text-purple-500" />
            <span class="text-[8px] font-mono text-zinc-400">Directo</span>
          </div>
          <div class="text-center">
            <span class="text-sm font-mono font-black text-zinc-900 dark:text-zinc-100">MAD</span>
            <p class="text-[9px] text-zinc-400">Madrid</p>
          </div>
        </div>

        <div class="text-right">
          <div class="flex items-center gap-1 text-[11px] font-semibold text-zinc-800 dark:text-zinc-200 justify-end">
            <Users class="w-3 h-3 text-purple-400" />
            <span>2 Pasajeros</span>
          </div>
          <span class="text-[9px] text-emerald-600 dark:text-emerald-400 font-medium">
            Confirmados
          </span>
        </div>
      </div>
    </div>

    <!-- Saldo Bimonetario Interactivo -->
    <div class="mt-2.5">
      <div class="flex items-center justify-between text-[10px] text-zinc-400 font-mono mb-1">
        <span>CUENTA CORRIENTE:</span>
        <span class="text-emerald-600 dark:text-emerald-400 font-semibold">100% Conciliado</span>
      </div>
      <div class="grid grid-cols-2 gap-1.5 text-center">
        <button
          type="button"
          @click.stop="selectedCurrency = 'usd'"
          class="p-1.5 rounded transition-all duration-150 cursor-pointer border text-center"
          :class="
            selectedCurrency === 'usd'
              ? 'bg-purple-500/15 dark:bg-purple-950/40 border-purple-500/40 ring-1 ring-purple-500/20'
              : 'bg-zinc-100/70 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-purple-300'
          "
        >
          <span class="text-[9px] font-mono text-zinc-400">USD (Divisa)</span>
          <p class="text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100">
            USD 2.450
          </p>
        </button>

        <button
          type="button"
          @click.stop="selectedCurrency = 'ars'"
          class="p-1.5 rounded transition-all duration-150 cursor-pointer border text-center"
          :class="
            selectedCurrency === 'ars'
              ? 'bg-purple-500/15 dark:bg-purple-950/40 border-purple-500/40 ring-1 ring-purple-500/20'
              : 'bg-zinc-100/70 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-purple-300'
          "
        >
          <span class="text-[9px] font-mono text-zinc-400">ARS (Oficial)</span>
          <p class="text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100">
            $ 2.940.000
          </p>
        </button>
      </div>
    </div>

    <!-- Footer: Itinerario confirmado -->
    <div class="mt-2.5 pt-2 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-[10px]">
      <div class="flex items-center gap-1 text-zinc-600 dark:text-zinc-300 font-medium">
        <FileText class="w-3.5 h-3.5 text-purple-500" />
        <span>Itinerario V2 · Confirmado</span>
      </div>
      <span class="text-[9px] font-mono text-zinc-400">
        PDF + Web
      </span>
    </div>
  </div>
</template>
