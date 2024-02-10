<script setup lang="ts">
import TextFieldWithValidation from '@/components/atoms/TextFieldWithValidation/TextFieldWithValidation.vue'
import TextButton from '@/components/atoms/Buttons/TextButton.vue'
import { useI18n } from 'vue-i18n'
import { object, string } from 'yup'
import { useForm } from 'vee-validate'
import router from '@/router'
import LinkButton from '@/components/atoms/Buttons/LinkButton.vue'
import { ref, watch } from 'vue'
import ResponseModal from '@/components/modals/ResponseModal.vue'
import { useQuery } from '@tanstack/vue-query'
import { login } from '@/api/AccountApi'
import FullscreenLoader from '@/components/molecules/FullscreenLoader/FullscreenLoader.vue'
import type { AxiosError } from 'axios'
import TextBody from '@/components/atoms/Typography/TextBody.vue'

const { t } = useI18n()

interface LoginFields {
  email: string
  password: string
}

const schema = object({
  email: string().required(t('errors.field-is-empty')),
  password: string().required(t('errors.field-is-empty')),
})

const emit = defineEmits<{
  login: [string]
}>()

const openErrorModal = ref<boolean>(false)
const isWrongEmailOrPassword = ref<boolean>(false)

const { handleSubmit, values } = useForm<LoginFields>({
  validationSchema: schema,
})

const {
  data,
  error,
  refetch: postLogin,
  isSuccess,
  isError,
  isFetching,
} = useQuery<LoginResponse, AxiosError>({
  queryKey: ['login'],
  queryFn: async () => {
    const { email, password } = values
    return await login({ email, password }).then((res) => res.data)
  },
  enabled: false,
})

const handleLogin = handleSubmit(() => {
  isWrongEmailOrPassword.value = false
  postLogin()
})

watch(isSuccess, () => {
  if (isSuccess.value && !isFetching.value) {
    emit('login', data.value?.token ?? '')
  }
})

watch(isError, () => {
  if (!isError.value || isFetching.value) {
    return
  }

  if (error.value?.response?.status === 403) {
    isWrongEmailOrPassword.value = true

    return
  }

  openErrorModal.value = true
})

const handleGoToForgotPassword = () => {
  router.push({ name: 'forgot password' })
}
</script>
<template>
  <v-form @submit="handleLogin">
    <TextFieldWithValidation name="email" :label="t('form.email')" />
    <TextFieldWithValidation
      name="password"
      :label="t('form.password')"
      type="password"
    />
    <TextBody class="text-red-darken-4" v-if="isWrongEmailOrPassword"
      >Błędny email lub hasło</TextBody
    >
    <LinkButton full-width @click="handleGoToForgotPassword">
      {{ t('forgot-password') }}
    </LinkButton>
    <TextButton variant="primary" full-width type="submit">{{
      t('sign-in')
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
    "forgot-password": "Forgot password?",
    "form": {
      "email": "Email address",
      "password": "Password"
    },
    "sign-in": "Sign in"
  },
  "pl": {
    "forgot-password": "Zapomniałeś hasła?",
    "form": {
      "email": "Adres email",
      "password": "Hasło"
    },
    "sign-in": "Zaloguj się"
  }
}</i18n>
