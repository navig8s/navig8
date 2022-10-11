<script setup lang="ts">
import Form from './scenes/Form'
import Output from './scenes/Output'
import Readme from './scenes/Readme'
import { useRepoStore } from '@/store/repo'
import { computed, onMounted, ref } from 'vue'
import Layout from '@/components/Layout'
import Spinner from 'primevue/progressspinner'
import { isNil, propIs } from 'ramda'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import { useValuesFormStore } from '@/store/form'
import ErrorBoundary from './components/ErrorBoundary'

const repoStore = useRepoStore()
const formStore = useValuesFormStore()
onMounted(repoStore.requestChartFiles)

const tab = ref(0)

const info = computed(() => repoStore.chartMeta.getOrElse(() => null))
const hasReadme = computed(() =>
  repoStore.usefulChartFiles.foldData(() => false, propIs(String, 'readme')),
)
const showError = computed(
  () => repoStore.usefulChartFiles.isRejected() || formStore.formStructure instanceof Error,
)
</script>

<template>
  <ErrorBoundary v-if="showError" />
  <div
    v-if="repoStore.usefulChartFiles.isPendingFirst()"
    class="h-screen flex flex-grow-1 justify-center align-items-center"
  >
    <Spinner />
  </div>
  <Layout
    v-if="repoStore.usefulChartFiles.hasData() && !isNil(info)"
    :logo="repoStore?.entryManifest?.icon"
  >
    <div class="flex flex-column align-items-center">
      <div :class="$style.content">
        <h2 class="text-5xl mt-0 mb-2">{{ info.name }}</h2>
        <p v-if="!isNil(info?.description)" class="mb-2 text-600">{{ info?.description }}</p>
        <p class="text-red-400">Version {{ info.version }}</p>
        <TabView v-model:activeIndex="tab" :class="$style.tabView" class="mt-4">
          <TabPanel header="Form">
            <div :class="$style.tabPanelInner">
              <!-- TODO: This approach causes performance issues-->
              <Form :active="tab === 0" v-scroll-shadow.horizontal />
            </div>
          </TabPanel>
          <TabPanel header="Output">
            <div :class="$style.tabPanelInner">
              <Output :active="tab === 1" />
            </div>
          </TabPanel>
          <TabPanel v-if="hasReadme" header="README.md">
            <div :class="$style.tabPanelInner">
              <Readme :active="tab === 2" />
            </div>
          </TabPanel>
        </TabView>
      </div>
    </div>
  </Layout>
</template>

<style scoped module>
.content {
  width: 1150px;
}
.tabView {
  color: initial;
}
.tabView :deep(:global(.p-tabview-nav-container)) {
  position: sticky;
  top: 0;
  z-index: 2;
  background: var(--surface-card);
}
.tabView :deep(:global(.p-tabview-panels)) {
  padding: 0;
}
.tabPanelInner {
  padding: 1.25rem;
}
</style>
