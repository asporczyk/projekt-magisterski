<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import HeadlineXL from '@/components/atoms/Typography/HeadlineXL.vue'
import HeadlineS from '@/components/atoms/Typography/HeadlineS.vue'
import CenteredDiv from '@/components/molecules/CenteredDiv/CenteredDiv.vue'
import { useDisplay } from 'vuetify'
import HeadlineL from '@/components/atoms/Typography/HeadlineL.vue'

const { t } = useI18n()
const { mobile } = useDisplay()
</script>
<template>
  <CenteredDiv>
    <v-icon icon="mdi-emoticon-sad-outline" size="150px" color="error" />
    <HeadlineXL v-if="!mobile">{{ t('error-404') }}</HeadlineXL>
    <HeadlineL v-else>{{ t('error-404') }}</HeadlineL>
    <HeadlineS>{{ t('not-found') }}</HeadlineS>
  </CenteredDiv>
</template>
<i18n>{
  "en": {
    "error-404": "404",
    "not-found": "Not found"
  },
  "pl": {
    "error-404": "Błąd 404",
    "not-found": "Nie znaleziono"
  }
}</i18n>
