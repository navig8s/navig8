<script setup lang="ts">
import Icon from '@/components/Icon'
import { defineEmits } from 'vue'

const emit = defineEmits<{
  (e: 'remove'): void
}>()
</script>

<template>
  <div class="flex gap-2 align-items-center">
    <slot />
    <Icon name="TIMES" class="text-red-300 hover:text-red-500" @click="emit('remove')" />
  </div>
</template>

<style scoped module></style>
