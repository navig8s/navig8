<script setup lang="ts">
import Form from './scenes/Form'
import { useRepoStore } from '@/store/repo'
import { computed, onMounted } from 'vue'
import Layout from '@/components/Layout'
import Spinner from 'primevue/progressspinner'
import { prop, isNil } from 'ramda'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'

const repoStore = useRepoStore()
onMounted(repoStore.requestChartFiles)

const info = computed(() => repoStore.usefulChartFiles.foldData(() => null, prop('chart')))
</script>

<template>
  <Layout>
    <div
      v-if="repoStore.usefulChartFiles.isPendingFirst()"
      class="flex flex-grow-1 justify-center align-items-center"
    >
      <Spinner />
    </div>
    <div
      v-if="repoStore.usefulChartFiles.isFulfilled()"
      class="flex flex-column align-items-center"
    >
      <div :class="$style.content">
        <h2 class="text-5xl mt-0 mb-2">{{ info?.name }}</h2>
        <p v-if="!isNil(info?.description)" class="mb-2 text-600">{{ info?.description }}</p>
        <p class="text-red-400">Version {{ info?.version }}</p>
        <TabView class="mt-4">
          <TabPanel header="Form">
            <Form />
          </TabPanel>
        </TabView>
      </div>
    </div>
  </Layout>
</template>

<style scoped module>
.content {
  min-width: 900px;
}
</style>
