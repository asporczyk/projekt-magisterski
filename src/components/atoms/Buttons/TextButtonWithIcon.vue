<script setup lang="ts">
defineProps<{
  fullWidth?: boolean
  variant?: 'primary' | 'secondary' | 'positive' | 'negative'
  icon: string
}>()
</script>
<template>
  <v-btn
    :max-width="!fullWidth ? '300px' : ''"
    :width="fullWidth ? '100%' : ''"
    rounded="lg"
    :color="
      variant === 'primary'
        ? 'primary'
        : variant === 'positive'
        ? 'green'
        : variant === 'negative'
        ? 'red'
        : ''
    "
    :prepend-icon="icon"
    class="my-2"
    :variant="variant === 'secondary' ? 'tonal' : 'elevated'"
  >
    <slot />
  </v-btn>
</template>
