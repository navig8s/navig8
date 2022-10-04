<script setup lang="ts">
import FieldSet from '../FieldSet'
import Item from './Item.vue'
import Button from 'primevue/button'
import { v4 as uuidV4 } from 'uuid'

const props = withDefaults(
  defineProps<{
    items: Array<{ key: string; [key: string]: any }>
    empty: any
    nested?: boolean
  }>(),
  { nested: false },
)
const emit = defineEmits<{
  (e: 'input', value: Array<{ key: string }>): void
}>()

const add = () => emit('input', [...props.items, { ...props.empty, key: uuidV4() }])
const remove = (key: string) =>
  emit(
    'input',
    props.items.filter((item) => item.key !== key),
  )
const changeOrder = (direction: 'up' | 'down', index: number) => {
  const copy = [...props.items]
  const withIndex = direction === 'up' ? index - 1 : index + 1
  ;[copy[withIndex], copy[index]] = [copy[index], copy[withIndex]]

  emit('input', copy)
}
</script>

<template>
  <FieldSet>
    <Item
      :key="key"
      v-for="({ key, ...item }, index) in props.items"
      :centerControls="!nested"
      :isFirst="index === 0"
      :isLast="index === props.items.length - 1"
      @changeOrder="(direction) => changeOrder(direction, index)"
      @remove="remove(key)"
    >
      <slot v-bind="item" :index="index" />
    </Item>
    <div>
      <Button type="button" @click="add">
        {{ props.items.length === 0 ? 'Create item' : 'Add item' }}
      </Button>
    </div>
  </FieldSet>
</template>
