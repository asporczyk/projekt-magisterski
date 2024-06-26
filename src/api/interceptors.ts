import axios from 'axios'
import router from '@/router'
import { useAccountStore } from '@/stores/account'
import { storeToRefs } from 'pinia'

const BASE_URL = 'https://safemed-api.azurewebsites.net/api'

const accountStore = useAccountStore()
const { isUserAuthorized } = storeToRefs(accountStore)

export const instanceWithToken = axios.create({
  baseURL: BASE_URL,
})

instanceWithToken.interceptors.request.use((config) => {
  accountStore.checkTokenValidity()
  if (isUserAuthorized.value) {
    const savedToken =
      localStorage.getItem('guestToken') || localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${savedToken}`

    return config
  }
  router.replace({ name: 'login' })

  return config
})
