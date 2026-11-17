<script setup lang="ts">
import { ref } from 'vue'
import { CheckCircle2, Server, Cloud, Barcode, ShieldCheck } from 'lucide-vue-next'

const mode = ref<'saas' | 'lan'>('lan')

const toggleMode = () => {
  mode.value = mode.value === 'saas' ? 'lan' : 'saas'
}
</script>

<template>
  <div
    class="w-full max-w-[320px] rounded-xl p-3.5 select-none font-sans border transition-all duration-200 bg-white/90 dark:bg-zinc-950/90 border-zinc-200/80 dark:border-emerald-900/30 text-zinc-800 dark:text-zinc-100 shadow-sm"
  >
    <!-- Header: Título POS y Switch de modo interactivo -->
    <div class="flex items-center justify-between gap-2 pb-2.5 border-b border-zinc-100 dark:border-zinc-800/80">
      <div class="flex items-center gap-1.5">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span class="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          POS Express · Taller
        </span>
      </div>

      <!-- Botón interactivo Nube / LAN -->
      <button
        type="button"
        @click.stop="toggleMode"
        class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold transition-all duration-150 cursor-pointer border"
        :class="
          mode === 'lan'
            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
            : 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30 hover:bg-sky-500/20'
        "
        :title="'Clic para alternar a ' + (mode === 'lan' ? 'Nube SaaS' : 'Local LAN')"
      >
        <Server v-if="mode === 'lan'" class="w-3 h-3" />
        <Cloud v-else class="w-3 h-3" />
        <span>{{ mode === 'lan' ? 'Local LAN (0ms)' : 'Nube SaaS' }}</span>
      </button>
    </div>

    <!-- Patente y Vehículo -->
    <div class="mt-2.5 flex items-center justify-between bg-zinc-50 dark:bg-zinc-900/70 p-2 rounded-lg border border-zinc-200/50 dark:border-zinc-800/60">
      <div class="flex items-center gap-2">
        <!-- Chapa Patente estilo Mercosur miniatura -->
        <div class="flex flex-col border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-950 overflow-hidden shadow-xs">
          <div class="bg-blue-600 text-white text-[7px] font-bold text-center px-1.5 py-0.2 tracking-wider">
            ARGENTINA
          </div>
          <span class="text-[11px] font-mono font-black tracking-widest px-1.5 py-0.5 text-zinc-900 dark:text-zinc-100">
            AB 123 CD
          </span>
        </div>
        <div class="text-[11px] leading-tight">
          <p class="font-semibold text-zinc-800 dark:text-zinc-200">Hilux 2.8 D-4D</p>
          <p class="text-[10px] text-zinc-400">Próx: 110.000 km</p>
        </div>
      </div>

      <span class="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-200/70 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
        Historial OK
      </span>
    </div>

    <!-- Producto escaneado -->
    <div class="mt-2.5 p-2 rounded-lg bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/15">
      <div class="flex items-start justify-between gap-1">
        <div class="flex items-start gap-1.5">
          <Barcode class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
          <div>
            <p class="text-xs font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
              Petronas Syntium 5W40 · 4L
            </p>
            <p class="text-[10px] text-zinc-500 dark:text-zinc-400">
              Stock fraccionado · Tambor 200L
            </p>
          </div>
        </div>
        <span class="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
          $ 48.500
        </span>
      </div>
    </div>

    <!-- Footer: Estado AFIP / ARCA -->
    <div class="mt-2.5 pt-2 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-[10px]">
      <div class="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
        <ShieldCheck class="w-3.5 h-3.5 text-emerald-500" />
        <span>AFIP CAE Autorizado</span>
      </div>
      <div class="flex items-center gap-1 text-zinc-400 font-mono text-[9px]">
        <CheckCircle2 class="w-3 h-3 text-emerald-500" />
        <span>CAE 742189384</span>
      </div>
    </div>
  </div>
</template>
