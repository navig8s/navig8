<script setup lang="ts">
import Field from '@/components/Form/Field'
import FieldSet from '@/components/Form/FieldSet'
import { useValuesFormStore } from '@/store/form'
import Node from './components/Node'
import { useDataStore } from './data'
import { watch } from 'vue'

const props = defineProps<{ active: boolean }>()

const valuesFormStore = useValuesFormStore()
const data = useDataStore()

watch(
  () => props.active,
  (isActive) => (data.live = isActive),
  { immediate: true },
)
</script>
<template>
  <FieldSet v-if="valuesFormStore.form !== null">
    <Field
      v-for="field in valuesFormStore.form"
      :key="field.fullKey"
      :label="field.title"
      :path="field.fullKey"
      :description="field.description"
      v-slot="{ id }"
    >
      <Node :id="id" :field="field" />
    </Field>
  </FieldSet>
</template>

<style scoped></style>
