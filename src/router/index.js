import { createRouter, createWebHistory } from 'vue-router'

import UsersPage from '@/pages/UsersPage.vue';
import UsersHistoryPage from '@/pages/UsersHistoryPage.vue';


const routes = [
  {
    path: '/',
    component: UsersPage
  },
  {
    path: '/history',
    component: UsersHistoryPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
