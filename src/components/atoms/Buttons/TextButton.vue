<script setup lang="ts">
defineProps<{
  fullWidth?: boolean
  variant?: 'primary' | 'secondary' | 'positive'
  loading?: boolean
}>()
</script>
<template>
  <v-btn
    :max-width="!fullWidth ? '300px' : ''"
    :width="fullWidth ? '100%' : ''"
    rounded="lg"
    :color="
      variant === 'primary' ? 'primary' : variant === 'positive' ? 'green' : ''
    "
    class="my-2"
    :variant="variant === 'secondary' ? 'tonal' : 'elevated'"
    :loading="loading"
  >
    <slot />
  </v-btn>
</template>
