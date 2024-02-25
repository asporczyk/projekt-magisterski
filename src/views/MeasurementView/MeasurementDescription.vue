<script setup lang="ts">
import TextBody from '@/components/atoms/Typography/TextBody.vue'
import { useI18n } from 'vue-i18n'

defineProps<{
  measurementType: string
}>()

const { t } = useI18n()
</script>
<template>
  <TextBody>
    {{ t(`measurements.descriptions.${measurementType}`) }}
  </TextBody>
</template>
