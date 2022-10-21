<script lang="ts" setup>
import { computed, ref } from 'vue'
import { isNil } from 'ramda'
import { NAVIG8_COPYRIGHT } from '@/environment'

const props = defineProps<{ logo?: string }>()
const logoRef = ref<HTMLDivElement>()

const programmaticLogo = computed(() => {
  if (
    !isNil(logoRef.value) &&
    !isNil(props.logo) &&
    window.getComputedStyle(logoRef.value).getPropertyValue('background-image') === 'none'
  ) {
    return `url(${props.logo})`
  }

  return undefined
})
const copyright = computed(() =>
  (NAVIG8_COPYRIGHT ?? '').replaceAll('{year}', new Date().getFullYear().toString()),
)
</script>

<template>
  <div :class="$style.layout" class="flex flex-column">
    <header class="py-2 px-4 border-bottom-2 surface-border">
      <div :class="$style.inner" class="flex justify-content-center">
        <div
          ref="logoRef"
          class="logo h-4rem w-7rem bg-no-repeat bg-contain"
          :style="{ backgroundImage: programmaticLogo }"
        />
      </div>
    </header>
    <main class="flex flex-column py-5 flex-grow-1">
      <slot />
    </main>
    <footer class="p-5 border-top-2 surface-border">
      <div :class="$style.inner" class="flex justify-content-between">
        <div class="text-base">{{ copyright }}</div>
        <div class="text-base">
          <a
            href="https://github.com/navig8s/navig8"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary no-underline hover:underline"
          >
            Built with Navig8
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped module>
.layout {
  min-height: 100vh;
}
.inner {
  width: 1150px;
  margin: 0 auto;
}
</style>
