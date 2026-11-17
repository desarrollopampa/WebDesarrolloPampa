<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import HeroShowcase from './components/HeroShowcase.vue'
import SectionsBelowHero from './components/SectionsBelowHero.vue'
import ProjectDetailDrawer from './components/ProjectDetailDrawer.vue'
</script>

<template>
  <div
    class="min-h-screen bg-[#FAFAFA] text-slate-900 dark:bg-[#090D0B] dark:text-slate-100 transition-colors duration-300 antialiased selection:bg-emerald-500 selection:text-white"
  >
    <!-- Barra de Navegación Superior Sticky -->
    <Navbar />

    <!-- Contenido Principal -->
    <main>
      <!-- Hero Showcase con Lienzo Espacial y Micro-UIs -->
      <HeroShowcase />

      <!-- Secciones Inferiores: Proyectos, Modalidades LAN/Cloud, Contacto y Footer -->
      <SectionsBelowHero />
    </main>

    <!-- Drawer Lateral de Detalle de Proyecto (Fricción Cero) -->
    <ProjectDetailDrawer />
  </div>
</template>
