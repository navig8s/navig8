<script lang="ts" setup="">
import { REPO, useRepoStore } from '@/store/repo'
import { useValuesFormStore } from '@/store/form'
import { computed, ComputedRef } from 'vue'
import {
  ChartManifestStructureInvalidError,
  EntryManifestStructureInvalidError,
  FileNotFoundError,
  RepoManifestStructureInvalidError,
} from '@/store/repo/error'
import { DecodeError } from '@/decoder'
import { FormConstructionError } from '@/store/form/error'
import { CORSOrDroppedConnectionError } from '@/httpRequest/RequestError'

const repoStore = useRepoStore()
const formStore = useValuesFormStore()

const error: ComputedRef<{ title: string; description: string }> = computed(() => {
  const errorInstance = repoStore.usefulChartFiles.getErrorOrElse(() =>
    formStore.formStructure instanceof Error ? formStore.formStructure : new Error(),
  )

  if (errorInstance instanceof CORSOrDroppedConnectionError) {
    return { title: errorInstance.message, description: 'Open browser console to see more details' }
  }

  if (errorInstance instanceof FileNotFoundError) {
    return { title: 'File not found in the chart', description: errorInstance.message }
  }
  if (errorInstance instanceof DecodeError) {
    const title = 'Decoding failed'
    const descriptionGetter = (instanceName: string) =>
      instanceName +
      ' is not corresponding required structure:\n<pre class="text-red-400 my-3">' +
      errorInstance.message +
      '</pre>'

    if (
      errorInstance instanceof RepoManifestStructureInvalidError ||
      errorInstance instanceof EntryManifestStructureInvalidError
    ) {
      return {
        title,
        description: descriptionGetter(
          `Helm repository manifest '${REPO.replace(/\/$/, '')}/index.yaml'`,
        ),
      }
    }
    if (errorInstance instanceof ChartManifestStructureInvalidError) {
      return { title, description: descriptionGetter('Helm chart manifest (Chart.yaml)') }
    }

    return { title, description: descriptionGetter('Undefined entity') }
  }

  if (errorInstance instanceof FormConstructionError) {
    return {
      title: 'Form construction error',
      description: 'The form failed to construct from the specified chart repository and its entry',
    }
  }

  return {
    title: 'Undefined error',
    description: 'Undefined error was detected. Try reloading the page',
  }
})
</script>

<template>
  <div class="h-screen flex flex-column flex-grow-1 justify-content-center align-items-center">
    <h2 class="text-4xl line-height-4">{{ error.title }}</h2>
    <p v-html="error.description" class="text-xl text-center" />
  </div>
</template>

<style scoped module></style>
