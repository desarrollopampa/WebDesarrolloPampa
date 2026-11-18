<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import HeroShowcase from './components/HeroShowcase.vue'
import SectionsBelowHero from './components/SectionsBelowHero.vue'
import ProjectDetailDrawer from './components/ProjectDetailDrawer.vue'
</script>

<template>
  <div
    class="min-h-screen bg-[var(--surface-canvas)] text-[var(--ink-primary)] transition-colors duration-300 antialiased selection:bg-[var(--brand-action)] selection:text-[var(--brand-action-ink)] font-sans"
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
