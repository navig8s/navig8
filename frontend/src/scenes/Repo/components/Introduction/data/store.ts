import { defineStore } from 'pinia'

export const useData = defineStore('Introduction', {
  state: () => ({
    dontShowAgain: false,
  }),
  actions: {
    setDownShowAgain(newValue: boolean) {
      this.dontShowAgain = newValue
    },
  },
  persist: true,
})
