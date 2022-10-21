<script lang="ts" setup>
import InputNumber from 'primevue/inputnumber'

const props = withDefaults(
  defineProps<{ value: number; isInteger: boolean; id?: string; defaultValue?: number }>(),
  {
    defaultValue: 0,
  },
)
const emit = defineEmits<{
  (e: 'input', value: number): void
}>()
</script>

<template>
  <InputNumber
    :maxFractionDigits="isInteger ? 0 : undefined"
    :useGrouping="false"
    :modelValue="props.value ?? props.defaultValue"
    :inputId="id"
    @update:modelValue="emit('input', $event)"
  />
</template>
