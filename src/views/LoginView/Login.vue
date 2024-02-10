<script setup lang="ts">
import LoginForm from '@/views/LoginView/LoginForm.vue'
import BasicBox from '@/components/atoms/BasicBox/BasicBox.vue'
import LinkButton from '@/components/atoms/Buttons/LinkButton.vue'
import router from '@/router'
import { useI18n } from 'vue-i18n'
import { useAccountStore } from '@/stores/account'

const { t } = useI18n()
const accountStore = useAccountStore()

const handleGoToRegister = () => {
  router.push({ name: 'register' })
}

const handleLogin = (token: string) => {
  accountStore.loginUser(token)
  router.push({ name: 'home' })
}
</script>
<template>
  <BasicBox class="pa-5" width="360px">
    <LoginForm @login="handleLogin" />
    <LinkButton full-width @click="handleGoToRegister">
      {{ t('sign-up') }}
    </LinkButton>
  </BasicBox>
</template>
<i18n>{
  "en": {
    "sign-up": "Sign up"
  },
  "pl": {
    "sign-up": "Utwórz konto"
  }
}</i18n>
