<script lang="ts">
export default {}
</script>

<template>
  <div :class="$style.layout" class="flex flex-column">
    <header class="p-5 border-bottom-1 border-400"></header>
    <main class="flex flex-column my-5 flex-grow-1">
      <slot />
    </main>
    <footer class="p-5 border-top-1 border-400">Copyright</footer>
  </div>
</template>

<style scoped module>
.layout {
  min-height: 100vh;
}
</style>
