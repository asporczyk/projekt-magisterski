<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  isMeasurementType,
  type MeasurementType,
} from '@/types/MeasurementType'
import { useRoute } from 'vue-router'

const route = useRoute()

const measurementType = ref<MeasurementType>()
const isInvalidMeasurementType = ref<boolean>(false)

onMounted(() => {
  const type = route.params.type.toString()

  if (!isMeasurementType(type)) {
    isInvalidMeasurementType.value = true
    return
  }

  measurementType.value = type
})
</script>
<template>
  <h1>TODO MGR-7 Pomiary</h1>
  <h2 v-if="!isInvalidMeasurementType">{{ measurementType }}</h2>
</template>
