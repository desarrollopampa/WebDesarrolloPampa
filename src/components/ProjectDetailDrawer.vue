<script setup lang="ts">
import { computed, watch, onMounted, onUnmounted } from 'vue'
import { useUiStore } from '@/stores/uiStore'
import { AGENCY_CONFIG } from '@/config/agency'
import {
  X,
  ExternalLink,
  CheckCircle2,
  MessageCircle,
  Radio,
  ArrowUpRight,
} from 'lucide-vue-next'

const uiStore = useUiStore()

const project = computed(() => uiStore.selectedProject)

const whatsappUrl = computed(() => {
  if (!project.value) return '#'
  const message = `Hola Desarrollo Pampa! Estuve viendo el caso "${project.value.name}" (${project.value.categoryLabel}) en su web. Me interesa consultar por una solución similar para mi empresa. ¿Podemos coordinar?`
  return AGENCY_CONFIG.buildWhatsAppUrl(message)
})

const closeDrawer = () => {
  uiStore.closeProjectDrawer()
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && uiStore.isDrawerOpen) {
    closeDrawer()
  }
}

watch(
  () => uiStore.isDrawerOpen,
  (isOpen) => {
    if (typeof document === 'undefined') return
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
)

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeyDown)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleKeyDown)
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <Teleport to="body">
    <!-- Contenedor general del Drawer Nativo -->
    <div
      v-if="uiStore.isDrawerOpen"
      class="fixed inset-0 z-50 overflow-hidden font-sans select-none"
      role="dialog"
      aria-modal="true"
      :aria-label="project ? 'Detalles de ' + project.name : 'Detalle de proyecto'"
    >
      <!-- Backdrop translúcido con desenfoque suave -->
      <Transition
        appear
        enter-active-class="transition-opacity duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          class="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity cursor-pointer"
          @click="closeDrawer"
          aria-hidden="true"
        ></div>
      </Transition>

      <!-- Panel deslizante desde la derecha -->
      <div class="fixed inset-y-0 right-0 flex max-w-full pl-0 sm:pl-10 pointer-events-none select-text">
        <Transition
          appear
          enter-active-class="transform transition ease-out duration-300"
          enter-from-class="translate-x-full"
          enter-to-class="translate-x-0"
          leave-active-class="transform transition ease-in duration-200"
          leave-from-class="translate-x-0"
          leave-to-class="translate-x-full"
        >
          <div
            v-if="uiStore.isDrawerOpen"
            class="w-screen max-w-full md:max-w-[620px] lg:max-w-[700px] pointer-events-auto h-full flex flex-col bg-[var(--surface-canvas)] text-[var(--ink-primary)] border-l border-[var(--border-hairline)] shadow-2xl overflow-hidden"
          >
            <!-- Contenido del proyecto si existe -->
            <div v-if="project" class="h-full flex flex-col overflow-hidden">
              <!-- Encabezado Sticky con Categoría, Título, Bajada y Botones de Acción -->
              <div
                class="shrink-0 p-5 sm:p-6 border-b border-[var(--border-hairline)] bg-[var(--surface-canvas)]/90 backdrop-blur-md sticky top-0 z-20 flex items-start justify-between gap-4"
              >
                <div class="space-y-2 min-w-0 pr-1">
                  <!-- Badge de categoría y estado -->
                  <div class="flex items-center gap-2 flex-wrap">
                    <span
                      class="inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full border"
                      :style="{
                        backgroundColor: `${project.accentColor}18`,
                        color: project.accentColor,
                        borderColor: `${project.accentColor}40`,
                      }"
                    >
                      <span class="w-1.5 h-1.5 rounded-full" :style="{ backgroundColor: project.accentColor }"></span>
                      {{ project.categoryLabel }}
                    </span>

                    <span
                      class="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-[var(--surface-accent-soft)] text-[var(--ink-primary)] border border-[var(--border-hairline)] inline-flex items-center gap-1"
                    >
                      <Radio class="w-2.5 h-2.5 animate-pulse text-[var(--brand-action)]" />
                      En Producción
                    </span>
                  </div>

                  <!-- Título del proyecto con Noto Serif Display -->
                  <h2 class="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink-primary)] leading-tight">
                    {{ project.name }}
                  </h2>

                  <!-- Tagline / Bajada clara comercial -->
                  <p class="text-xs sm:text-sm text-[var(--ink-secondary)] font-medium leading-relaxed">
                    {{ project.tagline }}
                  </p>
                </div>

                <!-- Botones de Acción de Cabecera (Link en vivo SOLO si existe + Cerrar) -->
                <div class="flex items-center gap-2 shrink-0 pt-0.5">
                  <a
                    v-if="project.liveUrl"
                    :href="project.liveUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--surface-card)] hover:bg-[var(--surface-accent-soft)] text-[var(--ink-primary)] border border-[var(--border-hairline)] transition-colors cursor-pointer"
                    title="Abrir sitio en vivo en pestaña nueva"
                  >
                    <span>Ver sitio</span>
                    <ExternalLink class="w-3.5 h-3.5 text-[var(--brand-action)]" />
                  </a>

                  <button
                    type="button"
                    @click="closeDrawer"
                    class="w-9 h-9 rounded-full flex items-center justify-center border border-[var(--border-hairline)] bg-[var(--surface-card)] text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] hover:border-[var(--brand-primary)] transition-colors cursor-pointer"
                    aria-label="Cerrar panel de detalles"
                  >
                    <X class="w-4 h-4" />
                  </button>
                </div>
              </div>

              <!-- Cuerpo del Drawer con Scroll Suave y Contenido Humano -->
              <div class="flex-1 overflow-y-auto p-5 sm:p-7 space-y-8">
                <!-- Visión General del Sistema -->
                <div class="space-y-3">
                  <h3 class="text-xs font-mono font-bold uppercase tracking-wider text-[var(--ink-secondary)] opacity-75">
                    Visión General del Sistema
                  </h3>
                  <p class="text-sm sm:text-base text-[var(--ink-primary)] leading-relaxed font-normal font-sans">
                    {{ project.fullDescription }}
                  </p>
                </div>

                <!-- Qué Resuelve / Funcionalidades Clave -->
                <div class="space-y-4">
                  <h3 class="text-xs font-mono font-bold uppercase tracking-wider text-[var(--ink-secondary)] opacity-75">
                    Qué Resuelve // Funcionalidades Clave
                  </h3>
                  <div class="space-y-3">
                    <div
                      v-for="(highlight, idx) in project.highlights"
                      :key="idx"
                      class="p-4 rounded-xl bg-[var(--surface-card)] border border-[var(--border-hairline)] flex items-start gap-3.5 transition-colors hover:border-[var(--brand-secondary)]/40 shadow-xs"
                    >
                      <div class="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-[var(--surface-accent-soft)] flex items-center justify-center text-[var(--brand-action)]">
                        <CheckCircle2 class="w-4 h-4" />
                      </div>
                      <div class="space-y-1">
                        <h4 class="text-xs sm:text-sm font-bold text-[var(--ink-primary)]">
                          {{ highlight.title }}
                        </h4>
                        <p class="text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed font-normal">
                          {{ highlight.description }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Barra Inferior Fija (Sticky Footer) con CTA de Consulta -->
              <div
                class="shrink-0 p-4 sm:p-5 border-t border-[var(--border-hairline)] bg-[var(--surface-canvas)]/95 backdrop-blur-md flex items-center justify-between gap-3"
              >
                <div class="hidden sm:block">
                  <p class="text-xs font-medium text-[var(--ink-primary)]">
                    ¿Tenés un requerimiento específico?
                  </p>
                  <p class="text-[11px] text-[var(--ink-secondary)]">
                    Asesoramiento directo y propuesta a medida en el día.
                  </p>
                </div>

                <a
                  :href="whatsappUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-[var(--brand-action)] text-[var(--brand-action-ink)] hover:opacity-90 hover:shadow-[0_0_25px_rgba(166,67,53,0.38)] active:scale-95 transition-all duration-200 shadow-sm cursor-pointer"
                >
                  <MessageCircle class="w-4 h-4" />
                  <span>Consultar por un sistema similar</span>
                  <ArrowUpRight class="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </Teleport>
</template>
