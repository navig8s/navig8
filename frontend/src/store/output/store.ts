import { defineStore } from 'pinia'
import { useValuesFormStore } from '@/store/form'
import { computed } from 'vue'
import { generateCommandLines } from '@/store/output/model'
import { useRepoStore } from '@/store/repo'
import { REPO_ENTRY, REPO_NAME, REPO_URL, PREDEFINED_NAMESPACE } from '@/environment'

export const useOutputStore = defineStore('output', () => {
  const valuesForm = useValuesFormStore()
  const repo = useRepoStore()

  const commandLines = computed(() =>
    repo.usefulChartFiles.foldData(
      () => [],
      ({ values }) =>
        generateCommandLines(
          valuesForm.form,
          values,
          REPO_URL,
          REPO_NAME,
          REPO_ENTRY,
          PREDEFINED_NAMESPACE,
        ),
    ),
  )

  const commands = computed(() => commandLines.value.join('\r\n'))

  return { commands, commandLines }
})
