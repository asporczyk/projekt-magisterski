import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing page',
      component: () => import('@/views/LandingPage/LandingPage.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView/Register.vue'),
    },
    {
      path: '/forgot-password',
      name: 'forgot password',
      component: () => import('@/views/ForgotPasswordView/ForgotPassword.vue'),
    },
    // error 404
    {
      path: '/:pathMatch(.*)',
      component: () => import('@/views/NotFoundView/NotFound.vue'),
    },
  ],
})

export default router
