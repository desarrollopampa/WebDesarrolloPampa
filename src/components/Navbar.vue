<script setup lang="ts">
import { useUiStore } from '@/stores/uiStore'
import { Sun, Moon, ArrowUpRight } from 'lucide-vue-next'

const uiStore = useUiStore()

const navLinks = [
  { label: 'Proyectos', href: '#inicio' },
  { label: 'Soluciones', href: '#soluciones' },
  { label: 'Cómo trabajamos', href: '#proceso' },
]
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full backdrop-blur-md bg-[var(--surface-card)] border-b border-[var(--border-hairline)] transition-colors duration-200"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
      <!-- Izquierda: Logo Oficial Desarrollo Pampa -->
      <a href="#" class="flex items-center gap-2.5 group select-none py-1">
        <img
          :src="uiStore.isDark ? '/brand/logo-invertido.svg' : '/brand/logo-principal.svg'"
          alt="Desarrollo Pampa - Software Factory"
          class="h-8 sm:h-9 md:h-10 w-auto object-contain transition-opacity duration-200"
        />
      </a>

      <!-- Centro: Navegación limpia (oculta en mobile) -->
      <nav class="hidden md:flex items-center gap-7">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="text-sm font-medium text-[var(--ink-secondary)] hover:text-[var(--brand-action)] transition-colors duration-150"
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
          class="w-9 h-9 rounded-full flex items-center justify-center border border-[var(--border-hairline)] bg-[var(--surface-accent-soft)] hover:border-[var(--brand-primary)] text-[var(--ink-primary)] transition-all duration-200 cursor-pointer active:scale-95"
          aria-label="Alternar tema"
        >
          <Sun v-if="uiStore.isDark" class="w-4 h-4 text-[var(--brand-primary)]" />
          <Moon v-else class="w-4 h-4 text-[var(--brand-primary)]" />
        </button>

        <!-- Botón Hablemos con estilo Lima + texto Grafito -->
        <a
          href="#contacto"
          class="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-full bg-[var(--brand-action)] text-[var(--brand-action-ink)] shadow-sm hover:brightness-95 hover:shadow-[0_0_20px_rgba(213,239,97,0.35)] active:scale-95 transition-all duration-200"
        >
          <span>Hablemos</span>
          <ArrowUpRight class="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  </header>
</template>
