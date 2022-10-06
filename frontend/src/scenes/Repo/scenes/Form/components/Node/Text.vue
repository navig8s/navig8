<script setup lang="ts">
import TextField from '@/components/Form/Textarea'
import { Text as ITextField } from '@/store/form/model'

const props = defineProps<{ field: ITextField }>()
</script>

<template>
  <TextField :value="props.field.value" @input="props.field.value = $event" />
</template>
