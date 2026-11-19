<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import PMark from './PMark.vue'

const abierto = ref(false)
const compacto = ref(false)

const links = [
  { href: '#lotes', label: 'Lotes' },
  { href: '#familia', label: 'Familia' },
  { href: '#como', label: 'Cómo trabajamos' },
]

const onScroll = () => {
  compacto.value = window.scrollY > 40
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
    <nav
      class="mx-auto flex max-w-[1440px] items-center justify-between gap-4 rounded-2xl px-4 py-2.5 text-niebla transition-[background-color,box-shadow] duration-300"
      :class="compacto ? 'bg-grafito/92 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.5)] backdrop-blur' : 'bg-transparent'"
      aria-label="Principal"
    >
      <a href="#inicio" class="flex items-center gap-2.5" aria-label="Desarrollo Pampa, inicio">
        <PMark :size="28" />
        <span class="font-display text-[15px] font-semibold leading-none tracking-tight">Desarrollo<br />Pampa</span>
      </a>

      <ul class="hidden items-center gap-1 md:flex">
        <li v-for="l in links" :key="l.href">
          <a :href="l.href" class="rounded-lg px-3 py-2 text-sm text-niebla/80 transition-colors hover:text-lima">{{ l.label }}</a>
        </li>
      </ul>

      <div class="flex items-center gap-2">
        <a
          href="#presupuesto"
          class="hidden min-h-11 items-center rounded-xl bg-lima px-4 font-display text-sm font-semibold text-petroleo sm:inline-flex"
        >
          Pedí presupuesto
        </a>
        <button
          type="button"
          class="inline-flex h-11 w-11 items-center justify-center rounded-xl ring-1 ring-niebla/25 md:hidden"
          :aria-expanded="abierto"
          aria-controls="menu-movil"
          aria-label="Abrir menú"
          @click="abierto = !abierto"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
            <path v-if="!abierto" d="M4 7h16M4 12h16M4 17h10" />
            <path v-else d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
    </nav>

    <div
      v-if="abierto"
      id="menu-movil"
      class="mx-auto mt-2 max-w-[1440px] rounded-2xl bg-grafito p-3 text-niebla md:hidden"
    >
      <a
        v-for="l in [...links, { href: '#presupuesto', label: 'Pedí presupuesto' }]"
        :key="l.href"
        :href="l.href"
        class="flex min-h-12 items-center rounded-xl px-3 font-display text-lg"
        @click="abierto = false"
      >{{ l.label }}</a>
    </div>
  </header>
</template>
