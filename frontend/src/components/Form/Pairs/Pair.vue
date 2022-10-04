<script setup lang="ts">
import Icon from '@/components/Icon'
import { defineEmits } from 'vue'

const emit = defineEmits<{
  (e: 'remove'): void
}>()
</script>

<template>
  <div :class="$style.wrapper" class="flex gap-2 -mr-4 align-items-center">
    <slot />
    <Icon
      name="TIMES"
      :class="$style.iconControls"
      class="text-red-300 hover:text-red-500"
      @click="emit('remove')"
    />
  </div>
</template>

<style scoped module>
.iconControls {
  visibility: hidden;
}
.wrapper:hover .iconControls {
  visibility: visible;
}
</style>
