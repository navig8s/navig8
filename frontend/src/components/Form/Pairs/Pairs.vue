<script setup lang="ts">
import FieldSet from '../FieldSet'
import InputText from 'primevue/inputtext'
import Pair from './Pair.vue'
import Button from 'primevue/button'

const props = defineProps<{ pairs: Array<[string, string]> }>()
const emit = defineEmits<{
  (e: 'input', value: Array<[string, string]>): void
}>()

const add = () => emit('input', [...props.pairs, ['', '']])
const remove = (index: number) => {
  const copy = [...props.pairs]
  copy.splice(index, 1)
  emit('input', copy)
}
</script>

<template>
  <FieldSet>
    <Pair v-for="([key, value], index) in props.pairs" :key="index" @remove="remove(index)">
      <div class="flex gap-2">
        <InputText :modelValue="key" placeholder="Key" />
        <InputText :modelValue="value" placeholder="Value" />
      </div>
    </Pair>
    <div>
      <Button type="button" @click="add">
        {{ props.pairs.length === 0 ? 'Create item' : 'Add item' }}
      </Button>
    </div>
  </FieldSet>
</template>

<style scoped></style>
