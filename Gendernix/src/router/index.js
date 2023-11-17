import { RouterView, createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { i18n } from '../main'

// This code is inspired by the default code provided by vue and https://lokalise.com/blog/vue-i18n/
const router = createRouter({
  history: createWebHistory(),
  // Inspired by https://router.vuejs.org/guide/advanced/scroll-behavior.html
  scrollBehavior (to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
  },
  routes: [
    {
      path: '/:locale',
      component: RouterView,
      beforeEnter: (to, _from, next) => {
        i18n.global.locale.value = to.params.locale
        return next()
      },
      children: [
        {
          path: '/:locale/home',
          name: 'home',
          alias: '/:locale/',
          component: HomeView
        },
        {
          path: 'gender',
          name: 'gendertool',
          component: () => import('../views/GenderToolView.vue')
        },
        {
          path: 'text/:id',
          name: 'text',
          component: () => import('../views/TextView.vue')
        },
        {
          path: 'textsearch',
          name: 'textsearch',
          component: () => import('../views/TextSearchView.vue')
        },
        {
          path: 'dictionary',
          name: 'dictionary',
          component: () => import('../views/DictionaryView.vue')
        },
        {
          path: 'imprint',
          name: 'imprint',
          component: () => import('../views/Imprintview.vue')
        }
      ]
    }
  ]
})

// Reroute the default to home.
router.beforeEach((to) => {
  if (to.path === '/' || to.path === '') {
    return { name: 'home', params: { locale: i18n.global.locale.value } }
  }
})

export default router
