import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

//This code is inspired by the default code provided by vue.
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  //Inspired by https://router.vuejs.org/guide/advanced/scroll-behavior.html
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
  },
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
      path: '/text/:id',
      name: 'text',
      component: () => import('../views/TextView.vue')
    },
    {
      path: '/textsearch',
      name: 'textsearch',
      component: () => import('../views/TextSearchView.vue')
    },
    {
      path: '/imprint',
      name: 'imprint',
      component: () => import('../views/Imprintview.vue')
    }
  ]
})

export default router
