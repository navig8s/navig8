<script setup lang="ts">
import Switcher from '@/components/Form/Switcher'
import { Switcher as ISwitcherField } from '@/store/form/model'
import { ref } from 'vue'

const props = defineProps<{ field: ISwitcherField }>()
const checked = ref(props.field.defaultValue)
</script>

<template>
  <Switcher :value="checked" @input="checked = $event" />
</template>
