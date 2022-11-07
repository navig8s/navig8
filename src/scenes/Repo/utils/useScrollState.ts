import { nextTick, ref, shallowRef, watch } from 'vue'

export const useScrollState = () => {
  const live = ref(false)
  const scrollState = shallowRef<ScrollToOptions>({ left: window.scrollX, top: window.scrollY })

  const onScroll = () => (scrollState.value = { left: window.scrollX, top: window.scrollY })

  watch(
    live,
    async () => {
      if (live.value) {
        window.addEventListener('scroll', onScroll)
        await nextTick()
        window.scrollTo(scrollState.value)
      } else {
        window.removeEventListener('scroll', onScroll)
      }
    },
    { immediate: true },
  )

  return { scrollState, onScroll, live }
}
