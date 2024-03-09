<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
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
import { useQuery } from '@tanstack/vue-query'
import { getHeartRate } from '@/api/Measurements/HeartRateApi'
import { getTemperature } from '@/api/Measurements/TemperatureApi'
import { getBloodPressure } from '@/api/Measurements/BloodPressureApi'
import { useMeasurementsStore } from '@/stores/measurements'
import { storeToRefs } from 'pinia'

const { t } = useI18n()
const route = useRoute()
const measurementsStore = useMeasurementsStore()
const { measurementsList } = storeToRefs(measurementsStore)

const measurementType = ref<MeasurementType>('unknown')
const isInvalidMeasurementType = ref<boolean>(false)
const isAddMeasurementModalOpen = ref<boolean>(false)

onMounted(() => {
  const type = route.params.type.toString()

  if (!isMeasurementType(type)) {
    isInvalidMeasurementType.value = true
    return
  }

  measurementType.value = type
  measurementsStore.resetMeasurementsList()
})

const { data, isFetching } = useQuery<MeasurementDto[]>({
  queryKey: ['getMeasurements'],
  queryFn: async () => {
    switch (measurementType.value) {
      case 'heart-rate':
        return await getHeartRate().then((res) => res.data)
      case 'temperature':
        return await getTemperature().then((res) => res.data)
      case 'blood-pressure':
        return await getBloodPressure().then((res) => res.data)
      default:
        throw new Error('Invalid measurement type')
    }
  },
})

watch(data, () => {
  measurementsStore.setMeasurementsList(data.value ?? [])
})
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
      :measurementData="measurementsList"
      :loading="isFetching"
      @addMeasurement="isAddMeasurementModalOpen = true"
    />
    <TextBody v-else>{{ t('common.not-yet-implemented') }}</TextBody>
    <MeasurementModal
      v-model="isAddMeasurementModalOpen"
      :measurement-type="measurementType"
      @close="isAddMeasurementModalOpen = false"
      @success="isAddMeasurementModalOpen = false"
    />
  </div>
</template>
