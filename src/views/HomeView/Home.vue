<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import HeadlineL from '@/components/atoms/Typography/HeadlineL.vue'
import MeasurementsGrid from '@/views/HomeView/MeasurementsGrid.vue'
import { AvailableMeasurements } from '@/const/AvailableMeasurements'
import StickyFloatingButton from '@/components/atoms/Buttons/StickyFloatingButton.vue'
import { ref } from 'vue'
import ShareModal from '@/views/HomeView/ShareModal.vue'
import { useQuery } from '@tanstack/vue-query'
import { postShareData } from '@/api/ShareApi'
import { useAccountStore } from '@/stores/account'
import { storeToRefs } from 'pinia'

const { t } = useI18n()
const accountStore = useAccountStore()
const { isGuest } = storeToRefs(accountStore)

const isOpenShareModal = ref<boolean>(false)

const {
  data,
  isFetching: isShareLinkFetching,
  isError,
  refetch: postShare,
} = useQuery<ShareDto>({
  queryKey: ['postShareData'],
  queryFn: async () => {
    const data: SharePostRequest = {
      minutesToExpire: 30,
      shareSensitiveData: true,
      shareBloodPressureMeasurement: true,
      shareHeartRateMeasurement: true,
      shareTemperatureMeasurement: true,
      shareBloodSugarMeasurement: true,
    }

    return await postShareData(data).then((res) => res.data)
  },
  enabled: false,
})

const handleOpenShare = () => {
  postShare()
  isOpenShareModal.value = true
}
</script>
<template>
  <div class="d-flex flex-column h-100">
    <HeadlineL>{{ isGuest ? t('welcome-guest') : t('welcome') }}</HeadlineL>
    <MeasurementsGrid :items="AvailableMeasurements" />
    <StickyFloatingButton
      v-if="!isGuest"
      icon="mdi-share"
      :label="t('share')"
      @click="handleOpenShare"
    />
    <ShareModal
      v-model="isOpenShareModal"
      :token="data?.token"
      :is-loading="isShareLinkFetching"
      :is-error="isError"
      @close="isOpenShareModal = false"
      @refetch="postShare"
    />
  </div>
</template>
<i18n>
  {
    "en": {
      "welcome": "Hello, how are you feeling today? Enter measurements.",
      "welcome-guest": "Hello, check shared measurements.",
      "share": "Share"
    },
    "pl": {
      "welcome": "Dzień dobry, jak się dziś czujesz? Wprowadź pomiary.",
      "welcome-guest": "Dzień dobry, sprawdź udostępnione pomiary.",
      "share": "Udostępnij"
    }
  }
</i18n>
