// Imports
import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Vuetify imporst
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/dist/vuetify.min.css'

import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'
import { createI18n, useI18n } from 'vue-i18n'

// Import the translation-files
import de from './locales/de'
import en from './locales/en'
import ar from './locales/ar'

// The const for all imports for internationilasitation.
export const messages = { de, en, ar }

const i18n = new createI18n({
  globalInjection: true,
  legacy: false,
  locale: 'de',
  fallbackLocale: 'en',
  messages
})

// Define a custom theme for vuetify, inspired from https://vuetifyjs.com/en/features/theme/#javascript
const gendernixMainTheme = {
  dark: true,
  colors: {
    background: '#191919',
    surface: '#111111',
    primary: '#191919',
    tertiary: '#666666',
    highlight: '#CCAA66',
    accent: '#CCAA66',
    secondary: '#111111',
    error: '#CCAA66',
    info: '#CCAA66',
    success: '#CCAA66',
    warning: '#CCAA66',
    text: '#FFFFFF'
  }
}

// Consulted documentation for information about how to intecrate vuetify into the vue project: https://vuetifyjs.com/en/getting-started/installation/#using-nuxt-3
const vuetify = createVuetify({
  components,
  directives,
  locale: {
    adapter: createVueI18nAdapter({ i18n, useI18n })
  },
  theme: {
    defaultTheme: 'gendernixMainTheme',
    options: {
      customProperties: true
    },
    themes: {
      gendernixMainTheme
    }
  }
})

// Create the app and add the components, consulted https://vuejs.org/guide/essentials/application.html#the-root-component
const app = createApp(App)

app.use(router)
app.use(i18n)
app.use(vuetify)

app.mount('#app')

export default app
