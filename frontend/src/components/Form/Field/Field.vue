<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { v4 as uuidV4 } from 'uuid'
import { isNil } from 'ramda'

const id = ref('')
const props = withDefaults(
  defineProps<{ label: string; path: string; vertical?: boolean; description?: string }>(),
  {
    vertical: false,
  },
)

onBeforeMount(() => (id.value = uuidV4()))
</script>

<template>
  <div
    :class="[
      `gap-${vertical ? 2 : 3}`,
      { 'flex-column': vertical, 'py-2': !vertical, 'px-1': !vertical },
    ]"
    class="flex"
  >
    <div
      :class="{
        'justify-content-end flex-shrink-0 text-right': !vertical,
        [$style.column]: !vertical,
      }"
      class="flex border-gray-600"
    >
      <label :for="id">
        <span class="text-base font-bold inline-block">
          {{ props.label }}
        </span>
        <template v-if="label !== path">
          <br />
          <span
            class="text-orange-700 inline-block"
            :class="{
              'my-1': vertical || !isNil(props.description),
              'mt-1': !vertical && isNil(props.description),
            }"
          >
            {{ path }}
          </span>
        </template>
        <br />
        <span
          v-if="!isNil(props.description)"
          class="inline-block text-sm text-color-secondary"
          :class="{ 'mt-1': !vertical, 'my-1': vertical }"
        >
          {{ props.description }}
        </span>
      </label>
    </div>
    <div
      :class="{
        [$style.column]: !vertical,
        'flex flex-column flex-shrink-0 justify-content-end': !vertical,
      }"
    >
      <slot :id="id" />
    </div>
  </div>
</template>

<style scoped module>
.column {
  width: calc(50% - 0.5rem);
}
</style>
