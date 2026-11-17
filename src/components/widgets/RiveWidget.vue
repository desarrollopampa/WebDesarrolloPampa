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
    class="w-full max-w-[320px] rounded-xl p-3.5 select-none font-mono border transition-all duration-200 bg-white/90 dark:bg-zinc-950/90 border-zinc-200/80 dark:border-amber-900/30 text-zinc-800 dark:text-zinc-100 shadow-sm"
  >
    <!-- Header: Estética Streetwear Industrial -->
    <div class="flex items-center justify-between pb-2.5 border-b border-zinc-200 dark:border-zinc-800/80">
      <div class="flex items-center gap-1.5">
        <ShoppingBag class="w-3.5 h-3.5 text-amber-500" />
        <span class="text-[11px] font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-200">
          RIVE // STORE
        </span>
      </div>
      <span class="text-[9px] uppercase tracking-widest px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border border-zinc-300 dark:border-zinc-700 rounded">
        DROP 01
      </span>
    </div>

    <!-- Prenda y Detalle de Tejido -->
    <div class="mt-2.5">
      <div class="flex items-start justify-between">
        <div>
          <h4 class="text-xs font-black tracking-tight text-zinc-900 dark:text-zinc-100">
            HEAVY BOXY TEE // 01
          </h4>
          <p class="text-[10px] text-zinc-500 dark:text-zinc-400">
            Raw Black · 280 GSM Cotton
          </p>
        </div>
        <span class="text-xs font-bold text-amber-600 dark:text-amber-400">
          $ 34.000
        </span>
      </div>
    </div>

    <!-- Selector de Talles Interactivo -->
    <div class="mt-3">
      <div class="flex items-center justify-between text-[10px] text-zinc-400 mb-1.5">
        <span>TALLE:</span>
        <span class="font-bold text-amber-600 dark:text-amber-400">
          {{ currentStock.label }}
        </span>
      </div>

      <div class="grid grid-cols-3 gap-1.5">
        <button
          v-for="size in sizes"
          :key="size"
          type="button"
          @click.stop="selectedSize = size"
          class="py-1 px-2 rounded text-xs font-bold transition-all duration-150 cursor-pointer border text-center"
          :class="
            selectedSize === size
              ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-zinc-900 dark:border-white shadow-xs'
              : 'bg-zinc-50 dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-amber-400'
          "
        >
          {{ size }}
        </button>
      </div>
    </div>

    <!-- Barra inferior: Cierre directo WhatsApp -->
    <div class="mt-3 pt-2.5 border-t border-zinc-200 dark:border-zinc-800/80">
      <button
        type="button"
        @click.stop="handleCheckout"
        class="w-full py-1.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-150 cursor-pointer active:scale-98"
        :class="
          isSent
            ? 'bg-emerald-600 text-white'
            : 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-xs hover:shadow-emerald-500/20'
        "
      >
        <Check v-if="isSent" class="w-3.5 h-3.5" />
        <MessageCircle v-else class="w-3.5 h-3.5" />
        <span>{{ isSent ? 'Pedido compilado ✓' : 'Cierre directo WhatsApp' }}</span>
      </button>
    </div>
  </div>
</template>
