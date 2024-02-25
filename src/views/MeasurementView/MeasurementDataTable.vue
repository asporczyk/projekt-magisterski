<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import TextButtonWithIcon from '@/components/atoms/Buttons/TextButtonWithIcon.vue'
import HeadlineS from '@/components/atoms/Typography/HeadlineS.vue'
import { useDate } from 'vuetify'
import { ref } from 'vue'

const { measurementType, measurementData } = defineProps<{
  measurementType: string
  measurementData: any[]
}>()

const { t } = useI18n()
const date = useDate()

const items = measurementData.map((item) => ({
  ...item,
  timestamp: date.format(item.timestamp, 'fullDateWithWeekday'),
}))

let headers = ref([
  {
    title: t('headers.date'),
    value: 'timestamp',
  },
  {
    title: `${t('headers.value')} (${t(`measurements.units.${measurementType}`)})`,
    value: 'value',
  },
])
</script>
<template>
  <div class="d-flex align-center">
    <HeadlineS>{{ t('list-of-measurements') }}</HeadlineS>
    <TextButtonWithIcon icon="mdi-plus" class="ml-auto" variant="positive">
      {{ t('add-measurement') }}
    </TextButtonWithIcon>
  </div>
  <v-data-table :items="items" :headers="headers" />
</template>
<i18n>
{
  "pl": {
    "add-measurement": "Dodaj pomiar",
    "list-of-measurements": "Lista pomiarów",
    "headers": {
      "date": "Data",
      "value": "Pomiar"
    }
  },
  "en": {
    "add-measurement": "Add measurement",
    "list-of-measurements": "List of measurements",
    "headers": {
      "date": "Date",
      "value": "Measurement"
    }
  }
}
</i18n>
