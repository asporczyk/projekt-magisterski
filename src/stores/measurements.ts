import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useDate } from 'vuetify'

export const useMeasurementsStore = defineStore('measurements', () => {
  const measurementsList = ref<MeasurementListItem[]>([])

  const date = useDate()

  function setMeasurementsList(measurements: MeasurementDto[]) {
    measurementsList.value = measurements
      .map((measurement) => {
        return {
          ...measurement,
          timestamp: date.format(measurement.timestamp, 'fullDateWithWeekday'),
        }
      })
      .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
  }

  function resetMeasurementsList() {
    measurementsList.value = []
  }

  return {
    measurementsList,
    setMeasurementsList,
    resetMeasurementsList,
  }
})
