<script setup lang="ts">
import { object, string } from 'yup'
import { useI18n } from 'vue-i18n'
import { useForm } from 'vee-validate'
import TextFieldWithValidation from '@/components/atoms/TextFieldWithValidation/TextFieldWithValidation.vue'
import TextButton from '@/components/atoms/Buttons/TextButton.vue'

interface MeasurementFields {
  value: number
}

defineProps<{
  measurementType: string
}>()

const { t } = useI18n()

const schema = object({
  value: string().required(t('errors.field-is-empty')),
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
      name="value"
      type="number"
      :label="t('measurement-value')"
      :unit="t(`measurements.units.${measurementType}`)"
    />
    <TextButton variant="primary" full-width type="submit">{{
      t('add-measurement')
    }}</TextButton>
  </v-form>
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
