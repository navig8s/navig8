import { defineStore } from 'pinia'
import { useRepoStore } from '@/store/repo'
import { computed, ref, watch } from 'vue'
import { Fields, formStructureFromSchema } from './model'
import { schema } from './tempSchema'
import { isEmpty, isNil } from 'ramda'

export const useValuesFormStore = defineStore('valuesForm', () => {
  const repoStore = useRepoStore()
  const formStructure = computed(() =>
    repoStore.usefulChartFiles.foldData(
      () => null,
      // @ts-ignore
      ({ values }) => formStructureFromSchema(schema, values),
    ),
  )

  const form = ref<Fields>([])

  watch(
    formStructure,
    (structure) => !isNil(structure) && isEmpty(form.value) && (form.value = structure),
    { immediate: true },
  )

  return { form }
})
