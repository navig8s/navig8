<script lang="ts" setup>
import Dialog from 'primevue/dialog'
import { computed, onBeforeMount, ref } from 'vue'
import { useData } from './data'
import { useRepoStore } from '@/store/repo'
import { isNil } from 'ramda'
import Checkbox from 'primevue/checkbox'
import { DOCUMENTATION_URL } from '@/environment'

const repoStore = useRepoStore()
const data = useData()

const visible = ref(false)

const info = computed(() => repoStore.chartMeta.getOrElse(() => null))

const open = () => (visible.value = true)

onBeforeMount(() => !data.dontShowAgain && (visible.value = true))
</script>

<template>
  <Dialog header="Introduction" :modal="true" v-model:visible="visible" style="width: 54rem">
    <p class="line-height-2" style="width: 90%">
      This interface's purpose is to simplify the installation of
      <b v-if="!isNil(info?.name)">{{ info?.name }}'s&nbsp;</b> through it's Helm chart by guiding
      you through all possible customization values offered via a simple form.
    </p>

    <h2 class="text-lg mb-2 mt-3">How to:</h2>
    <ol class="text-base mb-2 mt-1 pl-5">
      <li class="my-1">
        Change the values that you see necessary to change
        <a
          v-if="!isNil(DOCUMENTATION_URL)"
          :href="DOCUMENTATION_URL"
          target="_blank"
          rel="noopener noreferrer"
          class="text-primary no-underline hover:underline"
        >
          refer to the app documentation if needed
        </a>
      </li>
      <li class="my-1">
        Look at the <b>Result</b> tab to get the install commands prepared for you
      </li>
      <li class="my-1">
        Execute the commands in the environment you want to install the application into
      </li>
    </ol>
    <template #footer>
      <div class="flex align-items-center justify-content-center">
        <label
          class="inline-flex align-items-center justify-content-center cursor-pointer"
          @click.prevent="data.setDownShowAgain(!data.dontShowAgain)"
        >
          <Checkbox :binary="true" class="mr-2" :modelValue="data.dontShowAgain" />
          Do not show this again
        </label>
      </div>
    </template>
  </Dialog>
  <div
    :class="$style.button"
    class="fixed top-50 left-0 py-2 px-3 origin-bottom-left bg-primary text-primary text-lg cursor-pointer border-round-top"
    @click="open"
  >
    Introduction
  </div>
</template>

<style scoped module>
.button {
  transform: rotate(90deg) translateX(-50%);
}
</style>
