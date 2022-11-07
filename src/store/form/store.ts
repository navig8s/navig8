import { defineStore } from 'pinia'
import { useRepoStore } from '@/store/repo'
import { computed, ref, watch } from 'vue'
import { Fields, formStructureFromSchema } from './model'
import { isEmpty, isNil, tryCatch } from 'ramda'

export const useValuesFormStore = defineStore('valuesForm', () => {
  const repoStore = useRepoStore()
  const formStructure = computed(() =>
    repoStore.usefulChartFiles.foldData(
      () => null,
      // @ts-ignore
      ({ values, schema }) =>
        tryCatch(
          () => formStructureFromSchema(schema, values),
          (error) => error as Error,
        )(),
    ),
  )

  const form = ref<Fields>([])

  watch(
    () => formStructure.value,
    (structure) =>
      !isNil(structure) &&
      !(structure instanceof Error) &&
      isEmpty(form.value) &&
      (form.value = structure),
    { immediate: true },
  )

  return { form, formStructure }
})
