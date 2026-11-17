<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Project } from '@/types/project'
import { useUiStore } from '@/stores/uiStore'
import { PosWidget, MiAgendaWidget, RiveWidget, TravelWidget } from '@/components/widgets'
import { ArrowUpRight } from 'lucide-vue-next'

const props = defineProps<{
  project: Project
}>()

const uiStore = useUiStore()

const widgetComponent = computed(() => {
  switch (props.project.widgetType) {
    case 'pos-lubricentro':
      return PosWidget
    case 'miagenda-booking':
      return MiAgendaWidget
    case 'rive-store':
      return RiveWidget
    case 'travel-agency':
      return TravelWidget
    default:
      return null
  }
})

const cardRef = ref<HTMLElement | null>(null)
const mouseX = ref(0)
const mouseY = ref(0)
const isHovered = ref(false)

const handleMouseMove = (e: MouseEvent) => {
  if (!cardRef.value) return
  const rect = cardRef.value.getBoundingClientRect()
  mouseX.value = e.clientX - rect.left
  mouseY.value = e.clientY - rect.top
  isHovered.value = true
}

const handleMouseLeave = () => {
  isHovered.value = false
}

const handleClick = () => {
  uiStore.openProjectDrawer(props.project)
}
</script>

<template>
  <div
    ref="cardRef"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
    @click="handleClick"
    class="relative group cursor-pointer transition-all duration-300 transform-gpu hover:-translate-y-1.5 hover:scale-[1.015]"
    :aria-label="'Ver detalles del proyecto ' + project.name"
  >
    <!-- Halo difuminado de color detrás (Lightspark glow) -->
    <div
      class="absolute -inset-1.5 rounded-3xl blur-2xl transition-opacity duration-500 pointer-events-none opacity-25 group-hover:opacity-60"
      :style="{ backgroundColor: project.accentColor }"
    ></div>

    <!-- Contenedor Glass Card -->
    <div
      class="relative glass-card rounded-2xl p-3 sm:p-3.5 overflow-hidden transition-all duration-300"
    >
      <!-- Spotlight con el mouse (gradiente radial proyectado) -->
      <div
        v-if="isHovered"
        class="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-200"
        :style="{
          background: `radial-gradient(280px circle at ${mouseX}px ${mouseY}px, ${project.accentColor}28, transparent 70%)`,
        }"
      ></div>

      <!-- Borde reactivo al spotlight -->
      <div
        v-if="isHovered"
        class="pointer-events-none absolute inset-0 rounded-2xl border transition-opacity duration-200"
        :style="{ borderColor: `${project.accentColor}60` }"
      ></div>

      <!-- Render dinámico del widget interactivo -->
      <div class="relative z-10">
        <component :is="widgetComponent" />
      </div>

      <!-- Fila discreta inferior: Nombre, categoría y acción "Ver caso" -->
      <div
        class="relative z-10 mt-3 pt-2.5 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between text-xs"
      >
        <div class="flex items-center gap-1.5 min-w-0 pr-2">
          <span
            class="w-2 h-2 rounded-full shrink-0 shadow-xs"
            :style="{ backgroundColor: project.accentColor }"
          ></span>
          <span
            class="font-medium text-zinc-700 dark:text-zinc-200 truncate text-[11px] sm:text-xs tracking-tight"
          >
            {{ project.categoryLabel }}
          </span>
        </div>

        <div
          class="flex items-center gap-1 shrink-0 text-zinc-500 dark:text-zinc-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors text-[11px] font-semibold"
        >
          <span>Ver caso</span>
          <ArrowUpRight
            class="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
          />
        </div>
      </div>
    </div>
  </div>
</template>
