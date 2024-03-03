<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  isMeasurementType,
  type MeasurementType,
} from '@/types/MeasurementType'
import { useRoute } from 'vue-router'
import MeasurementTitleWithIcon from '@/views/MeasurementView/MeasurementTitleWithIcon.vue'
import MeasurementDescription from '@/views/MeasurementView/MeasurementDescription.vue'
import MeasurementDataTable from '@/views/MeasurementView/MeasurementDataTable.vue'
import MeasurementModal from '@/views/MeasurementView/MeasurementModal/MeasurementModal.vue'
import { AvailableMeasurements } from '@/const/AvailableMeasurements'
import TextBody from '@/components/atoms/Typography/TextBody.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const route = useRoute()

const measurementType = ref<MeasurementType>()
const isInvalidMeasurementType = ref<boolean>(false)
const isAddMeasurementModalOpen = ref<boolean>(false)

onMounted(() => {
  const type = route.params.type.toString()

  if (!isMeasurementType(type)) {
    isInvalidMeasurementType.value = true
    return
  }

  measurementType.value = type
})

const mock = [
  { id: 1, timestamp: new Date(), value: 100 },
  { id: 2, timestamp: new Date(), value: 200 },
  { id: 3, timestamp: new Date(), value: 300 },
  { id: 4, timestamp: new Date(), value: 400 },
  { id: 5, timestamp: new Date(), value: 500 },
  { id: 6, timestamp: new Date(), value: 600 },
  { id: 7, timestamp: new Date(), value: 700 },
  { id: 8, timestamp: new Date(), value: 800 },
  { id: 9, timestamp: new Date(), value: 900 },
  { id: 10, timestamp: new Date(), value: 1000 },
  { id: 11, timestamp: new Date(), value: 100 },
]
</script>
<template>
  <div class="d-flex flex-column w-75" v-if="!isInvalidMeasurementType">
    <MeasurementTitleWithIcon :measurement-type="measurementType" />
    <MeasurementDescription :measurement-type="measurementType" />
    <MeasurementDataTable
      v-if="
        !AvailableMeasurements.find(
          (measurement) => measurement.name === measurementType,
        )?.notYetImplemented
      "
      :measurement-type="measurementType"
      :measurementData="mock"
      @addMeasurement="isAddMeasurementModalOpen = true"
    />
    <TextBody v-else>{{ t('common.not-yet-implemented') }}</TextBody>
    <MeasurementModal
      v-model="isAddMeasurementModalOpen"
      :measurement-type="measurementType"
      @onClose="isAddMeasurementModalOpen = false"
    />
  </div>
</template>
