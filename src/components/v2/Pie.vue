<script setup lang="ts">
import { AGENCY_CONFIG } from '@/config/agency'
import PMark from './PMark.vue'

const anio = new Date().getFullYear()
</script>

<template>
  <footer class="overflow-hidden bg-petroleo text-niebla">
    <div class="mx-auto grid max-w-[1440px] gap-10 px-4 pt-20 sm:grid-cols-3 sm:px-8 lg:px-12">
      <div>
        <p class="font-mono text-[11px] uppercase tracking-[0.16em] text-cielo">Escribinos</p>
        <a :href="AGENCY_CONFIG.buildWhatsAppUrl('Hola! Les escribo desde la web.')" target="_blank" rel="noopener" class="mt-3 block font-display text-xl hover:text-lima">WhatsApp</a>
        <a :href="`mailto:${AGENCY_CONFIG.email}`" class="mt-1 block break-all text-niebla/80 hover:text-lima">{{ AGENCY_CONFIG.email }}</a>
      </div>
      <div>
        <p class="font-mono text-[11px] uppercase tracking-[0.16em] text-cielo">Dónde estamos</p>
        <p class="mt-3 font-display text-xl">{{ AGENCY_CONFIG.location }}</p>
        <p class="mt-1 text-niebla/80">Trabajamos con negocios de todo el país.</p>
      </div>
      <div>
        <p class="font-mono text-[11px] uppercase tracking-[0.16em] text-cielo">Lotes</p>
        <ul class="mt-3 grid grid-cols-2 gap-1 text-niebla/80">
          <li><a href="#lotes" class="hover:text-lima">Tienda</a></li>
          <li><a href="#lotes" class="hover:text-lima">Turnos</a></li>
          <li><a href="#lotes" class="hover:text-lima">Lubricentros</a></li>
          <li><a href="#lotes" class="hover:text-lima">A medida</a></li>
        </ul>
      </div>
    </div>

    <div class="mx-auto mt-20 flex max-w-[1440px] items-end gap-[2vw] px-4 sm:px-8 lg:px-12" aria-hidden="true">
      <PMark :size="200" class="h-[17vw] w-[17vw] shrink-0 translate-y-[18%]" />
      <span class="translate-y-[22%] font-display text-[19vw] font-bold leading-[0.8] tracking-[-0.06em]">Pampa</span>
    </div>
    <div class="relative bg-petroleo">
      <p class="mx-auto max-w-[1440px] px-4 py-5 font-mono text-[11px] uppercase tracking-[0.14em] text-niebla/70 sm:px-8 lg:px-12">
        © {{ anio }} {{ AGENCY_CONFIG.name }} · Software por lotes · Hecho en el interior
      </p>
    </div>
  </footer>
</template>
