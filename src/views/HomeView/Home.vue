<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import HeadlineL from '@/components/atoms/Typography/HeadlineL.vue'
import MeasurementsGrid from '@/views/HomeView/MeasurementsGrid/MeasurementsGrid.vue'
import { AvailableMeasurements } from '@/const/AvailableMeasurements'

const { t } = useI18n()
</script>
<template>
  <div class="d-flex flex-column h-100">
    <HeadlineL>{{ t('welcome') }}</HeadlineL>
    <MeasurementsGrid :items="AvailableMeasurements" />
  </div>
</template>
<i18n>
  {
    "en": {
      "welcome": "Hello, how are you feeling today? Enter measurements."
    },
    "pl": {
      "welcome": "Dzień dobry, jak się dziś czujesz? Wprowadź pomiary."
    }
  }
</i18n>
