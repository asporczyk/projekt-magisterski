import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMeasurementsStore = defineStore('measurements', () => {
  const measurementsList = ref<MeasurementsListResponse | null>(null)

  function setMeasurementsList(measurements: MeasurementsListResponse) {
    measurementsList.value = measurements
  }

  return {
    measurementsList,
    setMeasurementsList,
  }
})
