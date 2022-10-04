<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue'
import Dropdown from 'primevue/dropdown'
import { IOption, Option } from './model'
import { isEmpty } from 'ramda'
import { v4 as uuidV4 } from 'uuid'

// To fix primvue's logic for empty string value (that is considered as no value at all by default)
const EMPTY = uuidV4()

const props = defineProps<{ value: string | number; options: IOption[] }>()
const emit = defineEmits<{
  (e: 'input', value: string | number): void
}>()

const options = computed(() =>
  props.options.map((option) =>
    isEmpty(option.value) ? Option('--Empty string--', EMPTY) : option,
  ),
)
const value = computed(() => (isEmpty(props.value) ? EMPTY : props.value))
const update = (value: string | number) => emit('input', value === EMPTY ? '' : value)
</script>

<template>
  <Dropdown
    optionLabel="label"
    optionValue="value"
    :modelValue="value"
    :options="options"
    @update:modelValue="update($event)"
  />
</template>

<style scoped></style>
