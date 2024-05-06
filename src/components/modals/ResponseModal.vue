<script setup lang="ts">
import CenteredModal from '@/components/organisms/CenteredModal/CenteredModal.vue'
import TextButton from '@/components/atoms/Buttons/TextButton.vue'
import { useI18n } from 'vue-i18n'

defineProps<{
  body: string
  title?: string
  variant?: 'positive' | 'negative'
}>()
defineEmits(['on-close'])

const { t } = useI18n()
</script>
<template>
  <CenteredModal
    @on-close="$emit('on-close')"
    maxWidth="500px"
    :aria-label="
      title ?? variant === 'positive'
        ? t('default-success-title')
        : t('default-error-title')
    "
  >
    <template #title>
      <div
        v-if="variant === 'positive'"
        class="d-flex flex-column align-center"
      >
        <v-icon icon="mdi-check-circle-outline" color="green-accent-4" />
        {{ title ?? t('default-success-title') }}
      </div>
      <div
        v-else-if="variant === 'negative'"
        class="d-flex flex-column align-center"
      >
        <v-icon icon="mdi-close-circle-outline" color="red-accent-4" />
        {{ title ?? t('default-error-title') }}
      </div>
      <div v-else class="d-flex flex-column align-center">
        <v-icon icon="mdi-alert-circle-outline" />
        {{ title ?? t('default-info-title') }}
      </div>
    </template>
    <template #body>
      <div class="d-flex flex-column align-center">
        {{ body }}
        <TextButton variant="primary" class="mt-10" @click="$emit('on-close')">
          {{ t('common.ok') }}
        </TextButton>
      </div>
    </template>
  </CenteredModal>
</template>
<i18n>{
  "en": {
    "default-error-title": "Ops! Something went wrong",
    "default-info-title": "Information",
    "default-success-title": "Success"
  },
  "pl": {
    "default-error-title": "Ups! Coś poszło nie tak",
    "default-info-title": "Informacja",
    "default-success-title": "Sukces"
  }
}</i18n>
