<script setup lang="ts">
defineProps<{ icon: string; label: string }>()
</script>
<template>
  <v-fab :icon="icon" size="x-large" class="sticky" :aria-label="label" />
</template>
<style scoped>
.sticky {
  position: sticky;
  bottom: 24px;
  align-self: center;
}
</style>
