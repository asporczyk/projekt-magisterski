<script setup lang="ts">
import { AvailableMeasurements } from '@/const/AvailableMeasurements'
import HeadlineL from '@/components/atoms/Typography/HeadlineL.vue'
import { useI18n } from 'vue-i18n'

defineProps<{
  measurementType: string
}>()

const { t } = useI18n()
</script>
<template>
  <HeadlineL class="d-flex">
    {{ t(`measurements.names.${measurementType}`) }}
    <v-icon
      size="auto"
      :color="
        AvailableMeasurements.find(
          (measurement) => measurement.name === measurementType,
        )?.color
      "
      :icon="
        AvailableMeasurements.find(
          (measurement) => measurement.name === measurementType,
        )?.icon
      "
    />
  </HeadlineL>
</template>
