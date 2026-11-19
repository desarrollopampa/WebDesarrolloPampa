<script setup lang="ts">
import { computed, ref } from 'vue'
import { LOTES } from '@/data/lotes'
import { AGENCY_CONFIG } from '@/config/agency'
import { useSeleccion, type Modalidad } from '@/composables/useSeleccion'
import { vReveal } from '@/composables/useReveal'
import PMark from './PMark.vue'

const { loteElegido, modalidad } = useSeleccion()

const nombre = ref('')
const negocio = ref('')
const localidad = ref('')
const detalle = ref('')

const MODOS: { id: Modalidad; label: string; parte: string }[] = [
  { id: 'listo', label: 'Listo', parte: 'tallo' },
  { id: 'adaptado', label: 'Adaptado', parte: 'bowl' },
  { id: 'medida', label: 'A medida', parte: 'pie' },
]

const lote = computed(() => LOTES.find((l) => l.id === loteElegido.value) ?? null)
const modo = computed(() => MODOS.find((m) => m.id === modalidad.value) ?? null)
const colorLote = computed(() => (lote.value && lote.value.id !== 'medida' ? lote.value.color : '#D6F46A'))
const apagado = '#2C3A3C'

const listo = computed(() => !!lote.value && !!modo.value && negocio.value.trim().length > 1)

const mensaje = computed(() => {
  const partes = [
    `Hola! Soy ${nombre.value.trim() || '[nombre]'}${negocio.value.trim() ? `, de ${negocio.value.trim()}` : ''}${localidad.value.trim() ? ` (${localidad.value.trim()})` : ''}.`,
    lote.value ? `Me interesa: ${lote.value.nombre}${lote.value.id !== 'medida' ? ` (${lote.value.producto})` : ''}.` : '',
    modo.value ? `Lo quiero: ${modo.value.label}.` : '',
    detalle.value.trim() ? `Les cuento: ${detalle.value.trim()}` : '',
  ]
  return partes.filter(Boolean).join('\n')
})

const waUrl = computed(() => AGENCY_CONFIG.buildWhatsAppUrl(mensaje.value))
const mailUrl = computed(
  () => `mailto:${AGENCY_CONFIG.email}?subject=${encodeURIComponent('Presupuesto · ' + (negocio.value || 'mi negocio'))}&body=${encodeURIComponent(mensaje.value)}`,
)
</script>

<template>
  <section id="presupuesto" class="bg-grafito py-24 text-niebla sm:py-32">
    <div class="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
      <p v-reveal class="font-mono text-xs uppercase tracking-[0.18em] text-lima">04 · Pedí tu lote</p>
      <h2 v-reveal="80" class="mt-4 max-w-[980px] font-display text-[clamp(2.2rem,5.4vw,4.8rem)] font-bold leading-[0.95] tracking-[-0.03em]">
        Contanos tu negocio. Te respondemos nosotros, no un formulario.
      </h2>

      <div class="mt-14 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <form class="grid gap-8" @submit.prevent>
          <fieldset>
            <legend class="font-display text-lg font-semibold">1 · ¿Qué necesitás?</legend>
            <div class="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              <label
                v-for="l in LOTES"
                :key="l.id"
                class="relative flex min-h-[92px] cursor-pointer flex-col justify-between rounded-2xl p-4 ring-1 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-lima"
                :class="loteElegido === l.id ? 'bg-niebla text-petroleo ring-niebla' : 'ring-niebla/20 hover:ring-niebla/50'"
              >
                <input v-model="loteElegido" type="radio" name="lote" :value="l.id" class="sr-only" />
                <span class="h-3 w-3 rounded-[3px]" :style="{ background: l.color }" aria-hidden="true"></span>
                <span>
                  <span class="block font-mono text-[10px] uppercase tracking-wider opacity-70">Lote {{ l.numero }}</span>
                  <span class="font-display font-semibold">{{ l.nombre }}</span>
                </span>
              </label>
            </div>
          </fieldset>

          <fieldset>
            <legend class="font-display text-lg font-semibold">2 · ¿Cómo lo querés?</legend>
            <div class="mt-3 grid grid-cols-3 gap-2">
              <label
                v-for="m in MODOS"
                :key="m.id"
                class="flex min-h-14 cursor-pointer items-center justify-center rounded-xl px-3 text-center font-display font-semibold ring-1 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-lima"
                :class="modalidad === m.id ? 'bg-lima text-petroleo ring-lima' : 'ring-niebla/20 hover:ring-niebla/50'"
              >
                <input v-model="modalidad" type="radio" name="modo" :value="m.id" class="sr-only" />
                {{ m.label }}
              </label>
            </div>
          </fieldset>

          <fieldset class="grid gap-3 sm:grid-cols-2">
            <legend class="mb-3 font-display text-lg font-semibold">3 · Tu negocio</legend>
            <label class="grid gap-1.5">
              <span class="text-sm text-niebla/80">Tu nombre</span>
              <input v-model="nombre" autocomplete="name" class="min-h-12 rounded-xl bg-white/5 px-4 text-niebla ring-1 ring-niebla/20 outline-none placeholder:text-niebla/50 focus:ring-lima" placeholder="Ej.: Laura" />
            </label>
            <label class="grid gap-1.5">
              <span class="text-sm text-niebla/80">Negocio o rubro</span>
              <input v-model="negocio" autocomplete="organization" class="min-h-12 rounded-xl bg-white/5 px-4 text-niebla ring-1 ring-niebla/20 outline-none placeholder:text-niebla/50 focus:ring-lima" placeholder="Ej.: Lubricentro El Cruce" />
            </label>
            <label class="grid gap-1.5 sm:col-span-2">
              <span class="text-sm text-niebla/80">Localidad</span>
              <input v-model="localidad" autocomplete="address-level2" class="min-h-12 rounded-xl bg-white/5 px-4 text-niebla ring-1 ring-niebla/20 outline-none placeholder:text-niebla/50 focus:ring-lima" placeholder="Ej.: Río Segundo, Córdoba" />
            </label>
            <label class="grid gap-1.5 sm:col-span-2">
              <span class="text-sm text-niebla/80">Contanos qué te pasa hoy (opcional)</span>
              <textarea v-model="detalle" rows="3" class="rounded-xl bg-white/5 px-4 py-3 text-niebla ring-1 ring-niebla/20 outline-none placeholder:text-niebla/50 focus:ring-lima" placeholder="Ej.: anotamos los turnos en un cuaderno y la gente se olvida de venir"></textarea>
            </label>
          </fieldset>
        </form>

        <aside class="lg:sticky lg:top-24 lg:self-start" aria-label="Tu lote">
          <div class="overflow-hidden rounded-[22px] bg-petroleo ring-1 ring-niebla/10">
            <div class="surco flex items-center justify-center py-10 text-petroleo-2" :style="{ color: '#174649' }">
              <PMark
                :size="168"
                :tallo="modalidad === 'listo' ? '#F4F6F0' : apagado"
                :bowl="modalidad === 'adaptado' ? colorLote : apagado"
                :pie="modalidad === 'medida' ? '#A9C8F5' : apagado"
              />
            </div>
            <div class="border-t border-dashed border-niebla/20 p-6">
              <p class="font-mono text-[11px] uppercase tracking-[0.16em] text-lima">Lote 05 · el tuyo</p>
              <p class="mt-2 font-display text-2xl font-bold">{{ negocio.trim() || 'Tu negocio' }}</p>
              <dl class="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 font-mono text-[12px]">
                <dt class="text-niebla/60">Base</dt>
                <dd>{{ lote ? lote.nombre : '—' }}</dd>
                <dt class="text-niebla/60">Forma</dt>
                <dd>{{ modo ? `${modo.label} · ${modo.parte}` : '—' }}</dd>
                <dt class="text-niebla/60">Dónde</dt>
                <dd>{{ localidad.trim() || '—' }}</dd>
              </dl>

              <div class="mt-6 grid gap-2">
                <a
                  :href="listo ? waUrl : undefined"
                  :aria-disabled="!listo"
                  target="_blank"
                  rel="noopener"
                  class="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl font-display font-semibold transition"
                  :class="listo ? 'bg-lima text-petroleo hover:-translate-y-0.5' : 'cursor-not-allowed bg-niebla/10 text-niebla/60'"
                >
                  Mandar por WhatsApp
                </a>
                <a :href="mailUrl" class="inline-flex min-h-11 items-center justify-center rounded-xl text-sm text-niebla/80 underline-offset-4 hover:underline">
                  Prefiero por mail
                </a>
              </div>
              <p v-if="!listo" class="mt-2 text-center text-xs text-niebla/60">Elegí un lote, una forma y escribí tu negocio.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>
