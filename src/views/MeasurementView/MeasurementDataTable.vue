<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import TextButtonWithIcon from '@/components/atoms/Buttons/TextButtonWithIcon.vue'
import HeadlineS from '@/components/atoms/Typography/HeadlineS.vue'
import { computed } from 'vue'

interface MeasurementDataTableProps {
  measurementType: string
  measurementData: MeasurementListItem[]
  loading?: boolean
}

const props = defineProps<MeasurementDataTableProps>()

defineEmits<{
  addMeasurement: []
}>()

const { t } = useI18n()

let headers = computed(() => [
  {
    title: t('headers.date'),
    value: 'timestamp',
    key: 'timestamp',
  },
  props.measurementType !== 'blood-pressure' && {
    title: `${t('headers.value')} (${t(`measurements.units.${props.measurementType}`)})`,
    value: 'value',
  },
  props.measurementType === 'blood-pressure' && {
    title: `${t('headers.systolic')} (${t(`measurements.units.${props.measurementType}`)})`,
    value: 'systolic',
  },
  props.measurementType === 'blood-pressure' && {
    title: `${t('headers.diastolic')} (${t(`measurements.units.${props.measurementType}`)})`,
    value: 'diastolic',
  },
  props.measurementType === 'blood-pressure' && {
    title: `${t('headers.heart-rate')} (${t(`measurements.units.heart-rate`)})`,
    value: 'heartRate',
  },
])
</script>
<template>
  <div class="d-flex align-center">
    <HeadlineS>{{ t('list-of-measurements') }}</HeadlineS>
    <TextButtonWithIcon
      icon="mdi-plus"
      class="ml-auto"
      variant="positive"
      @click="$emit('addMeasurement')"
    >
      {{ t('add-measurement') }}
    </TextButtonWithIcon>
  </div>
  <v-data-table
    :items="measurementData"
    :headers="headers"
    :loading="loading"
  />
</template>
<i18n>
{
  "pl": {
    "add-measurement": "Dodaj pomiar",
    "list-of-measurements": "Lista pomiarów",
    "headers": {
      "date": "Data",
      "diastolic": "Rozkurczowe",
      "heart-rate": "Tętno",
      "systolic": "Skurczowe",
      "value": "Pomiar"
    }
  },
  "en": {
    "add-measurement": "Add measurement",
    "list-of-measurements": "List of measurements",
    "headers": {
      "date": "Date",
      "diastolic": "Diastolic",
      "heart-rate": "Heart rate",
      "systolic": "Systolic",
      "value": "Measurement"
    }
  }
}
</i18n>
