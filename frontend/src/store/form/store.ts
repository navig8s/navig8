import { defineStore } from 'pinia'
import { useRepoStore } from '@/store/repo'
import { computed } from 'vue'
import { formStructureFromSchema } from './model'
import { schema } from './tempSchema'

export const useValuesForm = defineStore('valuesForm', () => {
  const repoStore = useRepoStore()
  // const schemaTransaction = computed(() => usefulChartFiles.map(prop('schema')))
  // const schema = computed(() => usefulChartFiles.map(prop('schema')))
  const formStructure = computed(() =>
    repoStore.usefulChartFiles.foldData(
      () => null,
      // @ts-ignore
      ({ values }) => formStructureFromSchema(schema, values),
    ),
  )

  return { formStructure }
})
