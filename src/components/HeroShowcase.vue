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
  // Desplazamiento máximo ultra sutil de ±6px para no alterar las distancias mínimas
  const maxDisplacement = 6
  const tx = mouseOffset.value.x * maxDisplacement * depth
  const ty = mouseOffset.value.y * maxDisplacement * depth
  return {
    transform: `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`,
    willChange: 'transform',
    transition: 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)',
  }
}

// Configuración de las 5 tarjetas para grilla Mobile / Tablet (< xl)
const mobileCards = [
  {
    project: PROJECTS[0]!,
    aspectClass: 'aspect-[16/10]',
  },
  {
    project: PROJECTS[1]!,
    aspectClass: 'aspect-[4/3]',
  },
  {
    project: PROJECTS[2]!,
    aspectClass: 'aspect-[4/5]',
  },
  {
    project: PROJECTS[3]!,
    aspectClass: 'aspect-[16/10]',
  },
  {
    project: PROJECTS[4]!,
    aspectClass: 'aspect-[16/10]',
  },
]
</script>

<template>
  <section
    id="inicio"
    ref="heroRef"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
    class="relative w-full min-h-[calc(100vh-80px)] overflow-hidden bg-pampa-grid flex items-center justify-center py-8 xl:py-0"
  >
    <!-- Resplandor ambiental radial en tono Lima (atmósfera Campo eléctrico) -->
    <div
      class="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] sm:w-[680px] h-[350px] sm:h-[480px] bg-[var(--pampa-lima)]/18 dark:bg-[var(--pampa-lima)]/12 rounded-full blur-[140px]"
    ></div>

    <!-- Trama gráfica orgánica oficial (motivo.svg) -->
    <img
      src="/brand/motivo.svg"
      alt=""
      aria-hidden="true"
      class="pointer-events-none select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] max-w-none opacity-20 dark:opacity-15 mix-blend-multiply dark:mix-blend-screen"
    />

    <!-- Contenedor Principal: Grilla Espacial de 3 Columnas Anti-Colisión -->
    <div
      class="relative w-full max-w-[1480px] mx-auto px-6 xl:px-10 min-h-[calc(100vh-80px)] py-12 grid grid-cols-1 xl:grid-cols-[1fr_minmax(460px,520px)_1fr] items-center gap-8"
    >
      <!-- Columna 1 (Izquierda — 2 tarjetas: Lubricentro y RIVE) -->
      <div class="hidden xl:flex flex-col justify-between self-stretch py-4 gap-16">
        <!-- Arriba (self-start): Card 1 (Lubricentro ERP/POS) -->
        <div
          class="self-start w-[245px] 2xl:w-[270px]"
          :style="getParallaxStyle(0.85)"
        >
          <ProjectFloatingCard
            :project="PROJECTS[0]!"
            aspect-class="aspect-[16/10]"
          />
        </div>

        <!-- Abajo (self-end mr-4): Card 3 (RIVE E-Commerce) -->
        <div
          class="self-end mr-4 w-[190px] 2xl:w-[210px]"
          :style="getParallaxStyle(1.05)"
        >
          <ProjectFloatingCard
            :project="PROJECTS[2]!"
            aspect-class="aspect-[4/5]"
          />
        </div>
      </div>

      <!-- Columna 2 (Centro — Texto Principal + 5ª Tarjeta Farmacias en Desktop) -->
      <div class="flex flex-col items-center text-center max-w-[520px] mx-auto z-20">
        <!-- Pill Superior con tipografía mono -->
        <div
          class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-[var(--surface-accent-soft)] text-[var(--ink-primary)] border border-[var(--border-hairline)] mb-6 backdrop-blur-xs"
        >
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--pampa-lima)] opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-[var(--pampa-lima)]"></span>
          </span>
          <span class="tracking-widest uppercase">DESARROLLO PAMPA // CAMPO ELÉCTRICO</span>
          <Sparkles class="w-3 h-3 text-[var(--pampa-lima)] ml-0.5" />
        </div>

        <!-- Título Principal con Geist -->
        <h1
          class="font-display text-4xl sm:text-5xl lg:text-5xl 2xl:text-6xl font-bold tracking-tight text-[var(--ink-primary)] leading-[1.08] mb-6"
        >
          Software a medida y sistemas que
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-[var(--ink-primary)] to-[var(--pampa-acero)] dark:from-[var(--pampa-lima)] dark:to-lime-300"
          >
            impulsan tu negocio
          </span>
        </h1>

        <!-- Subtítulo Claro -->
        <p
          class="text-base sm:text-lg text-[var(--ink-secondary)] leading-relaxed mb-8 max-w-md 2xl:max-w-xl mx-auto font-normal font-sans"
        >
          Desarrollamos plataformas SaaS, sistemas ERP/POS con facturación AFIP y soluciones
          digitales a medida listas para operar en la nube o en servidor local.
        </p>

        <!-- Botones de Acción (CTAs) -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-3.5 font-sans">
          <a
            href="#soluciones"
            class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-[var(--brand-action)] text-[var(--brand-action-ink)] hover:brightness-95 hover:shadow-[0_0_30px_rgba(213,239,97,0.38)] active:scale-95 transition-all duration-200 shadow-sm cursor-pointer"
          >
            <span>Explorar proyectos</span>
            <ArrowDown class="w-4 h-4" />
          </a>

          <a
            href="#contacto"
            class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-[var(--surface-card)] hover:bg-[var(--surface-accent-soft)] text-[var(--ink-primary)] border border-[var(--border-hairline)] active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <span>Consultar desarrollo</span>
            <MessageSquare class="w-4 h-4 text-[var(--pampa-acero)] dark:text-[var(--pampa-lima)]" />
          </a>
        </div>

        <!-- 5ª Tarjeta: Turnos de Farmacias (Desktop xl:, centrada debajo de los botones para equilibrar la composición) -->
        <div
          class="hidden xl:block mt-12 self-center w-[255px] 2xl:w-[285px]"
          :style="getParallaxStyle(0.95)"
        >
          <ProjectFloatingCard
            :project="PROJECTS[4]!"
            aspect-class="aspect-[16/10]"
          />
        </div>
      </div>

      <!-- Columna 3 (Derecha — 2 tarjetas: MiAgenda y Sistemas a Medida) -->
      <div class="hidden xl:flex flex-col justify-between self-stretch py-4 gap-16">
        <!-- Arriba (self-end mr-4): Card 2 (MiAgenda SaaS) -->
        <div
          class="self-end mr-4 w-[225px] 2xl:w-[250px]"
          :style="getParallaxStyle(1.15)"
        >
          <ProjectFloatingCard
            :project="PROJECTS[1]!"
            aspect-class="aspect-[4/3]"
          />
        </div>

        <!-- Abajo (self-start ml-4): Card 4 (Sistemas a Medida / Agencias) -->
        <div
          class="self-start ml-4 w-[245px] 2xl:w-[270px]"
          :style="getParallaxStyle(0.9)"
        >
          <ProjectFloatingCard
            :project="PROJECTS[3]!"
            aspect-class="aspect-[16/10]"
          />
        </div>
      </div>

      <!-- Mobile / Tablet (< xl): Grilla responsiva limpia de las 5 tarjetas debajo del texto -->
      <div class="xl:hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto mt-12 w-full">
        <div
          v-for="card in mobileCards"
          :key="card.project.id"
          class="w-full"
        >
          <ProjectFloatingCard
            :project="card.project"
            :aspect-class="card.aspectClass"
          />
        </div>
      </div>
    </div>
  </section>
</template>
