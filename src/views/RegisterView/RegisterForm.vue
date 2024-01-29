<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { object, ref as yupRef, string } from 'yup'
import { useForm } from 'vee-validate'
import TextButton from '@/components/atoms/Buttons/TextButton.vue'
import TextFieldWithValidation from '@/components/atoms/TextFieldWithValidation/TextFieldWithValidation.vue'
import { useQuery } from '@tanstack/vue-query'
import { register } from '@/api/AccountApi'
import FullscreenLoader from '@/components/molecules/FullscreenLoader/FullscreenLoader.vue'
import ResponseModal from '@/components/modals/ResponseModal.vue'
import { ref, watch } from 'vue'

const { t } = useI18n()

interface RegisterFields {
  email: string
  password: string
  repPassword: string
}

const schema = object({
  email: string()
    .required(t('errors.field-is-empty'))
    .email(t('errors.email-validation')),
  password: string()
    .required(t('errors.field-is-empty'))
    .min(8, t('errors.password-validation.length-error'))
    .matches(/\w*[a-z]\w*/, t('errors.password-validation.lowercase-error'))
    .matches(/\w*[A-Z]\w*/, t('errors.password-validation.uppercase-error'))
    .matches(/\w*\d\w*/, t('errors.password-validation.number-error'))
    .matches(
      /\w*[^A-Za-z0-9]\w*/,
      t('errors.password-validation.non-alphanumeric-error'),
    ),
  repPassword: string()
    .required(t('errors.field-is-empty'))
    .oneOf(
      [yupRef('password')],
      t('errors.password-validation.passwords-dont-match'),
    ),
})

const emit = defineEmits<{
  register: []
}>()

const { handleSubmit, values } = useForm<RegisterFields>({
  validationSchema: schema,
})

const openErrorModal = ref(false)

const {
  refetch: postRegister,
  isSuccess,
  isError,
  isFetching,
} = useQuery({
  queryKey: ['register'],
  queryFn: async () =>
    await register({
      email: values.email,
      password: values.password,
      login: values.email,
    }),
  enabled: false,
})

const handleRegister = handleSubmit(() => postRegister())

watch(isSuccess, () => {
  if (isSuccess.value && !isFetching.value) {
    emit('register')
  }
})

watch(isError, () => {
  if (isError.value && !isFetching.value) {
    openErrorModal.value = true
  }
})
</script>
<template>
  <v-form @submit="handleRegister">
    <TextFieldWithValidation name="email" :label="t('form.email')" />
    <TextFieldWithValidation
      name="password"
      :label="t('form.password')"
      type="password"
    />
    <TextFieldWithValidation
      name="repPassword"
      :label="t('form.rep-password')"
      type="password"
    />
    <TextButton variant="primary" full-width type="submit">{{
      t('sign-up')
    }}</TextButton>
  </v-form>
  <FullscreenLoader :is-loading="isFetching" />
  <ResponseModal
    v-model="openErrorModal"
    :body="t('errors.unexpected-error')"
    variant="negative"
    @on-close="openErrorModal = false"
  />
</template>
<i18n>{
  "en": {
    "form": {
      "email": "Email address",
      "password": "Password",
      "rep-password": "Repeat password"
    },
    "sign-up": "Sign up"
  },
  "pl": {
    "form": {
      "email": "Adres email",
      "password": "Hasło",
      "rep-password": "Powtórz hasło"
    },
    "sign-up": "Utwórz konto"
  }
}</i18n>
