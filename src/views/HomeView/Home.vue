<script setup lang="ts">
import TextButton from '@/components/atoms/Buttons/TextButton.vue'
import { useAccountStore } from '@/stores/account'
import router from '@/router'

const accountStore = useAccountStore()

const handleLogout = () => {
  accountStore.logoutUser()
  router.replace({ name: 'login' })
}
</script>
<template>
  <div>
    <h1>TODO MGR-5 Ekran główny</h1>
    <TextButton @click="handleLogout">Wyloguj</TextButton>
  </div>
</template>
