<script setup lang="ts">
import { computed } from 'vue'

const { variant } = defineProps<{
  fullWidth?: boolean
  variant?: 'primary' | 'secondary' | 'positive' | 'negative'
}>()

const color = computed(() => {
  switch (variant) {
    case 'primary':
      return 'primary'
    case 'secondary':
      return ''
    case 'positive':
      return 'green'
    case 'negative':
      return 'red'
  }
})
</script>
<template>
  <v-btn
    :max-width="!fullWidth ? '300px' : ''"
    :width="fullWidth ? '100%' : ''"
    rounded="lg"
    :color="color"
    class="my-2"
    variant="text"
  >
    <slot />
  </v-btn>
</template>
