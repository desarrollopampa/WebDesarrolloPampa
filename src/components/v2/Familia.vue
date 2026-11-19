<script setup lang="ts">
import { ref } from 'vue'
import PMark from './PMark.vue'
import Cinta from './Cinta.vue'
import { vReveal } from '@/composables/useReveal'

const valores = [
  { t: 'Atiende quien programa', d: 'Hablás con la persona que escribe el código. No hay call center ni tickets que se pierden.' },
  { t: 'Hablamos claro', d: 'Te explicamos qué hace el sistema con palabras de tu negocio, no con siglas.' },
  { t: 'Nos quedamos', d: 'Después de entregar seguimos ahí: ajustes, dudas y lo que vaya pidiendo tu negocio.' },
]

const mesa = [
  { nombre: '[Nombre]', rol: '[Qué hace en la familia]', tallo: '#F4F6F0', bowl: '#D6F46A', pie: '#A9C8F5' },
  { nombre: '[Nombre]', rol: '[Qué hace en la familia]', tallo: '#F4F6F0', bowl: '#A9C8F5', pie: '#F4A27C' },
  { nombre: '[Nombre]', rol: '[Qué hace en la familia]', tallo: '#F4F6F0', bowl: '#F4A27C', pie: '#D6F46A' },
]
const encendido = ref<number | null>(null)
</script>

<template>
  <section id="familia" class="relative overflow-hidden bg-petroleo pb-28 pt-10 text-niebla sm:pb-36">
    <div class="pointer-events-none flex flex-col gap-0 pt-6">
      <Cinta :frases="['Hecho en el interior', 'Atiende quien programa', 'Software por lotes', 'Córdoba, Argentina']" />
      <Cinta
        :frases="['Una base común', 'Cada negocio con lo suyo', 'Listo · Adaptado · A medida']"
        fondo="#A9C8F5"
        :giro="2"
        reversa
        class="-mt-3"
      />
    </div>

    <div class="mx-auto mt-24 max-w-[1440px] px-4 sm:px-8 lg:px-12">
      <p v-reveal class="font-mono text-xs uppercase tracking-[0.18em] text-cielo">02 · La familia</p>
      <h2 v-reveal="80" class="mt-5 max-w-[1100px] font-display text-[clamp(2.4rem,6.2vw,5.6rem)] font-bold leading-[0.95] tracking-[-0.035em]">
        No somos una agencia.
        <span class="inline-flex translate-y-[0.08em] align-baseline"><PMark :size="64" class="h-[0.8em] w-[0.8em]" /></span>
        Somos una <span class="text-lima">familia chica</span> del interior.
      </h2>

      <div class="mt-14 grid gap-12 lg:grid-cols-[1.1fr_1fr]">
        <p v-reveal class="max-w-[620px] text-xl leading-relaxed text-niebla/85">
          Trabajamos desde Córdoba, en la misma mesa donde se toma el mate. Sabemos cómo se labura en un mostrador, en un taller o en un consultorio de pueblo, porque son los negocios de nuestros vecinos. Por eso hacemos software que se entiende y que no te deja a pie.
        </p>

        <ol class="grid gap-3">
          <li
            v-for="(v, i) in valores"
            :key="v.t"
            v-reveal="i * 90"
            class="grid grid-cols-[auto_1fr] gap-x-5 border-t border-niebla/15 pt-4"
          >
            <span class="font-mono text-sm text-lima">0{{ i + 1 }}</span>
            <div>
              <h3 class="font-display text-xl font-semibold">{{ v.t }}</h3>
              <p class="mt-1 text-niebla/75">{{ v.d }}</p>
            </div>
          </li>
        </ol>
      </div>

      <div class="mt-24">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <h3 v-reveal class="font-display text-3xl font-bold tracking-tight sm:text-4xl">La mesa</h3>
          <p class="font-mono text-[11px] uppercase tracking-[0.14em] text-niebla/70">Pasá por cada silla</p>
        </div>
        <ul class="mt-6 grid gap-3 sm:grid-cols-3">
          <li
            v-for="(m, i) in mesa"
            :key="i"
            v-reveal="i * 100"
            tabindex="0"
            class="group relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-[22px] bg-petroleo-2 p-6 ring-1 ring-niebla/10 transition-colors hover:bg-petroleo-3 focus:bg-petroleo-3"
            @mouseenter="encendido = i"
            @mouseleave="encendido = null"
            @focus="encendido = i"
            @blur="encendido = null"
          >
            <PMark
              :size="120"
              class="transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105"
              :tallo="encendido === i ? m.tallo : '#1E5A5E'"
              :bowl="encendido === i ? m.bowl : '#245F63'"
              :pie="encendido === i ? m.pie : '#1E5A5E'"
            />
            <div>
              <p class="font-display text-2xl font-semibold">{{ m.nombre }}</p>
              <p class="mt-1 text-niebla/70">{{ m.rol }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
