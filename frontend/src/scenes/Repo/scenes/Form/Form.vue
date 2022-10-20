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
    <template v-for="(field, index) in valuesFormStore.form" :key="field.fullKey">
      <div
        v-if="index !== 0"
        class="border-bottom-1 surface-border -mb-2 mt-2"
        style="height: 1px"
      />
      <div v-scroll-shadow.horizontal>
        <Field
          :label="field.title"
          :path="field.fullKey"
          :description="field.description"
          v-slot="{ id }"
        >
          <Node :id="id" :field="field" />
        </Field>
      </div>
    </template>
  </FieldSet>
</template>

<style scoped></style>
