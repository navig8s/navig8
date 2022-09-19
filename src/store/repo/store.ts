import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useRepoStore = defineStore('repo', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)

  const increment = () => count.value++

  return { count, doubleCount, increment }
})
