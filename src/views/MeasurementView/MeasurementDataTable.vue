<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import TextButtonWithIcon from '@/components/atoms/Buttons/TextButtonWithIcon.vue'
import HeadlineS from '@/components/atoms/Typography/HeadlineS.vue'
import { computed } from 'vue'
import { useAccountStore } from '@/stores/account'
import { storeToRefs } from 'pinia'

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
const accountStore = useAccountStore()
const { isGuest } = storeToRefs(accountStore)

let headers = computed(() => {
  const headers = [
    {
      title: t('headers.date'),
      value: 'timestamp',
      key: 'timestamp',
    },
  ]

  if (props.measurementType !== 'blood-pressure') {
    headers.push({
      title: `${t('headers.value')} (${t(`measurements.units.${props.measurementType}`)})`,
      value: 'value',
      key: 'value',
    })
  }

  if (props.measurementType === 'blood-pressure') {
    headers.push({
      title: `${t('headers.systolic')} (${t(`measurements.units.${props.measurementType}`)})`,
      value: 'systolic',
      key: 'systolic',
    })
    headers.push({
      title: `${t('headers.diastolic')} (${t(`measurements.units.${props.measurementType}`)})`,
      value: 'diastolic',
      key: 'diastolic',
    })
    headers.push({
      title: `${t('headers.heart-rate')} (${t(`measurements.units.heart-rate`)})`,
      value: 'heartRate',
      key: 'heartRate',
    })
  }
  return headers
})
</script>
<template>
  <div class="d-flex align-center">
    <HeadlineS>{{ t('list-of-measurements') }}</HeadlineS>
    <TextButtonWithIcon
      v-if="!isGuest"
      icon="mdi-plus"
      class="ml-auto"
      variant="positive"
      :label="t('add-measurement')"
      @click="$emit('addMeasurement')"
    />
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
