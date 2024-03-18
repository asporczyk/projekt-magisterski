<script setup lang="ts">
import CenteredModal from '@/components/organisms/CenteredModal/CenteredModal.vue'
import HeadlineS from '@/components/atoms/Typography/HeadlineS.vue'
import { useI18n } from 'vue-i18n'
import ProgressCircular from '@/components/atoms/ProgressCircular/ProgressCircular.vue'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import TextButtonWithIcon from '@/components/atoms/Buttons/TextButtonWithIcon.vue'
import TextBody from '@/components/atoms/Typography/TextBody.vue'
import TextButton from '@/components/atoms/Buttons/TextButton.vue'
import { useQRCode } from '@vueuse/integrations/useQRCode'

interface ShareModalProps {
  token: string | undefined
  isLoading: boolean
  isError: boolean
}

const props = defineProps<ShareModalProps>()

defineEmits<{
  close: []
  refetch: []
}>()

const { t } = useI18n()
const router = useRouter()

let QRCode = ref('')

const url = computed(() => {
  if (props.token) {
    const route = router.resolve({
      name: 'home',
      query: { token: props?.token },
    })

    return new URL(route.href, window.location.origin).href
  }
  return ''
})

watch(url, () => {
  QRCode = useQRCode(url.value)
})

const copyLink = () => {
  navigator.clipboard.writeText(url.value)
}
</script>
<template>
  <CenteredModal @on-close="$emit('close')">
    <template #title>
      <HeadlineS>{{ t('share-medical-data') }}</HeadlineS>
    </template>
    <template #body>
      <ProgressCircular v-if="isLoading" />
      <div v-else-if="isError" class="d-flex flex-column align-center">
        <TextBody>{{ t('link-creation-error') }}</TextBody>
        <TextButton variant="negative" @click="$emit('refetch')">{{
          t('try-again')
        }}</TextButton>
      </div>
      <div v-else-if="url" class="d-flex flex-column align-center">
        <TextBody>{{ t('link-created') }}</TextBody>
        <img :src="QRCode" alt="QR Code" />
        <TextButtonWithIcon
          icon="mdi-content-copy"
          variant="secondary"
          force-text
          @click="copyLink"
        >
          {{ t('copy-link') }}
        </TextButtonWithIcon>
      </div>
    </template>
  </CenteredModal>
</template>
<i18n>
{
  "en": {
    "copy-link": "Copy link",
    "link-created": "Link to share data has been created",
    "link-creation-error": "An error occurred while creating the link",
    "share-medical-data": "Share medical data",
    "try-again": "Try again"
  },
  "pl": {
    "copy-link": "Kopiuj link",
    "link-created": "Link do udostępnienia danych został utworzony",
    "link-creation-error": "Wystąpił błąd podczas tworzenia linku",
    "share-medical-data": "Udostępnij dane medyczne",
    "try-again": "Spróbuj ponownie"
  }
}
</i18n>
