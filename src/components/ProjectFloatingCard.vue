<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Project } from '@/types/project'
import { useUiStore } from '@/stores/uiStore'
import { Monitor, Calendar, ShoppingBag, Compass } from 'lucide-vue-next'

const props = withDefaults(
  defineProps<{
    project: Project
    aspectClass?: string
  }>(),
  {
    aspectClass: 'aspect-[16/10]',
  }
)

const uiStore = useUiStore()
const imageError = ref(!props.project.cardImage)

const handleImageError = () => {
  imageError.value = true
}

const handleClick = () => {
  uiStore.openProjectDrawer(props.project)
}

const fallbackIcon = computed(() => {
  switch (props.project.category) {
    case 'saas':
      return Calendar
    case 'ecommerce':
      return ShoppingBag
    case 'custom':
      return Compass
    case 'erp-pos':
    default:
      return Monitor
  }
})

const shortTitle = computed(() => {
  switch (props.project.id) {
    case 'pos-lubricentro':
      return 'ERP, POS & Taller'
    case 'miagenda-booking':
      return 'MiAgenda SaaS'
    case 'rive-store':
      return 'RIVE E-Commerce'
    case 'travel-agency':
      return 'Sistemas a Medida'
    case 'farmacias-turnos':
      return 'Turnos de Farmacias'
    default:
      return props.project.name.split('—')[0]?.trim() || props.project.name
  }
})

const imageClasses = computed(() => {
  const classes = ['w-full h-full object-cover transition-transform duration-700 ease-out']
  if (props.project.cardImagePosition) {
    classes.push(props.project.cardImagePosition)
    if (props.project.cardImagePosition.includes('scale-')) {
      classes.push('group-hover:scale-[1.20]')
    } else {
      classes.push('group-hover:scale-[1.04]')
    }
  } else {
    classes.push('object-center group-hover:scale-[1.04]')
  }
  return classes
})
</script>

<template>
  <div
    @click="handleClick"
    class="group cursor-pointer select-none w-full relative block"
    :aria-label="'Ver detalles del proyecto ' + project.name"
  >
    <!-- Marco de imagen puro estilo Pryzm -->
    <div
      :class="[
        'w-full rounded-2xl overflow-hidden border border-[var(--border-hairline)] bg-[var(--surface-card)] shadow-xl transition-all duration-500 group-hover:-translate-y-1 group-hover:border-[var(--brand-secondary)] group-hover:shadow-2xl relative',
        aspectClass || 'aspect-[16/10]',
      ]"
    >
      <!-- Captura real del sistema -->
      <img
        v-if="!imageError && project.cardImage"
        :src="project.cardImage"
        :alt="project.name"
        :class="imageClasses"
        @error="handleImageError"
      />

      <!-- Fallback elegante con degradado neutro -->
      <div
        v-else
        class="w-full h-full p-5 flex flex-col items-center justify-center text-center bg-gradient-to-br from-[var(--surface-accent-soft)] via-[var(--surface-card)] to-[var(--surface-accent-soft)]"
      >
        <div
          class="w-11 h-11 rounded-2xl flex items-center justify-center mb-3 border shadow-xs transition-transform duration-500 group-hover:scale-105"
          :style="{
            backgroundColor: `${project.accentColor}18`,
            color: project.accentColor,
            borderColor: `${project.accentColor}35`,
          }"
        >
          <component :is="fallbackIcon" class="w-5 h-5" />
        </div>
        <p class="text-xs text-[var(--ink-secondary)] font-sans line-clamp-2 leading-relaxed max-w-[220px]">
          {{ project.tagline }}
        </p>
      </div>
    </div>

    <!-- Etiqueta limpia por debajo (fuera del marco, estilo Pryzm) -->
    <div class="mt-3 px-0.5 flex items-start justify-between gap-2">
      <div class="min-w-0 pr-1">
        <h4 class="font-sans text-sm font-medium text-[var(--ink-primary)] truncate group-hover:text-[var(--brand-action)] transition-colors">
          {{ shortTitle }}
        </h4>
        <span class="font-mono text-[11px] tracking-wide text-[var(--ink-secondary)] opacity-75 block truncate mt-0.5">
          {{ project.categoryLabel }}
        </span>
      </div>

      <div
        class="text-[var(--brand-action)] text-base font-normal shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden="true"
      >
        ↗
      </div>
    </div>
  </div>
</template>
