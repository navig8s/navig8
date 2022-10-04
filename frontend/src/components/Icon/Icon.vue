<script setup lang="ts">
import { PrimeIconsOptions, PrimeIcons } from 'primevue/api'

const props = withDefaults(defineProps<{ name: keyof PrimeIconsOptions; disabled?: boolean }>(), {
  disabled: false,
})
</script>

<template>
  <i :class="[PrimeIcons[props.name], { 'cursor-pointer': !disabled }]"></i>
</template>
