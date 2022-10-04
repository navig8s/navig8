<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FieldSet',
})
</script>

<template>
  <div class="flex flex-column gap-2">
    <slot />
  </div>
</template>
