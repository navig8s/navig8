import { defineStore } from 'pinia'
import { useValuesFormStore } from '@/store/form'
import { computed } from 'vue'
import { extractDiffFromForm, generateCommandLines } from '@/store/output/model'
import { useRepoStore } from '@/store/repo'
import { REPO_ENTRY, REPO_NAME, REPO_URL, PREDEFINED_NAMESPACE } from '@/environment'
import { isEmpty } from 'ramda'

export const useOutputStore = defineStore('output', () => {
  const valuesForm = useValuesFormStore()
  const repo = useRepoStore()

  const diff = computed(() =>
    repo.usefulChartFiles.foldData(
      () => [],
      ({ values }) => extractDiffFromForm(valuesForm.form, values),
    ),
  )

  const isDifferentFromOriginal = computed(() => !isEmpty(diff.value))

  const commandLines = computed(() =>
    generateCommandLines(diff.value, REPO_URL, REPO_NAME, REPO_ENTRY, PREDEFINED_NAMESPACE),
  )

  const commands = computed(() => commandLines.value.join('\r\n'))

  return { commands, commandLines, diff, isDifferentFromOriginal }
})
