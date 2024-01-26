<script setup lang="ts">
import TextFieldWithValidation from '@/components/atoms/TextFieldWithValidation/TextFieldWithValidation.vue'
import TextButton from '@/components/atoms/Buttons/TextButton.vue'
import BasicBox from '@/components/atoms/BasicBox/BasicBox.vue'
import { useI18n } from 'vue-i18n'
import { object, string } from 'yup'
import { useForm } from 'vee-validate'
import router from '@/router'
import LinkButton from '@/components/atoms/Buttons/LinkButton.vue'
import { ref } from 'vue'
import ResponseModal from '@/components/modals/ResponseModal.vue'

const { t } = useI18n()

interface LoginFields {
  email: string
  password: string
}

const schema = object({
  email: string().required(t('errors.field-is-empty')),
  password: string().required(t('errors.field-is-empty')),
})

const openModal = ref(false)

const { handleSubmit, values } = useForm<LoginFields>({
  validationSchema: schema,
})

const handleLogin = handleSubmit(() => {
  // TODO handle login user
})

const handleGoToRegister = () => {
  router.push({ name: 'register' })
}

const handleGoToForgotPassword = () => {
  router.push({ name: 'forgot password' })
}
</script>
<template>
  <BasicBox class="pa-5" width="360px">
    <v-form @submit="handleLogin">
      <TextFieldWithValidation name="email" :label="t('form.email')" />
      <TextFieldWithValidation
        name="password"
        :label="t('form.password')"
        type="password"
      />
      <LinkButton full-width @click="handleGoToForgotPassword">
        {{ t('forgot-password') }}
      </LinkButton>
      <TextButton variant="primary" full-width type="submit">{{
        t('sign-in')
      }}</TextButton>
      <LinkButton full-width @click="handleGoToRegister">
        {{ t('sign-up') }}
      </LinkButton>
    </v-form>
  </BasicBox>
  <ResponseModal
    v-model="openModal"
    variant="positive"
    body="agsdgfsdgdfg"
    @on-close="openModal = false"
  />
</template>
<i18n>{
  "en": {
    "forgot-password": "Forgot password?",
    "form": {
      "email": "Email address",
      "password": "Password"
    },
    "sign-in": "Sign in",
    "sign-up": "Sign up"
  },
  "pl": {
    "forgot-password": "Zapomniałeś hasła?",
    "form": {
      "email": "Adres email",
      "password": "Hasło"
    },
    "sign-in": "Zaloguj się",
    "sign-up": "Utwórz konto"
  }
}</i18n>
