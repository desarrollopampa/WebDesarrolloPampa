<script setup lang="ts">
import { ref, computed } from 'vue'
import { ShoppingBag, MessageCircle, Check } from 'lucide-vue-next'

const sizes = ['S', 'M', 'L'] as const
type Size = (typeof sizes)[number]

const selectedSize = ref<Size>('M')
const isSent = ref(false)

const stockMap: Record<Size, { stock: number; label: string }> = {
  S: { stock: 3, label: '3 disp.' },
  M: { stock: 1, label: 'Última unidad' },
  L: { stock: 6, label: '6 disp.' },
}

const currentStock = computed(() => stockMap[selectedSize.value])

const handleCheckout = () => {
  isSent.value = true
  setTimeout(() => {
    isSent.value = false
  }, 2200)
}
</script>

<template>
  <div
    class="w-full max-w-[280px] sm:max-w-[290px] rounded-xl p-3 select-none font-mono border transition-all duration-200 bg-[var(--surface-card)] border-[var(--border-hairline)] text-[var(--ink-primary)] shadow-xs"
  >
    <!-- Header: Estética Streetwear Industrial -->
    <div class="flex items-center justify-between pb-2 border-b border-[var(--border-hairline)]">
      <div class="flex items-center gap-1.5">
        <ShoppingBag class="w-3.5 h-3.5 text-[var(--brand-action)]" />
        <span class="text-[10px] font-bold uppercase tracking-wider text-[var(--ink-primary)]">
          RIVE // STORE
        </span>
      </div>
      <span class="text-[8.5px] uppercase tracking-widest px-1.5 py-0.5 bg-[var(--surface-accent-soft)] text-[var(--ink-secondary)] border border-[var(--border-hairline)] rounded">
        DROP 01
      </span>
    </div>

    <!-- Prenda y Detalle de Tejido -->
    <div class="mt-2">
      <div class="flex items-start justify-between">
        <div>
          <h4 class="text-xs font-black tracking-tight text-[var(--ink-primary)]">
            HEAVY BOXY TEE // 01
          </h4>
          <p class="text-[9px] text-[var(--ink-secondary)]">
            Raw Black · 280 GSM Cotton
          </p>
        </div>
        <span class="text-xs font-bold text-[var(--brand-action)]">
          $ 34.000
        </span>
      </div>
    </div>

    <!-- Selector de Talles Interactivo -->
    <div class="mt-2.5">
      <div class="flex items-center justify-between text-[9px] text-[var(--ink-secondary)] mb-1">
        <span>TALLE:</span>
        <span class="font-bold text-[var(--brand-action)]">
          {{ currentStock.label }}
        </span>
      </div>

      <div class="grid grid-cols-3 gap-1">
        <button
          v-for="size in sizes"
          :key="size"
          type="button"
          @click.stop="selectedSize = size"
          class="py-1 px-1.5 rounded text-xs font-bold transition-all duration-150 cursor-pointer border text-center"
          :class="
            selectedSize === size
              ? 'bg-[var(--pampa-ciruela)] text-[var(--pampa-arena)] border-[var(--pampa-ciruela)] shadow-xs'
              : 'bg-[var(--surface-accent-soft)] text-[var(--ink-secondary)] border-[var(--border-hairline)] hover:border-[var(--brand-action)]'
          "
        >
          {{ size }}
        </button>
      </div>
    </div>

    <!-- Barra inferior: Cierre directo WhatsApp -->
    <div class="mt-2.5 pt-2 border-t border-[var(--border-hairline)]">
      <button
        type="button"
        @click.stop="handleCheckout"
        class="w-full py-1.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-150 cursor-pointer active:scale-98"
        :class="
          isSent
            ? 'bg-[var(--pampa-ciruela)] text-[var(--pampa-arena)]'
            : 'bg-[var(--brand-action)] hover:opacity-90 text-[var(--brand-action-ink)] shadow-xs'
        "
      >
        <Check v-if="isSent" class="w-3.5 h-3.5" />
        <MessageCircle v-else class="w-3.5 h-3.5" />
        <span>{{ isSent ? 'Pedido compilado ✓' : 'Cierre directo WhatsApp' }}</span>
      </button>
    </div>
  </div>
</template>
