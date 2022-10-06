<script lang="ts" setup>
import { useOutputStore } from '@/store/output'
import Button from 'primevue/button'
import { PrimeIcons } from 'primevue/api'
import { useDataStore } from './data'
import { watch } from 'vue'

const props = defineProps<{ active: boolean }>()

const outputStore = useOutputStore()
const dataStore = useDataStore()

const copy = () => navigator.clipboard.writeText(outputStore.commands)

watch(
  () => props.active,
  (isActive) => (dataStore.live = isActive),
  { immediate: true },
)
</script>

<template>
  <div class="px-4 py-3 w-full surface-200 relative">
    <Button
      :icon="PrimeIcons.COPY"
      :class="$style.copy"
      class="p-button-secondary absolute"
      v-tooltip.top.focus="{ value: 'Copied!', class: 'z-3' }"
      @click="copy"
    />
    <div
      v-for="(line, index) in outputStore.commandLines"
      :key="index"
      :class="$style.line"
      class="my-2 line-height-3"
    >
      <span class="select-none">$</span>&nbsp;{{ line }}
    </div>
  </div>
</template>

<style scoped module>
.line {
  white-space: pre;
  font-family: monospace;
}
.copy {
  right: 1rem;
  opacity: 0.3;
}
.copy:hover {
  opacity: 1;
}
</style>
