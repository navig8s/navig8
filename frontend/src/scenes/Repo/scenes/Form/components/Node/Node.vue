<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Node',
})
</script>
<script setup lang="ts">
import { Field } from '@/store/form/model'
import Text from './Text.vue'
import List from './List.vue'
import Switcher from './Switcher.vue'
import Number from './Number.vue'
import Pairs from './Pairs.vue'
import Select from './Select.vue'

const props = defineProps<{ field: Field; id?: string }>()
</script>

<template>
  <Text v-if="props.field.type === 'text'" :id="id" :field="props.field" />
  <Number v-if="props.field.type === 'number'" :id="id" :field="props.field" />
  <Switcher v-if="props.field.type === 'switcher'" :field="props.field" />
  <List v-if="props.field.type === 'list'" :field="props.field" />
  <Pairs v-if="props.field.type === 'pairs'" :field="props.field" />
  <Select v-if="props.field.type === 'select'" :field="props.field" />
</template>

<style scoped></style>
