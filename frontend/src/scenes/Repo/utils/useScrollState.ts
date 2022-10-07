import { ref, shallowRef, watch } from 'vue'

export const useScrollState = () => {
  const live = ref(false)
  const scrollState = shallowRef<ScrollToOptions>({ left: window.scrollX, top: window.scrollY })

  const onScroll = () => (scrollState.value = { left: window.scrollX, top: window.scrollY })

  watch(
    live,
    () => {
      if (live.value) {
        window.addEventListener('scroll', onScroll)
        window.scrollTo(scrollState.value)
      } else {
        window.removeEventListener('scroll', onScroll)
      }
    },
    { immediate: true },
  )

  return { scrollState, onScroll, live }
}
