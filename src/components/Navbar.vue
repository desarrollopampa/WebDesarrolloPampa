<script setup lang="ts">
import { useUiStore } from '@/stores/uiStore'
import { Sun, Moon, ArrowUpRight } from 'lucide-vue-next'

const uiStore = useUiStore()

const navLinks = [
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Arquitectura', href: '#arquitectura' },
  { label: 'Modalidades', href: '#modalidades' },
]
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full backdrop-blur-md bg-white/75 dark:bg-[#080d0b]/80 border-b border-zinc-200/70 dark:border-emerald-950/40 transition-colors duration-200"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
      <!-- Izquierda: Logo Desarrollo Pampa -->
      <a href="#" class="flex items-center gap-2.5 group select-none">
        <!-- Ícono Árbol Caldén Estilizado -->
        <div
          class="w-9 h-9 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-105 group-hover:border-emerald-500/40 transition-all duration-200"
        >
          <svg
            viewBox="0 0 32 32"
            class="w-5 h-5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <!-- Copa caldén pampeano estilizada -->
            <path
              d="M7 16C5.5 13 7.5 9.5 11 9C12.5 7 15.5 6.5 18 8C20.5 7 23.5 8 24.5 10.5C26 12.5 25 15.5 23.5 16.5C22 17.5 9 17.5 7 16Z"
              fill="#10b981"
              fill-opacity="0.35"
              stroke="#10b981"
              stroke-width="1.6"
              stroke-linejoin="round"
            />
            <!-- Ramas y tronco resistente -->
            <path
              d="M16 25V14M16 19L11 15M16 17L21 13M10 25H22"
              stroke="#10b981"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        <!-- Marca tipográfica -->
        <div class="flex items-center gap-2">
          <span class="font-bold tracking-tight text-zinc-900 dark:text-zinc-100 text-base sm:text-lg">
            Desarrollo <span class="text-emerald-500">Pampa</span>
          </span>
          <span
            class="text-[10px] font-mono font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
          >
            STUDIO
          </span>
        </div>
      </a>

      <!-- Centro: Navegación limpia (oculta en mobile) -->
      <nav class="hidden md:flex items-center gap-7">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-150"
        >
          {{ link.label }}
        </a>
      </nav>

      <!-- Derecha: Acciones (Theme Switcher + CTA Hablemos) -->
      <div class="flex items-center gap-3">
        <!-- Switch de modo claro/oscuro -->
        <button
          type="button"
          @click="uiStore.toggleTheme"
          :title="uiStore.isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
          class="w-9 h-9 rounded-full flex items-center justify-center border border-zinc-200 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-900/80 hover:border-emerald-500/40 text-zinc-600 dark:text-zinc-300 hover:text-emerald-500 transition-all duration-200 cursor-pointer active:scale-95"
          aria-label="Alternar tema"
        >
          <Sun v-if="uiStore.isDark" class="w-4 h-4 text-emerald-400" />
          <Moon v-else class="w-4 h-4 text-zinc-700" />
        </button>

        <!-- Botón Hablemos con estilo pill moderno -->
        <a
          href="#contacto"
          class="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-full bg-emerald-500 text-white shadow-sm hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.35)] active:scale-95 transition-all duration-200"
        >
          <span>Hablemos</span>
          <ArrowUpRight class="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  </header>
</template>
