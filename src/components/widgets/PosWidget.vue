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
    class="w-full max-w-[280px] sm:max-w-[290px] rounded-xl p-3 select-none font-sans border transition-all duration-200 bg-[var(--surface-card)] border-[var(--border-hairline)] text-[var(--ink-primary)] shadow-xs"
  >
    <!-- Header: Título POS y Switch de modo interactivo -->
    <div class="flex items-center justify-between gap-1.5 pb-2 border-b border-[var(--border-hairline)]">
      <div class="flex items-center gap-1.5">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--pampa-arcilla)] opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-[var(--pampa-arcilla)]"></span>
        </span>
        <span class="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--ink-secondary)]">
          POS Express · Taller
        </span>
      </div>

      <!-- Botón interactivo Nube / LAN -->
      <button
        type="button"
        @click.stop="toggleMode"
        class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-mono font-semibold transition-all duration-150 cursor-pointer border"
        :class="
          mode === 'lan'
            ? 'bg-[var(--pampa-arcilla)]/15 text-[var(--pampa-arcilla)] border-[var(--pampa-arcilla)]/35 hover:bg-[var(--pampa-arcilla)]/25'
            : 'bg-[var(--surface-accent-soft)] text-[var(--ink-primary)] border-[var(--border-hairline)] hover:border-[var(--brand-primary)]'
        "
        :title="'Clic para alternar a ' + (mode === 'lan' ? 'Nube SaaS' : 'Local LAN')"
      >
        <Server v-if="mode === 'lan'" class="w-2.5 h-2.5" />
        <Cloud v-else class="w-2.5 h-2.5" />
        <span>{{ mode === 'lan' ? 'Local LAN (0ms)' : 'Nube SaaS' }}</span>
      </button>
    </div>

    <!-- Patente y Vehículo -->
    <div class="mt-2 flex items-center justify-between bg-[var(--surface-accent-soft)] p-2 rounded-lg border border-[var(--border-hairline)]">
      <div class="flex items-center gap-2">
        <!-- Chapa Patente estilo Pampa -->
        <div class="flex flex-col border border-[var(--border-hairline)] rounded bg-[var(--surface-card)] overflow-hidden shadow-xs">
          <div class="bg-[var(--pampa-ciruela)] text-[var(--pampa-arena)] text-[6px] font-bold text-center px-1 py-0.2 tracking-wider">
            ARGENTINA
          </div>
          <span class="text-[10px] font-mono font-black tracking-widest px-1 py-0.5 text-[var(--ink-primary)]">
            AB 123 CD
          </span>
        </div>
        <div class="text-[10px] leading-tight">
          <p class="font-bold text-[var(--ink-primary)]">Hilux 2.8 D-4D</p>
          <p class="text-[9px] text-[var(--ink-secondary)]">Próx: 110.000 km</p>
        </div>
      </div>

      <span class="text-[9px] font-mono px-1 py-0.5 rounded bg-[var(--surface-card)] text-[var(--ink-secondary)] border border-[var(--border-hairline)]">
        Historial OK
      </span>
    </div>

    <!-- Producto escaneado -->
    <div class="mt-2 p-2 rounded-lg bg-[var(--surface-accent-soft)] border border-[var(--border-hairline)]">
      <div class="flex items-start justify-between gap-1">
        <div class="flex items-start gap-1.5">
          <Barcode class="w-3.5 h-3.5 text-[var(--pampa-arcilla)] mt-0.5 shrink-0" />
          <div>
            <p class="text-xs font-bold text-[var(--ink-primary)] leading-tight">
              Petronas Syntium 5W40 · 4L
            </p>
            <p class="text-[9px] text-[var(--ink-secondary)]">
              Stock fraccionado · Tambor 200L
            </p>
          </div>
        </div>
        <span class="text-xs font-mono font-bold text-[var(--pampa-arcilla)] shrink-0">
          $ 48.500
        </span>
      </div>
    </div>

    <!-- Footer: Estado AFIP / ARCA -->
    <div class="mt-2 pt-1.5 border-t border-[var(--border-hairline)] flex items-center justify-between text-[10px]">
      <div class="flex items-center gap-1 text-[var(--pampa-arcilla)] font-medium">
        <ShieldCheck class="w-3 h-3 text-[var(--pampa-arcilla)]" />
        <span class="text-[9px]">AFIP CAE Autorizado</span>
      </div>
      <div class="flex items-center gap-1 text-[var(--ink-secondary)] font-mono text-[9px]">
        <CheckCircle2 class="w-3 h-3 text-[var(--pampa-arcilla)]" />
        <span>CAE 742189384</span>
      </div>
    </div>
  </div>
</template>
