import { defineStore } from 'pinia'
import { useValuesFormStore } from '@/store/form'
import { computed } from 'vue'
import { extractDiffFromForm, generateCommands } from '@/store/output/model'
import { useRepoStore } from '@/store/repo'

export const useOutputStore = defineStore('output', () => {
  const valuesForm = useValuesFormStore()
  const repo = useRepoStore()

  const diff = computed(() =>
    repo.usefulChartFiles.foldData(
      () => [],
      ({ values }) => extractDiffFromForm(valuesForm.form, values),
    ),
  )

  const commandLines = computed(() => generateCommands(diff.value))
  const commands = computed(() => commandLines.value.join('\r\n'))

  return { diff, commands, commandLines }
})
