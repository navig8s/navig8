<script lang="ts" setup>
import { marked } from 'marked'
import { useRepoStore } from '@/store/repo'
import { computed, nextTick, onBeforeUnmount, ref, shallowRef, watch } from 'vue'
import { isNil } from 'ramda'
import { useDataStore } from './data'
import { attachShadow } from '@/directives/scrollShadow'

const props = defineProps<{ active: boolean }>()

const repoStore = useRepoStore()
const dataStore = useDataStore()

const wrapper = ref<HTMLDivElement>()
const unAttach = shallowRef<Array<() => void>>([])
const html = computed(() =>
  repoStore.usefulChartFiles.foldData(
    () => '',
    ({ readme }) => (isNil(readme) ? '' : marked(readme)),
  ),
)

watch(
  () => props.active,
  (isActive) => (dataStore.live = isActive),
  { immediate: true },
)

watch(
  html,
  () =>
    nextTick(() => {
      if (!isNil(wrapper.value)) {
        unAttach.value.forEach((effect) => effect())
        unAttach.value = [
          ...Array.from(wrapper.value.getElementsByTagName('table')),
          ...(Array.from(wrapper.value?.querySelectorAll('pre code')) as HTMLElement[]),
        ].map((table) => attachShadow(table, true).unAttach)
      }
    }),
  { immediate: true },
)

onBeforeUnmount(() => unAttach.value.forEach((effect) => effect()))
</script>

<template>
  <div ref="wrapper" class="markdownContainer" v-html="html"></div>
</template>

<style lang="scss">
.markdownContainer {
  color: var(--text-color);
  padding-top: 1rem;

  & > :first-child {
    margin-top: 0 !important;
  }

  h1,
  h2 {
    border-bottom: 1px solid var(--surface-d);
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    & + * {
      margin-top: 0 !important;
    }
  }

  h1 {
    font-size: 2rem;
    margin-top: 1.75rem;
    margin-bottom: 1.25rem;
    padding-bottom: 0.75rem;
  }
  h2 {
    font-size: 1.5rem;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
  }
  h3 {
    font-size: 1.125rem;
    margin-top: 0.9rem;
    margin-bottom: 0.7rem;
  }
  h4 {
    font-size: 1rem;
    margin-top: 0.75rem;
    margin-bottom: 0.5rem;
  }
  h5 {
    font-size: 0.875rem;
    margin-top: 0.5rem;
    margin-bottom: 0.35rem;
  }
  h6 {
    font-size: 0.75rem;
    margin-top: 0.5rem;
    margin-bottom: 0.35rem;
  }
  p {
    font-size: 1rem;
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
    line-height: 1.75rem;
  }
  code {
    background-color: var(--surface-ground);
    padding: 0.2rem 0.4rem;
    border-radius: var(--border-radius);
  }
  pre code {
    padding: 1rem 1.5rem;
    background-color: var(--surface-ground);
    width: 100%;
    display: block;
    overflow-x: auto;
  }
  blockquote {
    border-left: 3px solid var(--surface-border);
    margin: 1rem 1rem 1rem 0;
    padding-left: 1rem;
  }
  a {
    color: var(--primary-color);
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  ul,
  ol {
    padding-left: 2rem;
  }
  ul,
  ol,
  li {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
  table {
    overflow: auto;
    line-height: 1.75rem;
    border-collapse: collapse;
    width: max-content;
    max-width: 100%;
    display: block;
    margin: 1.5rem 0;
    thead {
      tr th {
        padding: 0.5rem 0.75rem;
        font-size: 1.1rem;
        border-bottom: 1px solid var(--surface-border);
      }
    }
    tbody {
      tr {
        td {
          padding: 0.5rem 0.75rem;
          text-align: center;
          vertical-align: top;
        }
      }
    }

    thead tr th,
    tbody tr td {
      border: 1px solid var(--surface-border);
    }
  }
  hr {
    background-color: var(--surface-border);
    border: none;
    height: 4px;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  img {
    max-width: 100%;
  }
}
</style>
