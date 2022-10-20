<script setup lang="ts">
import FieldSet from '../FieldSet'
import InputText from 'primevue/inputtext'
import Pair from './Pair.vue'
import Button from 'primevue/button'
import NestedPlaceholder from '../NestedPlaceholder'
import { isEmpty } from 'ramda'

const props = defineProps<{ pairs: Array<[string, string]> }>()
const emit = defineEmits<{
  (e: 'input', value: Array<[string, string]>): void
}>()

const add = () => {
  props.pairs.push(['', ''])
  emit('input', props.pairs)
}
const remove = (index: number) => {
  props.pairs.splice(index, 1)
  emit('input', props.pairs)
}
const updatePair = (index: number, key: string, value: string) => {
  props.pairs[index] = [key, value]
  emit('input', props.pairs)
}
</script>

<template>
  <FieldSet>
    <NestedPlaceholder v-if="isEmpty(props.pairs)" @click="add">
      <Pair>
        <div class="flex gap-2 w-full">
          <InputText placeholder="Key" class="flex-grow-1" />
          <InputText placeholder="Value" class="flex-grow-1" />
        </div>
      </Pair>
    </NestedPlaceholder>
    <Pair v-for="([key, value], index) in props.pairs" :key="index" @remove="remove(index)">
      <div class="flex gap-2 w-full">
        <InputText
          :modelValue="key"
          class="flex-grow-1"
          placeholder="Key"
          @update:modelValue="updatePair(index, $event || '', value)"
        />
        <InputText
          :modelValue="value"
          class="flex-grow-1"
          placeholder="Value"
          @update:modelValue="updatePair(index, key, $event || '')"
        />
      </div>
    </Pair>
    <div v-if="!isEmpty(props.pairs)">
      <Button type="button" @click="add"> Add item </Button>
    </div>
  </FieldSet>
</template>

<style scoped></style>
