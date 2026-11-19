<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    frases: string[]
    fondo?: string
    texto?: string
    giro?: number
    reversa?: boolean
  }>(),
  { fondo: '#D6F46A', texto: '#103B3F', giro: -3, reversa: false },
)
const serie = [...props.frases, ...props.frases]
</script>

<template>
  <div
    class="relative -mx-[5vw] overflow-hidden py-3.5"
    :style="{ background: fondo, color: texto, transform: `rotate(${giro}deg)` }"
    aria-hidden="true"
  >
    <div class="cinta-track flex w-max gap-10 whitespace-nowrap" :style="{ animationDirection: reversa ? 'reverse' : 'normal' }">
      <span v-for="(f, i) in serie" :key="i" class="flex items-center gap-10 font-mono text-sm font-medium uppercase tracking-[0.2em]">
        {{ f }}
        <svg width="16" height="16" viewBox="0 0 40 40"><rect width="12" height="25" rx="3" fill="currentColor" /><rect y="28" width="12" height="12" rx="3" fill="currentColor" /><path d="M18 0H27.5A12.5 12.5 0 0 1 27.5 25H18A3 3 0 0 1 15 22V3A3 3 0 0 1 18 0Z" fill="currentColor" /></svg>
      </span>
    </div>
  </div>
</template>
