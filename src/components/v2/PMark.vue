<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: number
    tallo?: string
    bowl?: string
    pie?: string
    label?: string
  }>(),
  {
    size: 40,
    tallo: '#F4F6F0',
    bowl: '#D6F46A',
    pie: '#A9C8F5',
    label: '',
  },
)
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 40 40"
    :role="label ? 'img' : undefined"
    :aria-label="label || undefined"
    :aria-hidden="label ? undefined : 'true'"
  >
    <rect x="0" y="0" width="12" height="25" rx="3" :fill="tallo" class="transition-[fill] duration-500" />
    <rect x="0" y="28" width="12" height="12" rx="3" :fill="pie" class="transition-[fill] duration-500" />
    <path
      d="M18 0H27.5A12.5 12.5 0 0 1 27.5 25H18A3 3 0 0 1 15 22V3A3 3 0 0 1 18 0Z"
      :fill="bowl"
      class="transition-[fill] duration-500"
    />
  </svg>
</template>
