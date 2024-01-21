<script setup lang="ts">
import CenteredDiv from '@/components/molecules/CenteredDiv/CenteredDiv.vue'
import { useI18n } from 'vue-i18n'
import HeadlineS from '@/components/atoms/Typography/HeadlineS.vue'

const { t } = useI18n()
</script>
<template>
  <CenteredDiv>
    <HeadlineS>{{ t('hello') }}</HeadlineS>
  </CenteredDiv>
</template>
<i18n>{
  "en": {
    "hello": "Hello"
  },
  "pl": {
    "hello": "Witaj"
  }
}</i18n>
