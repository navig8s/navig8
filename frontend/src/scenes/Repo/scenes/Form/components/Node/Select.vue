<script setup lang="ts">
import { computed, ref } from 'vue'
import SelectUI, { Option } from '@/components/Form/Select'
import { Select as ISelectField } from '@/store/form/model'

const props = defineProps<{ field: ISelectField }>()
const value = ref(props.field.defaultValue)
const options = computed(() =>
  props.field.options.map((option) => Option(option.toString(), option)),
)
</script>

<template>
  <SelectUI :options="options" :value="props.field.value" @input="props.field.value = $event" />
</template>

<style scoped></style>
