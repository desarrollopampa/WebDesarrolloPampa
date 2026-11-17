<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Drawer from 'primevue/drawer'
import { useUiStore } from '@/stores/uiStore'
import { AGENCY_CONFIG } from '@/config/agency'
import {
  X,
  ExternalLink,
  CheckCircle2,
  Server,
  Layers,
  Cpu,
  MessageCircle,
  Radio,
  ArrowUpRight,
  Monitor,
} from 'lucide-vue-next'

const uiStore = useUiStore()

const project = computed(() => uiStore.selectedProject)

const selectedScreenshotIndex = ref(0)
const failedImages = ref<Record<string, boolean>>({})

// Reinicia la selección y los errores al cambiar de proyecto
watch(
  () => project.value?.id,
  () => {
    selectedScreenshotIndex.value = 0
    failedImages.value = {}
  }
)

const currentScreenshot = computed(() => {
  if (!project.value?.screenshots || project.value.screenshots.length === 0) return null
  return project.value.screenshots[selectedScreenshotIndex.value] || project.value.screenshots[0]
})

const whatsappUrl = computed(() => {
  if (!project.value) return '#'
  const message = `Hola Desarrollo Pampa! Estuve viendo el caso "${project.value.name}" (${project.value.categoryLabel}) en su web. Me interesa consultar por una solución o arquitectura similar para mi empresa. ¿Podemos coordinar?`
  return AGENCY_CONFIG.buildWhatsAppUrl(message)
})
</script>

<template>
  <Drawer
    v-model:visible="uiStore.isDrawerOpen"
    position="right"
    class="!w-full md:!w-[620px] lg:!w-[720px] !max-w-full !border-l !border-zinc-200 dark:!border-zinc-800/80 !shadow-2xl"
    :show-close-icon="false"
  >
    <template #container="{ closeCallback }">
      <div
        v-if="project"
        class="h-full flex flex-col bg-white dark:bg-[#0b100d] text-zinc-800 dark:text-zinc-100 overflow-hidden font-sans"
      >
        <!-- Encabezado Sticky con Categoría, Título y Botón Cerrar -->
        <div
          class="shrink-0 p-5 sm:p-6 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/90 dark:bg-[#0b100d]/90 backdrop-blur-md sticky top-0 z-20 flex items-start justify-between gap-4"
        >
          <div class="space-y-1.5 min-w-0">
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
                class="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 inline-flex items-center gap-1"
              >
                <Radio class="w-2.5 h-2.5 animate-pulse text-emerald-500" />
                En Producción
              </span>
            </div>

            <!-- Título del proyecto -->
            <h2 class="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
              {{ project.name }}
            </h2>

            <!-- Tagline -->
            <p class="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-medium">
              {{ project.tagline }}
            </p>
          </div>

          <!-- Botones de Acción de Cabecera (Link en vivo opcional + Cerrar) -->
          <div class="flex items-center gap-2 shrink-0">
            <a
              v-if="project.liveUrl"
              :href="project.liveUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 transition-colors"
              title="Abrir sitio en vivo en pestaña nueva"
            >
              <span>Ver sitio</span>
              <ExternalLink class="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              @click="closeCallback"
              class="w-9 h-9 rounded-full flex items-center justify-center border border-zinc-200 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-900/80 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors cursor-pointer"
              aria-label="Cerrar panel de detalles"
            >
              <X class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Cuerpo del Drawer con Scroll Suave -->
        <div class="flex-1 overflow-y-auto p-5 sm:p-6 space-y-7">
          <!-- Grilla de Métricas Clave -->
          <div>
            <h3 class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">
              Métricas de Rendimiento & Operación
            </h3>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div
                v-for="(metric, idx) in project.metrics"
                :key="idx"
                class="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800/60 flex flex-col justify-between"
              >
                <span class="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400 font-medium leading-snug">
                  {{ metric.label }}
                </span>
                <span
                  class="text-sm sm:text-base font-mono font-bold mt-1.5 text-zinc-900 dark:text-white"
                  :style="{ color: project.accentColor }"
                >
                  {{ metric.value }}
                </span>
              </div>
            </div>
          </div>

          <!-- Vista Previa del Sistema (Capturas Limpias con Fallback Elegante) -->
          <div v-if="project.screenshots && project.screenshots.length > 0" class="space-y-3">
            <div class="flex items-center justify-between">
              <h3 class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Vista Previa del Sistema
              </h3>
              <span class="text-[10px] font-mono text-zinc-400">
                {{ selectedScreenshotIndex + 1 }} / {{ project.screenshots.length }}
              </span>
            </div>

            <!-- Marco Minimalista Limpio (sin barras de navegador) -->
            <div
              class="rounded-xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/80 shadow-xs"
            >
              <div class="relative aspect-video w-full flex items-center justify-center overflow-hidden">
                <!-- Imagen real si existe y no falló -->
                <img
                  v-if="currentScreenshot && !failedImages[currentScreenshot.src]"
                  :src="currentScreenshot.src"
                  :alt="currentScreenshot.caption"
                  class="w-full h-full object-cover transition-opacity duration-300"
                  @error="failedImages[currentScreenshot.src] = true"
                />

                <!-- Fallback elegante si aún no se subió el archivo a /public/projects/ -->
                <div
                  v-else
                  class="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-zinc-100 to-zinc-50 dark:from-zinc-900/90 dark:to-zinc-950/90"
                >
                  <div
                    class="w-12 h-12 rounded-xl flex items-center justify-center mb-3 border shadow-xs"
                    :style="{
                      backgroundColor: `${project.accentColor}15`,
                      color: project.accentColor,
                      borderColor: `${project.accentColor}30`,
                    }"
                  >
                    <Monitor class="w-6 h-6" />
                  </div>
                  <span class="text-xs font-mono font-bold tracking-tight mb-1 text-zinc-800 dark:text-zinc-200">
                    {{ currentScreenshot?.caption }}
                  </span>
                  <span class="text-[11px] text-zinc-400 dark:text-zinc-500 max-w-sm font-sans">
                    Interfaz de producción desplegada ·
                    <span class="font-mono text-emerald-500">{{ currentScreenshot?.src }}</span>
                  </span>
                </div>
              </div>

              <!-- Pie de foto (caption) -->
              <div
                class="p-3 bg-white/70 dark:bg-zinc-900/70 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between text-xs"
              >
                <span class="text-zinc-600 dark:text-zinc-300 font-medium text-[11px] sm:text-xs">
                  {{ currentScreenshot?.caption }}
                </span>
                <span class="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold shrink-0 ml-2">
                  ✓ Entorno Real
                </span>
              </div>
            </div>

            <!-- Selector de Miniaturas (si hay más de 1 captura) -->
            <div v-if="project.screenshots.length > 1" class="flex items-center gap-2 overflow-x-auto pb-1">
              <button
                v-for="(_, sIdx) in project.screenshots"
                :key="sIdx"
                type="button"
                @click="selectedScreenshotIndex = sIdx"
                class="px-2.5 py-1.5 rounded-lg text-[11px] font-mono font-medium transition-all duration-150 border cursor-pointer shrink-0 text-left"
                :class="
                  selectedScreenshotIndex === sIdx
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-zinc-900 dark:border-white shadow-xs'
                    : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400'
                "
              >
                Captura {{ sIdx + 1 }}
              </button>
            </div>
          </div>

          <!-- Descripción Completa & Modalidades de Despliegue -->
          <div class="space-y-3">
            <h3 class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Visión General del Sistema
            </h3>
            <p class="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
              {{ project.fullDescription }}
            </p>

            <!-- Modalidades de despliegue -->
            <div class="pt-2">
              <span class="text-xs font-mono text-zinc-400 dark:text-zinc-500 block mb-2">
                Modalidades de Despliegue Soportadas:
              </span>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="mode in project.deploymentModes"
                  :key="mode"
                  class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20"
                >
                  <Server class="w-3 h-3 text-emerald-500" />
                  {{ mode }}
                </span>
              </div>
            </div>
          </div>

          <!-- Implementaciones Destacadas -->
          <div>
            <h3 class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">
              Implementaciones Destacadas
            </h3>
            <div class="space-y-3">
              <div
                v-for="(highlight, idx) in project.highlights"
                :key="idx"
                class="p-3.5 rounded-xl bg-zinc-50/70 dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-zinc-800/60 flex items-start gap-3"
              >
                <div class="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <CheckCircle2 class="w-4 h-4" />
                </div>
                <div>
                  <h4 class="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    {{ highlight.title }}
                  </h4>
                  <p class="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                    {{ highlight.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Desglose Visual del Stack Tecnológico -->
          <div>
            <h3 class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">
              Stack Tecnológico de Producción
            </h3>
            <div class="space-y-3">
              <!-- Backend -->
              <div class="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800/60">
                <div class="flex items-center gap-2 mb-2">
                  <Cpu class="w-3.5 h-3.5 text-emerald-500" />
                  <span class="text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300">
                    Backend & Base de Datos
                  </span>
                </div>
                <div class="flex flex-wrap gap-1.5">
                  <span
                    v-for="tech in project.techStack.backend"
                    :key="tech"
                    class="px-2.5 py-0.5 rounded text-xs font-mono bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 shadow-xs"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>

              <!-- Frontend -->
              <div class="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800/60">
                <div class="flex items-center gap-2 mb-2">
                  <Layers class="w-3.5 h-3.5 text-blue-500" />
                  <span class="text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300">
                    Frontend & Experiencia de Usuario
                  </span>
                </div>
                <div class="flex flex-wrap gap-1.5">
                  <span
                    v-for="tech in project.techStack.frontend"
                    :key="tech"
                    class="px-2.5 py-0.5 rounded text-xs font-mono bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 shadow-xs"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>

              <!-- Infraestructura -->
              <div class="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800/60">
                <div class="flex items-center gap-2 mb-2">
                  <Server class="w-3.5 h-3.5 text-purple-500" />
                  <span class="text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300">
                    Infraestructura & Despliegue
                  </span>
                </div>
                <div class="flex flex-wrap gap-1.5">
                  <span
                    v-for="tech in project.techStack.infrastructure"
                    :key="tech"
                    class="px-2.5 py-0.5 rounded text-xs font-mono bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 shadow-xs"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Barra Inferior Fija (Sticky Footer) con CTA de WhatsApp usando AGENCY_CONFIG -->
        <div
          class="shrink-0 p-4 sm:p-5 border-t border-zinc-200/80 dark:border-zinc-800/80 bg-white/95 dark:bg-[#0b100d]/95 backdrop-blur-md flex items-center justify-between gap-3"
        >
          <div class="hidden sm:block">
            <p class="text-xs font-medium text-zinc-700 dark:text-zinc-300">
              ¿Tenés un requerimiento específico?
            </p>
            <p class="text-[11px] text-zinc-500 dark:text-zinc-400">
              Respuesta y asesoramiento técnico directo en el día.
            </p>
          </div>

          <a
            :href="whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-emerald-500 text-white hover:bg-emerald-400 hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] active:scale-95 transition-all duration-200 shadow-sm cursor-pointer"
          >
            <MessageCircle class="w-4 h-4" />
            <span>Consultar por un sistema similar</span>
            <ArrowUpRight class="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </template>
  </Drawer>
</template>
