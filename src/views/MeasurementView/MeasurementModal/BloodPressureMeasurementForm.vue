<script setup lang="ts">
import { object, string } from 'yup'
import { useI18n } from 'vue-i18n'
import { useForm } from 'vee-validate'
import TextFieldWithValidation from '@/components/atoms/TextFieldWithValidation/TextFieldWithValidation.vue'
import TextButton from '@/components/atoms/Buttons/TextButton.vue'
import { useQuery } from '@tanstack/vue-query'
import { postBloodPressure } from '@/api/Measurements/BloodPressureApi'
import { ref, watch } from 'vue'
import { useMeasurementsStore } from '@/stores/measurements'
import ResponseModal from '@/components/modals/ResponseModal.vue'

interface MeasurementFields {
  systolic: number
  diastolic: number
  heartRate: number
}

const emit = defineEmits<{
  success: []
}>()

const { t } = useI18n()
const measurementsStore = useMeasurementsStore()
const openErrorModal = ref<boolean>(false)

const schema = object({
  systolic: string().required(t('errors.field-is-empty')),
  diastolic: string().required(t('errors.field-is-empty')),
  heartRate: string().required(t('errors.field-is-empty')),
})

const { handleSubmit, values } = useForm<MeasurementFields>({
  validationSchema: schema,
})

const {
  data,
  refetch: postBloodPressureMeasurementData,
  isSuccess,
  isError,
  isFetching,
} = useQuery<MeasurementDto>({
  queryKey: ['postBloodPressureMeasurementData'],
  queryFn: async () => {
    const data: BloodPressureMeasurementPostRequest = {
      systolic: values.systolic,
      diastolic: values.diastolic,
      heartRate: values.heartRate,
      timestamp: new Date(),
    }

    return await postBloodPressure(data).then((res) => res.data)
  },
  enabled: false,
})

const handleAddMeasurement = handleSubmit(() => {
  postBloodPressureMeasurementData()
})

watch(isFetching, () => {
  if (isSuccess.value && !isFetching.value && data?.value) {
    measurementsStore.setMeasurementsList(data.value)
    emit('success')
  }
})

watch(isError, () => {
  if (!isError.value || isFetching.value) {
    return
  }

  openErrorModal.value = true
})
</script>
<template>
  <v-form @submit="handleAddMeasurement">
    <TextFieldWithValidation
      name="systolic"
      type="number"
      :label="t('systolic')"
      :unit="t('measurements.units.blood-pressure')"
    />
    <TextFieldWithValidation
      name="diastolic"
      type="number"
      :label="t('diastolic')"
      :unit="t('measurements.units.blood-pressure')"
    />
    <TextFieldWithValidation
      name="heartRate"
      type="number"
      :label="t('heart-rate')"
      :unit="t('measurements.units.heart-rate')"
    />
    <TextButton variant="primary" full-width type="submit">{{
      t('add-measurement')
    }}</TextButton>
  </v-form>
  <ResponseModal
    v-model="openErrorModal"
    :body="t('errors.unexpected-error')"
    variant="negative"
    @on-close="openErrorModal = false"
  />
</template>
<i18n>
{
  "en": {
    "add-measurement": "Add measurement",
    "diastolic": "Diastolic",
    "heart-rate": "Heart rate",
    "systolic": "Systolic"
  },
  "pl": {
    "add-measurement": "Dodaj pomiar",
    "diastolic": "Ciśnienie rozkurczowe",
    "heart-rate": "Tętno",
    "systolic": "Ciśnienie skurczowe"
  }
}
</i18n>
