<script setup lang="ts">
import { ref } from 'vue'
import { PROJECTS } from '@/data/projects'
import ProjectFloatingCard from '@/components/ProjectFloatingCard.vue'
import { ArrowDown, MessageSquare, Sparkles } from 'lucide-vue-next'

const heroRef = ref<HTMLElement | null>(null)
const mouseOffset = ref({ x: 0, y: 0 })

const handleMouseMove = (e: MouseEvent) => {
  if (typeof window === 'undefined' || window.innerWidth < 1280 || !heroRef.value) return
  const rect = heroRef.value.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  const normX = (e.clientX - centerX) / (rect.width / 2)
  const normY = (e.clientY - centerY) / (rect.height / 2)

  mouseOffset.value = {
    x: Math.max(-1, Math.min(1, normX)),
    y: Math.max(-1, Math.min(1, normY)),
  }
}

const handleMouseLeave = () => {
  mouseOffset.value = { x: 0, y: 0 }
}

const getParallaxStyle = (depth: number) => {
  if (typeof window !== 'undefined' && window.innerWidth < 1280) {
    return {}
  }
  const maxDisplacement = 12
  const tx = mouseOffset.value.x * maxDisplacement * depth
  const ty = mouseOffset.value.y * maxDisplacement * depth
  return {
    transform: `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`,
    willChange: 'transform',
    transition: 'transform 0.18s cubic-bezier(0.2, 0, 0, 1)',
  }
}

// Configuración espacial para las 4 tarjetas flotantes
const cardConfigs = [
  {
    // Arriba-Izquierda: ERP POS Taller
    project: PROJECTS[0]!,
    wrapperClass: 'xl:absolute xl:top-6 xl:left-4 2xl:left-6 xl:w-[310px] z-10',
    depth: 0.85,
  },
  {
    // Arriba-Derecha: MiAgenda SaaS
    project: PROJECTS[1]!,
    wrapperClass: 'xl:absolute xl:top-6 xl:right-4 2xl:right-6 xl:w-[310px] z-10',
    depth: 1.15,
  },
  {
    // Abajo-Izquierda: RIVE Store
    project: PROJECTS[2]!,
    wrapperClass: 'xl:absolute xl:bottom-8 xl:left-4 2xl:left-6 xl:w-[310px] z-10',
    depth: 1.05,
  },
  {
    // Abajo-Derecha: Travel Ops Enterprise
    project: PROJECTS[3]!,
    wrapperClass: 'xl:absolute xl:bottom-8 xl:right-4 2xl:right-6 xl:w-[310px] z-10',
    depth: 0.9,
  },
]
</script>

<template>
  <section
    ref="heroRef"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
    class="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden bg-pampa-grid flex items-center justify-center py-12 xl:py-24"
  >
    <!-- Resplandor ambiental radial sutil en tonos Verde Pampa (atmósfera Pryzm) -->
    <div
      class="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] sm:w-[680px] h-[350px] sm:h-[480px] bg-emerald-500/12 dark:bg-emerald-500/16 rounded-full blur-[140px]"
    ></div>

    <!-- Contenedor Espacial Principal -->
    <div class="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Bloque Central de Contenido -->
      <div class="max-w-2xl mx-auto text-center relative z-20">
        <!-- Pill Superior -->
        <div
          class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-6 backdrop-blur-xs"
        >
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Agencia de Software & Productos SaaS · Argentina</span>
          <Sparkles class="w-3 h-3 text-emerald-500 ml-0.5" />
        </div>

        <!-- Título Principal -->
        <h1
          class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.08] mb-6"
        >
          Software a medida y sistemas que
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-400 dark:from-emerald-400 dark:via-emerald-300 dark:to-teal-300"
          >
            impulsan tu negocio
          </span>
        </h1>

        <!-- Subtítulo Claro -->
        <p
          class="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed mb-8 max-w-xl mx-auto font-normal"
        >
          Desarrollamos plataformas SaaS, sistemas ERP/POS con facturación AFIP y soluciones
          digitales a medida listas para operar en la nube o en servidor local.
        </p>

        <!-- Botones de Acción (CTAs) -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <a
            href="#proyectos"
            class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-emerald-500 text-white hover:bg-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.38)] active:scale-95 transition-all duration-200 shadow-sm cursor-pointer"
          >
            <span>Explorar proyectos</span>
            <ArrowDown class="w-4 h-4" />
          </a>

          <a
            href="#contacto"
            class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <span>Consultar desarrollo</span>
            <MessageSquare class="w-4 h-4 text-emerald-500" />
          </a>
        </div>
      </div>

      <!-- Distribución de las 4 Tarjetas Flotantes:
           - En xl: Flotando en esquinas con Parallax suave de 60fps
           - En < xl: Grilla limpia y ordenada de 1 a 2 columnas debajo del texto
      -->
      <div
        class="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto xl:mt-0 xl:max-w-none xl:static"
      >
        <div
          v-for="config in cardConfigs"
          :key="config.project.id"
          :class="config.wrapperClass"
          :style="getParallaxStyle(config.depth)"
        >
          <ProjectFloatingCard :project="config.project" />
        </div>
      </div>
    </div>
  </section>
</template>
