<script setup lang="ts">
import RegisterForm from '@/views/RegisterView/RegisterForm.vue'
import BasicBox from '@/components/atoms/BasicBox/BasicBox.vue'
import LinkButton from '@/components/atoms/Buttons/LinkButton.vue'
import router from '@/router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const handleGoToLogin = () => {
  router.push({ name: 'login' })
}
</script>
<template>
  <BasicBox class="pa-5" width="360px">
    <RegisterForm @register="handleGoToLogin" />
    <LinkButton full-width @click="handleGoToLogin">
      {{ t('already-have-account') }}
    </LinkButton>
  </BasicBox>
</template>
<i18n>
{
  "en": {
    "already-have-account": "Already have account? Sing in!"
  },
  "pl": {
    "already-have-account": "Masz już konto? Zaloguj się!"
  }
}
</i18n>
