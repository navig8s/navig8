<script setup lang="ts">
import Field from '@/components/Form/Field'
import FieldSet from '@/components/Form/FieldSet'
import { useValuesForm } from '@/store/form'
import Node from './components/Node'

const valuesFormStore = useValuesForm()
</script>

<template>
  <FieldSet v-if="valuesFormStore.formStructure !== null">
    <Field
      v-for="field in valuesFormStore.formStructure.fields"
      :key="field.key"
      :label="field.title"
      :path="field.key"
      :description="field.description"
      v-slot="{ id }"
    >
      <Node :id="id" :field="field" />
    </Field>
  </FieldSet>
</template>

<style scoped></style>
