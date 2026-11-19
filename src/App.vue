<script setup lang="ts">
import TopBar from './components/v2/TopBar.vue'
import CampoHero from './components/v2/CampoHero.vue'
import MapaLotes from './components/v2/MapaLotes.vue'
import Familia from './components/v2/Familia.vue'
import ComoTrabajamos from './components/v2/ComoTrabajamos.vue'
import Presupuesto from './components/v2/Presupuesto.vue'
import Pie from './components/v2/Pie.vue'
</script>

<template>
  <a href="#lotes" class="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded-lg focus:bg-lima focus:px-4 focus:py-2 focus:text-petroleo">Saltar al contenido</a>
  <TopBar />
  <main>
    <CampoHero />
    <MapaLotes />
    <Familia />
    <ComoTrabajamos />
    <Presupuesto />
  </main>
  <Pie />
</template>
