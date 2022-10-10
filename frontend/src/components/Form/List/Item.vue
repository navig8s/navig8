<script setup lang="ts">
import Icon from '@/components/Icon'
import { defineEmits } from 'vue'

type Direction = 'up' | 'down'

const props = defineProps<{ isFirst: boolean; isLast: boolean; centerControls: boolean }>()
const emit = defineEmits<{
  (e: 'changeOrder', value: Direction): void
  (e: 'remove'): void
}>()

const changeOrder = (direction: Direction) => {
  if (props.isFirst && direction === 'up') return
  if (props.isLast && direction === 'down') return

  emit('changeOrder', direction)
}
</script>

<template>
  <div
    :class="{ 'align-items-start': !centerControls, 'align-items-center': centerControls }"
    class="flex gap-2"
  >
    <div :class="{ 'mt-1': !centerControls }" class="flex flex-column">
      <Icon
        name="ANGLE_UP"
        :disabled="isFirst"
        :class="[{ 'hover:text-700': !isFirst, 'text-500': !isFirst, 'text-300': isFirst }]"
        @click="changeOrder('up')"
      />
      <Icon
        name="ANGLE_DOWN"
        :disabled="isLast"
        :class="[{ 'hover:text-700': !isLast, 'text-500': !isLast, 'text-300': isLast }]"
        @click="changeOrder('down')"
      />
    </div>
    <slot />
    <Icon
      name="TIMES"
      class="text-red-300 hover:text-red-500"
      :class="{ 'mt-2': !centerControls }"
      @click="emit('remove')"
    />
  </div>
</template>

<style scoped module></style>
