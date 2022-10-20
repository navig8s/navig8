<script setup lang="ts">
import Repo from './scenes/Repo'
import LeavingPageWarning from '@/containers/LeavingPageWarning'
import { DEV } from './environment'
</script>

<template>
  <LeavingPageWarning v-if="!DEV" />
  <Repo />
</template>

<style scoped></style>
