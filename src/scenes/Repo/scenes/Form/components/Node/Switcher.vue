<script setup lang="ts">
import Switcher from '@/components/Form/Switcher'
import { Switcher as ISwitcherField } from '@/store/form/model'
import { ref } from 'vue'

const props = defineProps<{ field: ISwitcherField }>()
const checked = ref(props.field.defaultValue)
</script>

<template>
  <Switcher :value="props.field.value" @input="props.field.value = $event" />
</template>
