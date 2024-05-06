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
  close: []
  success: []
}>()

const { t } = useI18n()
</script>
<template>
  <CenteredModal @on-close="$emit('close')" :aria-label="t('add-measurement')">
    <template #title>
      <HeadlineS>{{ t('add-measurement') }}</HeadlineS>
    </template>
    <template #body>
      <BasicMeasurementForm
        v-if="measurementType !== 'blood-pressure'"
        :measurement-type="measurementType"
        @success="$emit('success')"
      />
      <BloodPressureMeasurementForm
        v-else-if="measurementType === 'blood-pressure'"
        :measurement-type="measurementType"
        @success="$emit('success')"
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
