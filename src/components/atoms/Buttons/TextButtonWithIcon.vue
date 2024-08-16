<script setup lang="ts">
import { useDisplay } from 'vuetify'
import { computed } from 'vue'

const { variant } = defineProps<{
  fullWidth?: boolean
  variant?: 'primary' | 'secondary' | 'positive' | 'negative'
  icon: string
  forceText?: boolean
  label: string
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

const { mobile } = useDisplay()
</script>
<template>
  <v-btn
    v-if="!mobile || forceText"
    :max-width="!fullWidth ? '300px' : ''"
    :width="fullWidth ? '100%' : ''"
    rounded="lg"
    :color="color"
    :prepend-icon="icon"
    class="my-2"
    :variant="variant === 'secondary' ? 'tonal' : 'elevated'"
  >
    {{ label }}
  </v-btn>
  <v-btn
    v-else
    :icon="icon"
    rounded="lg"
    density="comfortable"
    :color="
      variant === 'primary'
        ? 'primary'
        : variant === 'positive'
          ? 'green'
          : variant === 'negative'
            ? 'red'
            : ''
    "
    :variant="variant === 'secondary' ? 'tonal' : 'elevated'"
    :aria-label="label"
  />
</template>
