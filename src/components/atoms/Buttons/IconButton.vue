<script setup lang="ts">
defineProps<{ icon: string; label: string }>()
</script>
<template>
  <v-btn :icon="icon" variant="plain" :ripple="false" :aria-label="label" />
</template>
