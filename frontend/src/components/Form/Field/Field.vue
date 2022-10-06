<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { v4 as uuidV4 } from 'uuid'
import { isNil } from 'ramda'

const id = ref('')
const props = defineProps<{ label: string; path: string; description?: string }>()

onBeforeMount(() => (id.value = uuidV4()))
</script>

<template>
  <div :class="$style.field" class="flex flex-column w-min">
    <div class="flex mb-2 mt-3 border-gray-600">
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
    <div>
      <slot :id="id" />
    </div>
  </div>
</template>

<style scoped module>
.field {
  min-width: 34.92rem;
}
</style>
