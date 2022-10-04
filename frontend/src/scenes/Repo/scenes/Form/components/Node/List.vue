<script setup lang="ts">
import ListField from '@/components/Form/List'
import FieldWrap from '@/components/Form/Field'
import { List as IListField } from '@/store/form/model'
import { computed, shallowRef } from 'vue'
import Node from './Node.vue'
import NestedGroup from '@/components/Form/NestedGroup'

type Value = Array<{ key: string; structure: IListField['structure'] }>

const props = defineProps<{ field: IListField }>()

const items = shallowRef<Value>([])

const empty = computed(() => ({ structure: props.field.structure }))
const nested = computed(() => Array.isArray(props.field.structure))
</script>

<template>
  <!--  TODO: manage values-->
  <ListField
    :items="items"
    :empty="empty"
    :nested="nested"
    v-slot="{ index, structure }"
    @input="items = $event"
  >
    <Node v-if="!nested" :field="structure" />
    <NestedGroup v-else>
      <FieldWrap
        v-for="nestedField in structure"
        :key="nestedField.key"
        :label="nestedField.title"
        :path="props.field.key + '.[].' + nestedField.key"
        :description="nestedField.description"
        v-slot="{ id }"
      >
        <Node :id="id" :field="nestedField" />
      </FieldWrap>
    </NestedGroup>
  </ListField>
</template>
