<script setup lang="ts">
import ListField from '@/components/Form/List'
import FieldWrap from '@/components/Form/Field'
import { List as IListField } from '@/store/form/model'
import { computed } from 'vue'
import Node from './Node.vue'
import NestedGroup from '@/components/Form/NestedGroup'

const props = defineProps<{ field: IListField }>()

const nested = computed(() => Array.isArray(props.field.structure))
</script>

<template>
  <ListField
    :items="props.field.value"
    :empty="props.field.structure"
    :nested="nested"
    v-slot="{ item, index }"
    @input="props.field.value = $event"
  >
    <Node v-if="!nested" :field="item" />
    <NestedGroup v-else>
      <FieldWrap
        v-for="nestedField in item"
        :key="nestedField.fullKey"
        :label="nestedField.title"
        :path="props.field.fullKey + '[' + index + '].' + nestedField.fullKey"
        :description="nestedField.description"
        v-slot="{ id }"
      >
        <Node :id="id" :field="nestedField" />
      </FieldWrap>
    </NestedGroup>
  </ListField>
</template>
