import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

//This code is inspired by the default code provided by vue.
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/gender',
      name: 'gendertool',
      component: () => import('../views/GenderToolView.vue')
    },
    {
      path: '/text',
      name: 'text',
      component: () => import('../views/TextView.vue')
    }
  ]
})

export default router
