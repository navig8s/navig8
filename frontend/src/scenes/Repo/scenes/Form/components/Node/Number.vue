<script setup lang="ts">
import NumberUI from '@/components/Form/Number'
import { Number as INumberField } from '@/store/form/model'

const props = defineProps<{ field: INumberField }>()
</script>

<!--TODO: manage values-->
<template>
  <NumberUI :value="props.field.defaultValue" :isInteger="props.field.subSet === 'integer'" />
</template>

<style scoped></style>
