import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useJwt } from '@vueuse/integrations/useJwt'

export const useAccountStore = defineStore('account', () => {
  const isUserAuthorized = ref<boolean>(false)

  function loginUser(token: string) {
    localStorage.setItem('token', token)
    isUserAuthorized.value = true
  }

  function logoutUser() {
    localStorage.removeItem('token')
    isUserAuthorized.value = false
  }

  function checkTokenValidity() {
    isUserAuthorized.value = false
    const token = localStorage.getItem('token')
    if (!token) {
      return
    }

    const { payload } = useJwt(token)
    const exp = payload.value?.exp
    const dateTimeNow = Date.now() / 1000
    if (exp! > dateTimeNow) {
      isUserAuthorized.value = true
    }
  }

  return {
    isUserAuthorized,
    loginUser,
    logoutUser,
    checkTokenValidity,
  }
})
