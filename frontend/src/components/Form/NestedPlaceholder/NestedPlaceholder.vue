<script lang="ts" setup>
import Button from 'primevue/button'

const props = withDefaults(defineProps<{ createLabel?: string }>(), {
  createLabel: 'Create first item',
})
</script>

<template>
  <div :class="$style.wrapper">
    <div :class="$style.overlay" />
    <div :class="$style.buttonWrapper">
      <Button>{{ props.createLabel }}</Button>
    </div>
    <slot />
  </div>
</template>

<style scoped module lang="scss">
.wrapper {
  position: relative;
  z-index: 1;
  min-width: 100%;
  width: min-content;

  .overlay {
    opacity: 0.5;
    transition: opacity 0.3s;
    position: absolute;
    cursor: pointer;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--surface-overlay);
  }
  .buttonWrapper {
    position: absolute;
    cursor: pointer;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:hover {
    .overlay {
      opacity: 0.7;
    }
  }
}
</style>
