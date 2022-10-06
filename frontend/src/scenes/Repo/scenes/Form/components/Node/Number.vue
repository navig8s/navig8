<script setup lang="ts">
import NumberUI from '@/components/Form/Number'
import { Number as INumberField } from '@/store/form/model'

const props = defineProps<{ field: INumberField }>()
</script>

<template>
  <NumberUI
    :value="props.field.value"
    :isInteger="props.field.subSet === 'integer'"
    @input="props.field.value = $event"
  />
</template>

<style scoped></style>
