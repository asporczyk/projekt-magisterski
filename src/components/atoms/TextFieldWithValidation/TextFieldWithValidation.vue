<script setup lang="ts">
import { useField } from 'vee-validate'
import { ref } from 'vue'

const props = defineProps<{
  name: string
  type?: string
  label: string
  loading?: boolean
  unit?: string
}>()

const field = useField(() => props.name, undefined)

const passwordVisible = ref(false)
</script>
<template>
  <v-text-field
    v-if="type === 'password'"
    v-model="field.value.value"
    :name="name"
    :label="label"
    :error-messages="field.errorMessage.value ?? ''"
    :loading="loading ?? false"
    rounded="lg"
    :type="passwordVisible ? 'text' : 'password'"
    :append-inner-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
    @click:append-inner="passwordVisible = !passwordVisible"
  />
  <v-text-field
    v-else
    v-model="field.value.value"
    :name="name"
    :label="label"
    :error-messages="field.errorMessage.value ?? ''"
    :type="type ?? 'text'"
    :loading="loading ?? false"
    rounded="lg"
    :suffix="unit"
    :aria-label="label"
  />
</template>
