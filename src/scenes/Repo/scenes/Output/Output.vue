<script lang="ts" setup>
import { useOutputStore } from '@/store/output'
import Button from 'primevue/button'
import { PrimeIcons } from 'primevue/api'
import { useDataStore } from './data'
import { computed, watch } from 'vue'
import { useRepoStore } from '@/store/repo'
import { REPO_URL } from '@/environment'

const props = defineProps<{ active: boolean }>()

const repoStore = useRepoStore()
const outputStore = useOutputStore()
const dataStore = useDataStore()

const info = computed(() => repoStore.chartMeta.getOrElse(() => null))

const copy = () => navigator.clipboard.writeText(outputStore.commands)

watch(
  () => props.active,
  (isActive) => (dataStore.live = isActive),
  { immediate: true },
)
</script>

<template>
  <p class="text-base mb-2">
    The set of commands below will attempt to deploy {{ info?.name }} from
    {{ REPO_URL }}
    with the parameters you specified in the Form panel.
  </p>
  <p class="text-base my-2">Notes:</p>
  <ul class="text-base mb-2 mt-1 pl-5">
    <li class="my-1">The commands below require helm (Version >=3.10)</li>
    <li class="my-1">
      The commands below assume a working environment able to connect to your Kubernetes cluster
    </li>
    <li class="my-1">
      The command is provided as is, it is up to the user to make sure the set of parameters
      selected are a valid configuration
    </li>
  </ul>
  <div class="mt-3 px-4 py-3 w-full surface-ground border-round relative">
    <Button
      :icon="PrimeIcons.COPY"
      :class="$style.copy"
      class="p-button-secondary absolute"
      v-tooltip.top.focus="{ value: 'Copied!', class: 'z-3' }"
      @click="copy"
    />
    <div
      v-for="(line, index) in outputStore.commandLines"
      :key="index"
      :class="$style.line"
      class="my-2 line-height-3"
    >
      <span class="select-none">$&nbsp;</span>{{ line }}
    </div>
  </div>
</template>

<style scoped module>
.line {
  white-space: pre;
  font-family: monospace;
}
.copy {
  right: 1rem;
  opacity: 0.3;
}
.copy:hover {
  opacity: 1;
}
</style>
