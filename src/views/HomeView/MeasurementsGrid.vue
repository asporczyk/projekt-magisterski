<script setup lang="ts">
import Tile from '@/components/molecules/Tile/Tile.vue'
import { useI18n } from 'vue-i18n'
import router from '@/router'
import type { MeasurementItem } from '@/types/MeasurementItem'

defineProps<{ items: MeasurementItem[] }>()

const { t } = useI18n()
</script>
<template>
  <v-container class="fill-height">
    <v-row>
      <Tile
        v-for="item in items"
        :title="t(`measurements.names.${item.name}`)"
        :subtitle="t('click-here')"
        :icon="item.icon"
        :color="item.color"
        @click="
          router.push({ name: 'measurement', params: { type: item.name } })
        "
      />
    </v-row>
  </v-container>
</template>
<i18n>{
  "en": {
    "click-here": "Click here to add measurement and check history."
  },
  "pl": {
    "click-here": "Kliknij tutaj, aby wprowadzić pomiar oraz sprawdzić historię."
  }
}</i18n>
