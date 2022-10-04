<script setup lang="ts">
import Checkbox from 'primevue/checkbox'
import { ref, watch } from 'vue'

const props = defineProps<{ value: boolean }>()
const emit = defineEmits<{
  (e: 'input', value: boolean): void
}>()
const checked = ref(props.value)
watch(checked, (value) => emit('input', value))
</script>

<template>
  <div class="flex">
    <label
      class="cursor-pointer inline-flex align-items-center gap-2"
      @click.prevent="checked = !checked"
    >
      <Checkbox :binary="true" :modelValue="checked" />
      <span class="text-base line-height-2 select-none">
        {{ checked ? 'true' : 'false' }}
      </span>
    </label>
  </div>
</template>
