<script lang="ts" setup>
import { marked } from 'marked'
import { useRepoStore } from '@/store/repo'
import { computed } from 'vue'
import { isNil } from 'ramda'

const repoStore = useRepoStore()
const html = computed(() =>
  repoStore.usefulChartFiles.foldData(
    () => '',
    ({ readme }) => (isNil(readme) ? '' : marked(readme)),
  ),
)
</script>

<template>
  <div class="markdownContainer" v-html="html"></div>
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
    thead {
      tr th {
        padding: 0.5rem 0.75rem;
        font-size: 1.1rem;
        border-bottom: 1px solid var(--surface-border);
        background-color: white;
      }
    }
    tbody {
      tr {
        td {
          padding: 0.5rem 0.75rem;
          text-align: center;
        }
      }
    }

    thead tr td,
    tbody tr:not(:last-child) td {
      border-bottom: 1px solid var(--surface-border);
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
