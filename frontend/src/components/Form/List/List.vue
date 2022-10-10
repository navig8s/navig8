<script setup lang="ts">
import FieldSet from '../FieldSet'
import Item from './Item.vue'
import Button from 'primevue/button'
import { clone, isEmpty } from 'ramda'

const props = withDefaults(defineProps<{ items: any[]; empty: any; nested?: boolean }>(), {
  nested: false,
})
const emit = defineEmits<{
  (e: 'input', value: any[]): void
}>()

const add = () => {
  props.items.push(clone(props.empty))
  emit('input', props.items)
}
const remove = (index: number) => {
  props.items.splice(index, 1)
  emit('input', props.items)
}
const changeOrder = (direction: 'up' | 'down', index: number) => {
  const withIndex = direction === 'up' ? index - 1 : index + 1
  ;[props.items[withIndex], props.items[index]] = [props.items[index], props.items[withIndex]]

  emit('input', props.items)
}
</script>

<template>
  <FieldSet>
    <Item
      v-for="(item, index) in props.items"
      :key="index"
      :centerControls="!nested"
      :isFirst="index === 0"
      :isLast="index === props.items.length - 1"
      @changeOrder="(direction) => changeOrder(direction, index)"
      @remove="remove(index)"
    >
      <slot :item="item" :index="index" />
    </Item>
    <div>
      <Button :class="{ 'ml-4': !isEmpty(props.items) }" type="button" @click="add">
        {{ props.items.length === 0 ? 'Create item' : 'Add item' }}
      </Button>
    </div>
  </FieldSet>
</template>
