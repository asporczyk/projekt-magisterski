<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import HeadlineXS from '@/components/atoms/Typography/HeadlineXS.vue'
import TextButtonWithIcon from '@/components/atoms/Buttons/TextButtonWithIcon.vue'
import { useAccountStore } from '@/stores/account'
import { storeToRefs } from 'pinia'

const { t } = useI18n()
const accountStore = useAccountStore()
const { isUserAuthorized } = storeToRefs(accountStore)
</script>
<template>
  <v-app-bar>
    <HeadlineXS>{{ t('app-name') }}</HeadlineXS>
    <template #append>
      <TextButtonWithIcon
        v-if="isUserAuthorized"
        icon="mdi-logout"
        variant="negative"
        :label="t('logout')"
        @click="accountStore.logoutUser()"
      />
    </template>
  </v-app-bar>
</template>
<i18n>
  {
    "en": {
      "logout": "Logout"
    },
    "pl": {
      "logout": "Wyloguj"
    }
  }
</i18n>
