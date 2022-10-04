<script setup lang="ts">
import { shallowRef } from 'vue'
import PairsUI from '@/components/Form/Pairs'
import { Pairs as IPairsField } from '@/store/form/model'

const props = defineProps<{ field: IPairsField }>()

const items = shallowRef<Array<[string, string]>>([])
</script>

<template>
  <PairsUI :pairs="items" @input="items = $event" />
</template>

<style scoped></style>
