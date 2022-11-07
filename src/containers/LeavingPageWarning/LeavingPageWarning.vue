<script lang="ts" setup>
import { onBeforeUnmount, onMounted } from 'vue'
import { useOutputStore } from '@/store/output'

const output = useOutputStore()

const reaction = (event: BeforeUnloadEvent) => {
  if (output.isDifferentFromOriginal) {
    event.preventDefault()

    return (event.returnValue = 'Are you sure you want to exit? All changes will be lost.')
  }
}

onMounted(() => window.addEventListener('beforeunload', reaction))
onBeforeUnmount(() => window.removeEventListener('beforeunload', reaction))
</script>

<template>
  <!--  container -->
</template>

<style scoped module></style>
