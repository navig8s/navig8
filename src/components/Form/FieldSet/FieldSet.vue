<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FieldSet',
})
</script>

<template>
  <div :class="$style.fieldSet" class="flex flex-column">
    <slot />
  </div>
</template>

<style scoped module lang="scss">
.fieldSet {
  & > :deep(*) {
    margin: 0.3rem 0;

    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
