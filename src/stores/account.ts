import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useJwt } from '@vueuse/integrations/useJwt'
import router from '@/router'

export const useAccountStore = defineStore('account', () => {
  const isUserAuthorized = ref<boolean>(false)
  const isGuest = ref<boolean>(false)

  function loginUser(newToken: string) {
    localStorage.setItem('token', newToken)
    isUserAuthorized.value = true
  }

  function logoutUser() {
    localStorage.removeItem('token')
    localStorage.removeItem('guestToken')
    isUserAuthorized.value = false
    router.replace({ name: 'login' })
  }

  function checkTokenValidity() {
    isUserAuthorized.value = false
    const token = localStorage.getItem('token')
    const guestToken = localStorage.getItem('guestToken')
    const savedToken = guestToken || token

    if (!savedToken) {
      return
    }

    const { payload } = useJwt(savedToken)
    const exp = payload.value?.exp
    const dateTimeNow = Date.now() / 1000
    if (exp! > dateTimeNow) {
      isUserAuthorized.value = true
    }

    if (guestToken) {
      isGuest.value = true
    }
  }

  return {
    isUserAuthorized,
    isGuest,
    loginUser,
    logoutUser,
    checkTokenValidity,
  }
})
