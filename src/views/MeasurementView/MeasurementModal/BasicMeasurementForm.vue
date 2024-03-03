<script setup lang="ts">
import { object, string } from 'yup'
import { useI18n } from 'vue-i18n'
import { useForm } from 'vee-validate'
import TextFieldWithValidation from '@/components/atoms/TextFieldWithValidation/TextFieldWithValidation.vue'
import TextButton from '@/components/atoms/Buttons/TextButton.vue'
import { useQuery } from '@tanstack/vue-query'
import { postHeartRate } from '@/api/Measurements/HeartRateApi'
import ResponseModal from '@/components/modals/ResponseModal.vue'
import { ref, watch } from 'vue'
import { useMeasurementsStore } from '@/stores/measurements'
import { postTemperature } from '@/api/Measurements/TemperatureApi'

interface MeasurementFields {
  value: number
}

const { measurementType } = defineProps<{
  measurementType: string
}>()

const emit = defineEmits<{
  success: []
}>()

const { t } = useI18n()
const measurementsStore = useMeasurementsStore()
const openErrorModal = ref<boolean>(false)

const schema = object({
  value: string().required(t('errors.field-is-empty')),
})

const { handleSubmit, values } = useForm<MeasurementFields>({
  validationSchema: schema,
})

const {
  data,
  refetch: postBasicMeasurementData,
  isSuccess,
  isError,
  isFetching,
} = useQuery<MeasurementsListResponse>({
  queryKey: ['postBasicMeasurementData'],
  queryFn: async () => {
    const data: BasicMeasurementPostRequest = {
      value: values.value,
      timestamp: new Date(),
    }

    switch (measurementType) {
      case 'heart-rate':
        return await postHeartRate(data).then((res) => res.data)
      case 'temperature':
        return await postTemperature(data).then((res) => res.data)
      default:
        throw new Error('Invalid measurement type')
    }
  },
  enabled: false,
})

const handleAddMeasurement = handleSubmit(() => {
  postBasicMeasurementData()
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
      name="value"
      type="number"
      :label="t('measurement-value')"
      :unit="t(`measurements.units.${measurementType}`)"
    />
    <TextButton variant="primary" full-width type="submit" :loading="isFetching"
      >{{ t('add-measurement') }}
    </TextButton>
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
  "pl": {
    "add-measurement": "Dodaj pomiar",
    "measurement-value": "Wartość pomiaru"
  },
  "en": {
    "add-measurement": "Add measurement",
    "measurement-value": "Measurement value"
  }
}
</i18n>
