<script setup lang="ts">
defineProps<{ title: string; subtitle: string; icon: string; color: string }>()
defineEmits<{
  click: []
}>()
</script>
<template>
  <v-col xl="2" lg="3" md="4" sm="6" cols="12">
    <v-card
      width="auto"
      height="120"
      variant="elevated"
      :color="color"
      :prepend-icon="icon"
      :title="title"
      :text="subtitle"
      hover
      @click="$emit('click')"
    />
  </v-col>
</template>
