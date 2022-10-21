<script lang="ts" setup>
import Textarea from 'primevue/textarea'

const props = withDefaults(defineProps<{ value: string; defaultValue?: string }>(), {
  defaultValue: '',
})
const emit = defineEmits<{
  (e: 'input', value: string): void
}>()
</script>

<template>
  <Textarea
    rows="1"
    cols="58"
    class="w-full"
    :value="props.value ?? defaultValue"
    :autoResize="true"
    @update:modelValue="emit('input', $event)"
  />
</template>
