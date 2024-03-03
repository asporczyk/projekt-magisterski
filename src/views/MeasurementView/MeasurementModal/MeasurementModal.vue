<script setup lang="ts">
import BasicMeasurementForm from '@/views/MeasurementView/MeasurementModal/BasicMeasurementForm.vue'
import CenteredModal from '@/components/organisms/CenteredModal/CenteredModal.vue'
import HeadlineS from '@/components/atoms/Typography/HeadlineS.vue'
import { useI18n } from 'vue-i18n'
import BloodPressureMeasurementForm from '@/views/MeasurementView/MeasurementModal/BloodPressureMeasurementForm.vue'

defineProps<{
  measurementType: string
}>()

defineEmits<{
  onClose: []
}>()

const { t } = useI18n()
</script>
<template>
  <CenteredModal @on-close="$emit('onClose')">
    <template #title>
      <HeadlineS>{{ t('add-measurement') }}</HeadlineS>
    </template>
    <template #body>
      <BasicMeasurementForm
        v-if="measurementType !== 'blood-pressure'"
        :measurement-type="measurementType"
      />
      <BloodPressureMeasurementForm
        v-else-if="measurementType === 'blood-pressure'"
        :measurement-type="measurementType"
      />
    </template>
  </CenteredModal>
</template>
<i18n>
{
  "pl": {
    "add-measurement": "Dodaj pomiar"
  },
  "en": {
    "add-measurement": "Add measurement"
  }
}
</i18n>
