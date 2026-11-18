<script setup lang="ts">
import { ref } from 'vue'
import { useUiStore } from '@/stores/uiStore'
import { AGENCY_CONFIG } from '@/config/agency'
import { vReveal } from '@/composables/useReveal'
import {
  ShieldCheck,
  MessageCircle,
  Send,
  Sparkles,
  MapPin,
  Clock,
  Mail,
  ShoppingCart,
  CalendarCheck,
  Store,
  Building2,
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
    'Quisiera coordinar una breve charla para conocer costos y tiempos.'

  const message = `Hola Desarrollo Pampa!\nMi nombre es: ${clientName}\nTipo de proyecto: ${typeText}\nDetalle: ${clientMsg}`

  const url = AGENCY_CONFIG.buildWhatsAppUrl(message)
  window.open(url, '_blank')
  isSubmitted.value = true
  setTimeout(() => {
    isSubmitted.value = false
  }, 4000)
}

const solutions = [
  {
    icon: ShoppingCart,
    title: 'Gestión Comercial y Punto de Venta (POS)',
    description:
      'Cobros ágiles en mostrador, control de stock fraccionado, cuentas corrientes, tesorería y facturación electrónica AFIP/ARCA integrada.',
  },
  {
    icon: CalendarCheck,
    title: 'Turnos y Reservas Online 24/7',
    description:
      'Agendas automáticas sin idas y vueltas por mensaje, cobro de señas con MercadoPago y recordatorios automáticos por WhatsApp.',
  },
  {
    icon: Store,
    title: 'Catálogos y Tiendas Online',
    description:
      'Ventas digitales con control de variantes, cierre de pedidos directo por WhatsApp y paneles simples para actualizar precios y productos sin depender de nadie.',
  },
  {
    icon: Building2,
    title: 'Sistemas a Medida para Empresas y Agencias',
    description:
      'Digitalización de itinerarios, reservas, órdenes de trabajo y procesos internos hechos exactamente a la medida de tu rubro.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Diagnóstico sin vueltas',
    description:
      'Relevamos tu operatoria diaria para detectar cuellos de botella y definir exactamente qué necesita tu negocio.',
  },
  {
    number: '02',
    title: 'Desarrollo y adaptación',
    description:
      'Configuramos y adaptamos el sistema con pantallas claras, rápidas y fáciles de usar para todo tu personal.',
  },
  {
    number: '03',
    title: 'Puesta en marcha',
    description:
      'Dejamos el sistema operando en tu local o en la nube, con carga inicial de datos y capacitación práctica.',
  },
  {
    number: '04',
    title: 'Soporte directo y evolución',
    description:
      'Hablás directamente con quienes crearon tu software para resolver dudas o sumar nuevas funciones cuando tu empresa crezca.',
  },
]
</script>

<template>
  <div class="space-y-28 sm:space-y-36 py-20 lg:py-28 overflow-hidden font-sans">
    <!-- ================================================================= -->
    <!-- SECCIÓN 1: #soluciones — Qué resolvemos para tu negocio           -->
    <!-- ================================================================= -->
    <section id="soluciones" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div v-reveal class="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
        <div
          class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[var(--surface-accent-soft)] text-[var(--ink-primary)] border border-[var(--border-hairline)] mb-4"
        >
          <Sparkles class="w-3.5 h-3.5 text-[var(--brand-action)]" />
          <span>SOLUCIONES A MEDIDA</span>
        </div>
        <h2 class="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--ink-primary)] leading-[1.15] mb-5">
          Software pensado para ordenar y hacer crecer
          <span class="text-[var(--pampa-acero)] dark:text-[var(--pampa-lima)]">tu operación</span>
        </h2>
        <p class="text-base sm:text-lg text-[var(--ink-secondary)] leading-relaxed font-normal">
          Partimos de plataformas probadas en producción y las adaptamos a la forma real en que trabaja tu equipo.
        </p>
      </div>

      <!-- 4 Tarjetas de Soluciones -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        <div
          v-for="(solution, sIdx) in solutions"
          :key="sIdx"
          v-reveal="{ delay: sIdx * 100 }"
          class="glass-card rounded-2xl p-7 sm:p-8 border border-[var(--border-hairline)] hover:border-[var(--brand-primary)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <div class="w-12 h-12 rounded-xl bg-[var(--surface-accent-soft)] border border-[var(--border-hairline)] flex items-center justify-center text-[var(--brand-action)] mb-5">
            <component :is="solution.icon" class="w-6 h-6" />
          </div>
          <h3 class="font-display text-xl font-bold tracking-tight text-[var(--ink-primary)] mb-3">
            {{ solution.title }}
          </h3>
          <p class="text-sm text-[var(--ink-secondary)] leading-relaxed font-normal">
            {{ solution.description }}
          </p>
        </div>
      </div>
    </section>

    <!-- ================================================================= -->
    <!-- SECCIÓN 2: #proceso — Cómo trabajamos · Tierra y oficio           -->
    <!-- ================================================================= -->
    <section id="proceso" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div v-reveal class="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
        <div
          class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[var(--surface-accent-soft)] text-[var(--ink-primary)] border border-[var(--border-hairline)] mb-4"
        >
          <span>NUESTRA FORMA DE TRABAJAR</span>
        </div>
        <h2 class="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--ink-primary)] leading-[1.15] mb-5">
          Trato directo, desarrollo sólido y
          <span class="text-[var(--pampa-acero)] dark:text-[var(--pampa-lima)]">acompañamiento real</span>
        </h2>
        <p class="text-base sm:text-lg text-[var(--ink-secondary)] leading-relaxed font-normal">
          Sin intermediarios ni soluciones enlatadas rígidas. Trabajamos codo a codo con vos desde el primer día.
        </p>
      </div>

      <!-- 4 Pasos numerados -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        <div
          v-for="(step, stIdx) in steps"
          :key="stIdx"
          v-reveal="{ delay: stIdx * 120 }"
          class="glass-card rounded-2xl p-7 border border-[var(--border-hairline)] relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          <!-- Número grande decorativo de fondo -->
          <span
            class="absolute -top-3 -right-2 text-[80px] font-mono font-black text-[var(--pampa-acero)]/10 dark:text-[var(--pampa-lima)]/10 leading-none select-none pointer-events-none"
          >
            {{ step.number }}
          </span>

          <span class="inline-block text-sm font-mono font-bold text-[var(--pampa-acero)] dark:text-[var(--pampa-lima)] mb-3 relative z-10">
            {{ step.number }}
          </span>
          <h3 class="font-display text-lg font-bold tracking-tight text-[var(--ink-primary)] mb-2 relative z-10">
            {{ step.title }}
          </h3>
          <p class="text-sm text-[var(--ink-secondary)] leading-relaxed font-normal relative z-10">
            {{ step.description }}
          </p>
        </div>
      </div>
    </section>

    <!-- ================================================================= -->
    <!-- SECCIÓN 3: #contacto & Footer                                     -->
    <!-- ================================================================= -->
    <section id="contacto" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div v-reveal class="glass-card rounded-3xl p-8 sm:p-12 lg:p-16 border border-[var(--border-hairline)] relative overflow-hidden">
        <!-- Trama gráfica orgánica oficial (motivo.svg) en contacto -->
        <img
          src="/brand/motivo.svg"
          alt=""
          aria-hidden="true"
          class="pointer-events-none select-none absolute -right-16 -bottom-16 w-96 h-96 opacity-18 dark:opacity-12 mix-blend-multiply dark:mix-blend-screen"
        />

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
          <!-- Columna Izquierda: Información de Desarrollo Pampa -->
          <div class="lg:col-span-5 space-y-6">
            <div
              class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[var(--surface-accent-soft)] text-[var(--ink-primary)] border border-[var(--border-hairline)]"
            >
              <Sparkles class="w-3.5 h-3.5 text-[var(--brand-action)]" />
              <span>INICIÁ TU PROYECTO</span>
            </div>

            <h2 class="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[var(--ink-primary)] leading-tight">
              Hablemos de tu próximo sistema
            </h2>

            <p class="text-sm sm:text-base text-[var(--ink-secondary)] leading-relaxed">
              <strong>{{ AGENCY_CONFIG.name }}</strong> es un estudio de desarrollo de software con base en {{ AGENCY_CONFIG.location }}. Trabajamos directamente con dueños de empresas, fundadores y equipos operativos para construir soluciones sólidas que eliminan tareas manuales y multiplican la rentabilidad.
            </p>

            <div class="space-y-4 pt-4 border-t border-[var(--border-hairline)] text-xs sm:text-sm">
              <div class="flex items-center gap-3 text-[var(--ink-secondary)]">
                <div class="w-8 h-8 rounded-lg bg-[var(--surface-accent-soft)] text-[var(--brand-action)] flex items-center justify-center shrink-0">
                  <Clock class="w-4 h-4" />
                </div>
                <span>Respuesta y presupuesto en menos de 24 horas hábiles.</span>
              </div>

              <div class="flex items-center gap-3 text-[var(--ink-secondary)]">
                <div class="w-8 h-8 rounded-lg bg-[var(--surface-accent-soft)] text-[var(--brand-action)] flex items-center justify-center shrink-0">
                  <MapPin class="w-4 h-4" />
                </div>
                <span>{{ AGENCY_CONFIG.location }} · Operación para todo el país y el exterior.</span>
              </div>

              <div class="flex items-center gap-3 text-[var(--ink-secondary)]">
                <div class="w-8 h-8 rounded-lg bg-[var(--surface-accent-soft)] text-[var(--brand-action)] flex items-center justify-center shrink-0">
                  <Mail class="w-4 h-4" />
                </div>
                <a :href="'mailto:' + AGENCY_CONFIG.email" class="hover:text-[var(--brand-action)] transition-colors">
                  {{ AGENCY_CONFIG.email }}
                </a>
              </div>

              <div class="flex items-center gap-3 text-[var(--ink-secondary)]">
                <div class="w-8 h-8 rounded-lg bg-[var(--surface-accent-soft)] text-[var(--brand-action)] flex items-center justify-center shrink-0">
                  <ShieldCheck class="w-4 h-4" />
                </div>
                <span>Código propietario, sin ataduras a licencias mensuales obligatorias.</span>
              </div>
            </div>
          </div>

          <!-- Columna Derecha: Formulario Rápido -->
          <div class="lg:col-span-7 bg-[var(--surface-card)] rounded-2xl p-6 sm:p-8 border border-[var(--border-hairline)] shadow-xs">
            <h3 class="font-display text-xl font-bold text-[var(--ink-primary)] mb-2">
              Envianos tu consulta directa
            </h3>
            <p class="text-xs text-[var(--ink-secondary)] mb-6">
              Completá el formulario para iniciar la conversación por WhatsApp con los datos ya ordenados:
            </p>

            <form @submit.prevent="handleFormSubmit" class="space-y-4">
              <div>
                <label class="block text-xs font-semibold text-[var(--ink-primary)] mb-1.5">
                  Tu Nombre o Empresa:
                </label>
                <input
                  v-model="form.name"
                  type="text"
                  placeholder="Ej: Martín Rodríguez / Taller Central"
                  required
                  class="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[var(--surface-canvas)] border border-[var(--border-hairline)] focus:outline-none focus:border-[var(--brand-action)] text-[var(--ink-primary)] placeholder-[var(--ink-secondary)]/50 transition-colors"
                />
              </div>

              <div>
                <label class="block text-xs font-semibold text-[var(--ink-primary)] mb-1.5">
                  Tipo de Sistema / Necesidad:
                </label>
                <select
                  v-model="form.projectType"
                  class="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[var(--surface-canvas)] border border-[var(--border-hairline)] focus:outline-none focus:border-[var(--brand-action)] text-[var(--ink-primary)] transition-colors cursor-pointer"
                >
                  <option value="erp-pos">Sistema de Gestión, POS y Facturación AFIP</option>
                  <option value="saas">Plataforma de Turnos / Reservas Online</option>
                  <option value="ecommerce">Tienda Online / Catálogo con Cierre a WhatsApp</option>
                  <option value="custom">Desarrollo a Medida para Empresa / Turismo</option>
                  <option value="otro">Otro Requerimiento</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-semibold text-[var(--ink-primary)] mb-1.5">
                  Breve descripción de lo que necesitás:
                </label>
                <textarea
                  v-model="form.message"
                  rows="3"
                  placeholder="Contanos brevemente sobre tus procesos actuales, cantidad de sucursales o la funcionalidad principal que buscás..."
                  class="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[var(--surface-canvas)] border border-[var(--border-hairline)] focus:outline-none focus:border-[var(--brand-action)] text-[var(--ink-primary)] placeholder-[var(--ink-secondary)]/50 transition-colors resize-none"
                ></textarea>
              </div>

              <div class="pt-2">
                <button
                  type="submit"
                  class="w-full py-3 px-6 rounded-full text-sm font-semibold bg-[var(--brand-action)] hover:brightness-95 text-[var(--brand-action-ink)] shadow-sm hover:shadow-[0_0_25px_rgba(213,239,97,0.38)] active:scale-98 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer font-sans"
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
    <!-- FOOTER OFICIAL CON IDENTIDAD TIERRA Y OFICIO                      -->
    <!-- ================================================================= -->
    <footer class="border-t border-[var(--border-hairline)] pt-12 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-6">
        <!-- Logo Oficial Desarrollo Pampa -->
        <a href="#" class="flex items-center gap-3">
          <img
            :src="uiStore.isDark ? '/brand/logo-invertido.svg' : '/brand/logo-principal.svg'"
            alt="Desarrollo Pampa - Software Factory"
            class="h-8 sm:h-9 w-auto object-contain transition-opacity duration-200"
          />
          <span class="text-[11px] text-[var(--ink-secondary)] font-mono">
            · Studio de Software
          </span>
        </a>

        <!-- Enlaces de pie de página -->
        <div class="flex items-center gap-6 text-xs text-[var(--ink-secondary)]">
          <a href="#inicio" class="hover:text-[var(--brand-action)] transition-colors">Proyectos</a>
          <a href="#soluciones" class="hover:text-[var(--brand-action)] transition-colors">Soluciones</a>
          <a href="#proceso" class="hover:text-[var(--brand-action)] transition-colors">Cómo trabajamos</a>
          <a href="#contacto" class="hover:text-[var(--brand-action)] transition-colors">Contacto</a>
          <a href="#" class="hover:text-[var(--brand-action)] transition-colors">Volver arriba ↑</a>
        </div>
      </div>

      <div class="mt-8 pt-6 border-t border-[var(--border-hairline)] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[var(--ink-secondary)] gap-3">
        <p>© 2026 Desarrollo Pampa. Software artesanal de alta calidad · {{ AGENCY_CONFIG.location }}.</p>
        <p class="font-mono">Tierra y oficio · Soluciones reales para negocios reales</p>
      </div>
    </footer>
  </div>
</template>
