import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/dist/vuetify.min.css'

import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'
import { createI18n, useI18n } from 'vue-i18n'

// Your own translation file
import de from './locales/de'
import en from './locales/en'
import ar from './locales/ar'

const messages = { de: de, en: en, ar: ar }

// console.log(languages);
console.log(messages);

const i18n = new createI18n({
    globalInjection: true,
    legacy: false, // Vuetify does not support the legacy mode of vue-i18n
    locale: 'de',
    fallbackLocale: 'en',
    messages
})

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
        text: '#FFFFFF',
    },
}

const vuetify = createVuetify({
    components,
    directives,
    locale: {
        adapter: createVueI18nAdapter({ i18n, useI18n }),
    },
    theme: {
        defaultTheme: 'gendernixMainTheme',
        options: {
            customProperties: true
        },
        themes: {
            gendernixMainTheme,
        },
    }
})

const app = createApp(App)

app.use(router)

app.use(i18n)
app.use(vuetify)

app.mount('#app')

