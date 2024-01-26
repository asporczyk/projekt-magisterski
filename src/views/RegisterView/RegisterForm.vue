<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { object, ref as yupRef, string } from 'yup'
import { useForm } from 'vee-validate'
import BasicBox from '@/components/atoms/BasicBox/BasicBox.vue'
import TextButton from '@/components/atoms/Buttons/TextButton.vue'
import TextFieldWithValidation from '@/components/atoms/TextFieldWithValidation/TextFieldWithValidation.vue'
import router from '@/router'
import LinkButton from '@/components/atoms/Buttons/LinkButton.vue'

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

const { handleSubmit } = useForm<RegisterFields>({
  validationSchema: schema,
})

const handleRegister = handleSubmit(() => {
  //TODO handle register user
})

const handleGoToLogin = () => {
  router.push({ name: 'login' })
}
</script>
<template>
  <BasicBox class="pa-5" width="360px">
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
      <LinkButton full-width @click="handleGoToLogin">
        {{ t('already-have-account') }}
      </LinkButton>
    </v-form>
  </BasicBox>
</template>
<i18n>{
  "en": {
    "already-have-account": "Already have account? Sing in!",
    "form": {
      "email": "Email address",
      "password": "Password",
      "rep-password": "Repeat password"
    },
    "sign-up": "Sign up"
  },
  "pl": {
    "already-have-account": "Masz już konto? Zaloguj się!",
    "form": {
      "email": "Adres email",
      "password": "Hasło",
      "rep-password": "Powtórz hasło"
    },
    "sign-up": "Utwórz konto"
  }
}</i18n>
