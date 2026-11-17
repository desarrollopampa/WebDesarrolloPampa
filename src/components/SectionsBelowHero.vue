<script setup lang="ts">
import { ref } from 'vue'
import { PROJECTS } from '@/data/projects'
import { useUiStore } from '@/stores/uiStore'
import { AGENCY_CONFIG } from '@/config/agency'
import { vReveal } from '@/composables/useReveal'
import {
  Server,
  Cloud,
  ShieldCheck,
  Globe,
  Wifi,
  CheckCircle2,
  ArrowUpRight,
  MessageCircle,
  Send,
  Sparkles,
  Database,
  Lock,
  MapPin,
  Clock,
  Layers,
  Mail,
} from 'lucide-vue-next'

const uiStore = useUiStore()

const form = ref({
  name: '',
  projectType: 'erp-pos',
  message: '',
})

const isSubmitted = ref(false)

const handleFormSubmit = () => {
  const typeLabels: Record<string, string> = {
    'erp-pos': 'ERP / POS / Taller',
    saas: 'Plataforma SaaS / Reservas',
    ecommerce: 'E-Commerce / Catálogo',
    custom: 'Software a Medida / Enterprise',
    otro: 'Otro Desarrollo',
  }
  const typeText = typeLabels[form.value.projectType] || form.value.projectType
  const clientName = form.value.name.trim() || 'Contacto Web'
  const clientMsg =
    form.value.message.trim() ||
    'Quisiera coordinar una breve charla técnica para conocer costos y tiempos.'

  const message = `Hola Desarrollo Pampa!\nMi nombre es: ${clientName}\nTipo de proyecto: ${typeText}\nDetalle: ${clientMsg}`

  const url = AGENCY_CONFIG.buildWhatsAppUrl(message)
  window.open(url, '_blank')
  isSubmitted.value = true
  setTimeout(() => {
    isSubmitted.value = false
  }, 4000)
}
</script>

<template>
  <div class="space-y-28 sm:space-y-36 py-20 lg:py-28 overflow-hidden">
    <!-- ================================================================= -->
    <!-- SECCIÓN 1: #proyectos (Vista en Grilla / Resumen)                -->
    <!-- ================================================================= -->
    <section id="proyectos" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <!-- Encabezado de Sección con v-reveal -->
      <div v-reveal class="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
        <div
          class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-4"
        >
          <Layers class="w-3.5 h-3.5 text-emerald-500" />
          <span>PORTFOLIO DE CASOS REALES</span>
        </div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.15] mb-5">
          Sistemas en producción desarrollados para el
          <span class="text-emerald-500">mundo real</span>
        </h2>
        <p class="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
          No creamos maquetas ni proyectos descartables. Cada solución resuelve procesos críticos de
          negocio con alta concurrencia, facturación fiscal nativa y automatización.
        </p>
      </div>

      <!-- Grilla de Tarjetas de Proyectos con v-reveal -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        <div
          v-for="(project, pIdx) in PROJECTS"
          :key="project.id"
          v-reveal="{ delay: pIdx * 100 }"
          @click="uiStore.openProjectDrawer(project)"
          class="group glass-card rounded-2xl p-6 sm:p-7 border border-zinc-200/80 dark:border-zinc-800/80 hover:border-emerald-500/50 dark:hover:border-emerald-500/40 transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl"
        >
          <div>
            <!-- Categoría y acento -->
            <div class="flex items-center justify-between gap-3 mb-4">
              <span
                class="inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full border"
                :style="{
                  backgroundColor: `${project.accentColor}14`,
                  color: project.accentColor,
                  borderColor: `${project.accentColor}35`,
                }"
              >
                <span class="w-1.5 h-1.5 rounded-full" :style="{ backgroundColor: project.accentColor }"></span>
                {{ project.categoryLabel }}
              </span>

              <span class="text-[11px] font-mono text-zinc-400 dark:text-zinc-500">
                Ver arquitectura →
              </span>
            </div>

            <!-- Título y Tagline -->
            <h3 class="text-xl font-bold tracking-tight text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              {{ project.name }}
            </h3>
            <p class="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 mb-4 leading-relaxed font-medium">
              {{ project.tagline }}
            </p>

            <p class="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6 font-normal">
              {{ project.shortDescription }}
            </p>

            <!-- Mini Grilla de Métricas Destacadas -->
            <div class="grid grid-cols-2 gap-2 mb-6 p-3 rounded-xl bg-zinc-50/80 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800/60">
              <div v-for="(metric, mIdx) in project.metrics.slice(0, 2)" :key="mIdx">
                <span class="text-[10px] text-zinc-400 block font-medium">
                  {{ metric.label }}
                </span>
                <span
                  class="text-xs sm:text-sm font-mono font-bold"
                  :style="{ color: project.accentColor }"
                >
                  {{ metric.value }}
                </span>
              </div>
            </div>

            <!-- Highlights de muestra -->
            <ul class="space-y-2 mb-6">
              <li
                v-for="(hl, hIdx) in project.highlights.slice(0, 3)"
                :key="hIdx"
                class="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-300"
              >
                <CheckCircle2 class="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span class="leading-snug">{{ hl.title }}</span>
              </li>
            </ul>
          </div>

          <!-- Botón de apertura de Drawer -->
          <div class="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs">
            <div class="flex items-center gap-1.5 font-mono text-[11px] text-zinc-400">
              <span>Stack:</span>
              <span class="text-zinc-700 dark:text-zinc-300 font-semibold truncate max-w-[190px]">
                {{ project.techStack.backend[0] }}, {{ project.techStack.frontend[0] }}
              </span>
            </div>

            <button
              type="button"
              class="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform cursor-pointer"
            >
              <span>Detalles del caso</span>
              <ArrowUpRight class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- ================================================================= -->
    <!-- SECCIÓN 2: #modalidades / #arquitectura (Nube SaaS vs. Local)     -->
    <!-- ================================================================= -->
    <section id="modalidades" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div id="arquitectura" class="scroll-mt-24"></div>
      <div v-reveal class="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
        <div
          class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-4"
        >
          <Server class="w-3.5 h-3.5 text-emerald-500" />
          <span>ARQUITECTURA & DESPLIEGUE FLEXIBLE</span>
        </div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.15] mb-5">
          ¿Nube SaaS o Servidor Local en tu Red LAN?
          <span class="text-emerald-500">Vos elegís.</span>
        </h2>
        <p class="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
          Sabemos que en la Argentina real los cortes de conectividad existen. Diseñamos nuestras
          soluciones para que tu negocio nunca se frene por falta de Internet.
        </p>
      </div>

      <!-- Comparativa en 2 Tarjetas Glassmorphic con v-reveal -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Tarjeta 1: Servidor Local LAN -->
        <div
          v-reveal="{ delay: 100 }"
          class="glass-card rounded-2xl p-7 sm:p-9 border border-zinc-200/80 dark:border-zinc-800/80 relative overflow-hidden"
        >
          <div class="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6">
            <Server class="w-6 h-6" />
          </div>

          <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-3">
            <Wifi class="w-3 h-3" />
            <span>MODO OFFLINE FIRST</span>
          </div>

          <h3 class="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mb-3">
            Servidor Local LAN Autónomo
          </h3>
          <p class="text-sm text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
            Ideal para lubricentros, talleres mecánicos, corralones y distribuidoras donde la caja no
            puede detenerse ni un solo segundo.
          </p>

          <ul class="space-y-3.5 mb-8">
            <li class="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300">
              <CheckCircle2 class="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>
                <strong>Velocidad instantánea:</strong> Tiempos de respuesta de sub-milisegundos al
                operar directamente sobre la red local de la empresa.
              </span>
            </li>
            <li class="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300">
              <CheckCircle2 class="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>
                <strong>Tolerancia cero a caídas de Internet:</strong> Seguís vendiendo, emitiendo
                remitos y despachando aunque el proveedor de fibra falle.
              </span>
            </li>
            <li class="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300">
              <CheckCircle2 class="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>
                <strong>Sincronización asíncrona inteligente:</strong> Al restablecerse la red, las
                facturas y transacciones se sincronizan de forma transparente.
              </span>
            </li>
            <li class="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300">
              <CheckCircle2 class="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>
                <strong>Soberanía total de datos:</strong> Tu base de datos PostgreSQL/MySQL reside en
                tu propio equipamiento con backups cifrados automáticos.
              </span>
            </li>
          </ul>

          <div class="p-4 rounded-xl bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/15 flex items-center gap-3">
            <Database class="w-5 h-5 text-emerald-500 shrink-0" />
            <p class="text-xs text-zinc-600 dark:text-zinc-300">
              Desplegamos en mini-PC / servidores Linux locales mediante contenedores Docker listos para enchufar y usar.
            </p>
          </div>
        </div>

        <!-- Tarjeta 2: Nube SaaS -->
        <div
          v-reveal="{ delay: 200 }"
          class="glass-card rounded-2xl p-7 sm:p-9 border border-zinc-200/80 dark:border-zinc-800/80 relative overflow-hidden"
        >
          <div class="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
            <Cloud class="w-6 h-6" />
          </div>

          <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 mb-3">
            <Globe class="w-3 h-3" />
            <span>ACCESO GLOBAL MULTI-DISPOSITIVO</span>
          </div>

          <h3 class="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mb-3">
            Nube SaaS Multi-Tenant o Dedicada
          </h3>
          <p class="text-sm text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
            Ideal para plataformas de reservas, SaaS por suscripción, e-commerce masivo y empresas con
            sucursales distribuidas geográficamente.
          </p>

          <ul class="space-y-3.5 mb-8">
            <li class="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300">
              <CheckCircle2 class="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <span>
                <strong>Acceso ubicuo 24/7:</strong> Gestioná tu negocio desde cualquier computadora,
                tablet o teléfono con experiencia web progresiva (PWA).
              </span>
            </li>
            <li class="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300">
              <CheckCircle2 class="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <span>
                <strong>Cero mantenimiento de hardware:</strong> Olvidate de servidores físicos en tu
                oficina. Infraestructura en VPS Linux con backups continuos.
              </span>
            </li>
            <li class="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300">
              <CheckCircle2 class="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <span>
                <strong>Integraciones nativas en la nube:</strong> Webhooks en tiempo real con
                MercadoPago, Twilio WhatsApp, Google Calendar y correos dinámicos.
              </span>
            </li>
            <li class="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300">
              <CheckCircle2 class="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <span>
                <strong>Escalabilidad elástica:</strong> Capacidad de absorber picos de tráfico y miles
                de consultas por segundo con caché en memoria Redis.
              </span>
            </li>
          </ul>

          <div class="p-4 rounded-xl bg-blue-500/5 dark:bg-blue-950/20 border border-blue-500/15 flex items-center gap-3">
            <Lock class="w-5 h-5 text-blue-500 shrink-0" />
            <p class="text-xs text-zinc-600 dark:text-zinc-300">
              Certificados SSL automáticos, firewalls perimetrales y aislamiento de datos por inquilino.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ================================================================= -->
    <!-- SECCIÓN 3: #contacto & Footer                                    -->
    <!-- ================================================================= -->
    <section id="contacto" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div v-reveal class="glass-card rounded-3xl p-8 sm:p-12 lg:p-16 border border-zinc-200/80 dark:border-zinc-800/80 relative overflow-hidden">
        <!-- Resplandor sutil decorativo -->
        <div class="absolute -right-20 -bottom-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
          <!-- Columna Izquierda: Información de Desarrollo Pampa -->
          <div class="lg:col-span-5 space-y-6">
            <div
              class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
            >
              <Sparkles class="w-3.5 h-3.5 text-emerald-500" />
              <span>INICIÁ TU PROYECTO</span>
            </div>

            <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight">
              Hablemos de tu próximo sistema
            </h2>

            <p class="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
              <strong>{{ AGENCY_CONFIG.name }}</strong> es una agencia boutique de ingeniería de software con base en {{ AGENCY_CONFIG.location }}. Trabajamos directamente con dueños de empresas, fundadores y equipos operativos para construir soluciones sólidas que eliminan tareas manuales y multiplican la rentabilidad.
            </p>

            <div class="space-y-4 pt-4 border-t border-zinc-200/60 dark:border-zinc-800/60 text-xs sm:text-sm">
              <div class="flex items-center gap-3 text-zinc-600 dark:text-zinc-300">
                <div class="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                  <Clock class="w-4 h-4" />
                </div>
                <span>Respuesta técnica y presupuesto en menos de 24 horas hábiles.</span>
              </div>

              <div class="flex items-center gap-3 text-zinc-600 dark:text-zinc-300">
                <div class="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                  <MapPin class="w-4 h-4" />
                </div>
                <span>{{ AGENCY_CONFIG.location }} · Operación para todo el país y el exterior.</span>
              </div>

              <div class="flex items-center gap-3 text-zinc-600 dark:text-zinc-300">
                <div class="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                  <Mail class="w-4 h-4" />
                </div>
                <a :href="'mailto:' + AGENCY_CONFIG.email" class="hover:text-emerald-500 transition-colors">
                  {{ AGENCY_CONFIG.email }}
                </a>
              </div>

              <div class="flex items-center gap-3 text-zinc-600 dark:text-zinc-300">
                <div class="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                  <ShieldCheck class="w-4 h-4" />
                </div>
                <span>Código propietario, sin ataduras a licencias mensuales obligatorias.</span>
              </div>
            </div>
          </div>

          <!-- Columna Derecha: Formulario Rápido -->
          <div class="lg:col-span-7 bg-white/70 dark:bg-zinc-900/60 rounded-2xl p-6 sm:p-8 border border-zinc-200/70 dark:border-zinc-800/80 shadow-xs">
            <h3 class="text-lg font-bold text-zinc-900 dark:text-white mb-2">
              Envianos tu consulta directa
            </h3>
            <p class="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
              Completá el formulario para iniciar la conversación por WhatsApp con los datos ya ordenados:
            </p>

            <form @submit.prevent="handleFormSubmit" class="space-y-4">
              <div>
                <label class="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Tu Nombre o Empresa:
                </label>
                <input
                  v-model="form.name"
                  type="text"
                  placeholder="Ej: Martín Rodríguez / Taller Central"
                  required
                  class="w-full px-3.5 py-2.5 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500 text-zinc-900 dark:text-white placeholder-zinc-400 transition-colors"
                />
              </div>

              <div>
                <label class="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Tipo de Sistema / Necesidad:
                </label>
                <select
                  v-model="form.projectType"
                  class="w-full px-3.5 py-2.5 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500 text-zinc-900 dark:text-white transition-colors cursor-pointer"
                >
                  <option value="erp-pos">Sistema ERP, POS y Facturación AFIP</option>
                  <option value="saas">Plataforma SaaS de Turnos / Reservas Online</option>
                  <option value="ecommerce">E-Commerce con Cierre a WhatsApp</option>
                  <option value="custom">Desarrollo a Medida para Empresa / Turismo</option>
                  <option value="otro">Otro Requerimiento Personalizado</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Breve descripción de lo que necesitás:
                </label>
                <textarea
                  v-model="form.message"
                  rows="3"
                  placeholder="Contanos brevemente sobre tus procesos actuales, cantidad de sucursales o la funcionalidad principal que buscás..."
                  class="w-full px-3.5 py-2.5 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500 text-zinc-900 dark:text-white placeholder-zinc-400 transition-colors resize-none"
                ></textarea>
              </div>

              <div class="pt-2">
                <button
                  type="submit"
                  class="w-full py-3 px-6 rounded-full text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 text-white shadow-sm hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] active:scale-98 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle class="w-4 h-4" />
                  <span>{{ isSubmitted ? 'Iniciando WhatsApp...' : 'Enviar Consulta por WhatsApp' }}</span>
                  <Send class="w-3.5 h-3.5 ml-1" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- ================================================================= -->
    <!-- FOOTER MINIMALISTA                                                -->
    <!-- ================================================================= -->
    <footer class="border-t border-zinc-200/80 dark:border-zinc-800/80 pt-12 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-6">
        <!-- Logo y Leyenda -->
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
            <svg viewBox="0 0 32 32" class="w-4 h-4" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7 16C5.5 13 7.5 9.5 11 9C12.5 7 15.5 6.5 18 8C20.5 7 23.5 8 24.5 10.5C26 12.5 25 15.5 23.5 16.5C22 17.5 9 17.5 7 16Z"
                fill="#10b981"
                fill-opacity="0.35"
                stroke="#10b981"
                stroke-width="1.6"
              />
              <path
                d="M16 25V14M16 19L11 15M16 17L21 13M10 25H22"
                stroke="#10b981"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </div>
          <span class="font-bold text-sm tracking-tight text-zinc-900 dark:text-white">
            Desarrollo <span class="text-emerald-500">Pampa</span>
          </span>
          <span class="text-[11px] text-zinc-400 dark:text-zinc-500 font-mono">
            · Studio de Ingeniería
          </span>
        </div>

        <!-- Enlaces de pie de página -->
        <div class="flex items-center gap-6 text-xs text-zinc-500 dark:text-zinc-400">
          <a href="#proyectos" class="hover:text-emerald-500 transition-colors">Proyectos</a>
          <a href="#modalidades" class="hover:text-emerald-500 transition-colors">Modalidades</a>
          <a href="#contacto" class="hover:text-emerald-500 transition-colors">Contacto</a>
          <a href="#" class="hover:text-emerald-500 transition-colors">Volver arriba ↑</a>
        </div>
      </div>

      <div class="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-400 dark:text-zinc-500 gap-3">
        <p>© 2026 Desarrollo Pampa. Software artesanal de alta ingeniería · {{ AGENCY_CONFIG.location }}.</p>
        <p class="font-mono">NestJS · Vue 3 · Next.js · Redis · PostgreSQL</p>
      </div>
    </footer>
  </div>
</template>
