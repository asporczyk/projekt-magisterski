<script setup lang="ts">
import { object, string } from 'yup'
import { useI18n } from 'vue-i18n'
import { useForm } from 'vee-validate'
import TextFieldWithValidation from '@/components/atoms/TextFieldWithValidation/TextFieldWithValidation.vue'
import TextButton from '@/components/atoms/Buttons/TextButton.vue'

interface MeasurementFields {
  systoic: number
  diastoic: number
  heartRate: number
}

const { t } = useI18n()

const schema = object({
  systoic: string().required(t('errors.field-is-empty')),
  diastoic: string().required(t('errors.field-is-empty')),
  heartRate: string().required(t('errors.field-is-empty')),
})

const { handleSubmit } = useForm<MeasurementFields>({
  validationSchema: schema,
})

const handleAddMeasurement = handleSubmit((values) => {
  console.log(values)
})
</script>
<template>
  <v-form @submit="handleAddMeasurement">
    <TextFieldWithValidation
      name="systoic"
      type="number"
      :label="t('systoic')"
      :unit="t('measurements.units.blood-pressure')"
    />
    <TextFieldWithValidation
      name="diastoic"
      type="number"
      :label="t('diastoic')"
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
</template>
<i18n>
{
  "en": {
    "add-measurement": "Add measurement",
    "diastoic": "Diastoic",
    "heart-rate": "Heart rate",
    "systoic": "Systoic"
  },
  "pl": {
    "add-measurement": "Dodaj pomiar",
    "diastoic": "Ciśnienie rozkurczowe",
    "heart-rate": "Tętno",
    "systoic": "Ciśnienie skurczowe"
  }
}
</i18n>
