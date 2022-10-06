<script setup lang="ts">
import Form from './scenes/Form'
import Output from './scenes/Output'
import { useRepoStore } from '@/store/repo'
import { computed, onMounted, ref } from 'vue'
import Layout from '@/components/Layout'
import Spinner from 'primevue/progressspinner'
import { prop, isNil } from 'ramda'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'

const repoStore = useRepoStore()
onMounted(repoStore.requestChartFiles)

const tab = ref(0)

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
    <div v-if="!isNil(info)" class="flex flex-column align-items-center">
      <div :class="$style.content">
        <h2 class="text-5xl mt-0 mb-2">{{ info?.name }}</h2>
        <p v-if="!isNil(info?.description)" class="mb-2 text-600">{{ info?.description }}</p>
        <p class="text-red-400">Version {{ info.version }}</p>
        <TabView v-model:activeIndex="tab" :class="$style.tabView" class="mt-4">
          <TabPanel header="Form">
            <Form :active="tab === 0" />
          </TabPanel>
          <TabPanel header="Output">
            <Output :active="tab === 1" />
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
.tabView {
  color: initial;
}
.tabView >>> :global(.p-tabview-nav-container) {
  position: sticky;
  top: 0;
  z-index: 2;
}
</style>
