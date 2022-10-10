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
    :class="[$style.field, `gap-${vertical ? 2 : 3}`, { 'flex-column': vertical }]"
    class="flex mt-3"
  >
    <div
      :class="{ 'justify-content-end flex-shrink-0 text-right': !vertical }"
      class="flex border-gray-600"
      style="max-width: 500px; width: calc(50% - 0.5rem)"
    >
      <label :for="id">
        <span class="text-base font-bold inline-block">
          {{ props.label }}
        </span>
        <template v-if="label !== path">
          <br />
          <span class="text-orange-700 inline-block my-1"> {{ path }} </span>
        </template>
        <br />
        <span
          v-if="!isNil(props.description)"
          class="inline-block text-sm text-color-secondary my-1"
        >
          {{ props.description }}
        </span>
      </label>
    </div>
    <div
      :class="{ 'flex flex-column flex-shrink-0 justify-content-end': !vertical }"
      style="width: calc(50% - 0.5rem)"
    >
      <slot :id="id" />
    </div>
  </div>
</template>

<style scoped module>
.field {
  min-width: 34.92rem;
}
</style>
