<script setup lang="ts">
import FieldSet from '../FieldSet'
import InputText from 'primevue/inputtext'
import Pair from './Pair.vue'
import Button from 'primevue/button'

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
    <Pair v-for="([key, value], index) in props.pairs" :key="index" @remove="remove(index)">
      <div class="flex gap-2">
        <InputText
          :modelValue="key"
          placeholder="Key"
          @update:modelValue="updatePair(index, $event || '', value)"
        />
        <InputText
          :modelValue="value"
          placeholder="Value"
          @update:modelValue="updatePair(index, key, $event || '')"
        />
      </div>
    </Pair>
    <div>
      <Button type="button" @click="add">
        {{ props.pairs.length === 0 ? 'Create key/value pair' : 'Add item' }}
      </Button>
    </div>
  </FieldSet>
</template>

<style scoped></style>
