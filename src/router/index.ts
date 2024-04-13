import { createRouter, createWebHistory } from 'vue-router'
import { useAccountStore } from '@/stores/account'
import { storeToRefs } from 'pinia'

const checkAuthentication = (to: any) => {
  const guestToken = to.query.token
  if (guestToken) {
    localStorage.setItem('guestToken', guestToken)
  }

  const accountStore = useAccountStore()
  const { isUserAuthorized } = storeToRefs(accountStore)

  accountStore.checkTokenValidity()
  if (!isUserAuthorized.value) {
    return { name: 'login' }
  }
}

const checkIsUserAlreadyAuthorized = () => {
  const accountStore = useAccountStore()
  const { isUserAuthorized } = storeToRefs(accountStore)

  accountStore.checkTokenValidity()
  if (isUserAuthorized.value) {
    return { name: 'home' }
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing page',
      component: () => import('@/views/LandingPage/LandingPage.vue'),
      beforeEnter: checkIsUserAlreadyAuthorized,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView/Login.vue'),
      beforeEnter: checkIsUserAlreadyAuthorized,
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView/Register.vue'),
      beforeEnter: checkIsUserAlreadyAuthorized,
    },
    {
      path: '/forgot-password',
      name: 'forgot password',
      component: () => import('@/views/ForgotPasswordView/ForgotPassword.vue'),
      beforeEnter: checkIsUserAlreadyAuthorized,
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/HomeView/Home.vue'),
      beforeEnter: checkAuthentication,
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/SettingsView/Settings.vue'),
      beforeEnter: checkAuthentication,
    },
    {
      path: '/sharing',
      name: 'sharing',
      component: () => import('@/views/SharingView/Sharing.vue'),
      beforeEnter: checkAuthentication,
    },
    {
      path: '/measurement/:type',
      name: 'measurement',
      component: () => import('@/views/MeasurementView/Measurement.vue'),
      beforeEnter: checkAuthentication,
    },
    // error 404
    {
      path: '/:pathMatch(.*)',
      name: 'not found',
      component: () => import('@/views/NotFoundView/NotFound.vue'),
    },
  ],
})

export default router
