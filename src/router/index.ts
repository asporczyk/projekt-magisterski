import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing page',
      component: () => import('@/views/LandingPage/LandingPage.vue'),
    },
    // error 404
    {
      path: '/:pathMatch(.*)',
      component: () => import('@/views/NotFoundView/NotFoundView.vue'),
    },
  ],
})

export default router
