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

//Import custom js.
import { IOCContainer } from "./lib/IOCContainer";
import { XSSProtector } from './lib/XSSProtector';
import { StaticTextProvider } from './lib/StaticTextProvider';
import { TextPostProcessor } from './lib/TextPostProcessor';
import { XSSMiddleware } from './lib/XSSMiddleware';
import { SmartDictionaryGenderMiddleware } from './lib/SmartDictionaryGenderMiddleware';
import { SplittingMiddleware } from './lib/SplittingMiddleware'
import { HTMLConversionMiddleware } from './lib/HTMLConversionMiddleware'
import { StaticDictionaryGenderMiddleware } from './lib/StaticDictionaryGenderMiddleware'

//Register IOCContainer elements
const ioc = IOCContainer.instance;

//register the XSSProtector as singelton, implementation can be exchanged here.
ioc.registerSingelton("IXSSProtector", new XSSProtector())
//register the textprovider as transient to dispose it if not needed, future db-connection. 
ioc.registerTransient("ITextProvider", () => { return new StaticTextProvider() })

//Text-Post-Processor to gender text and convert to html.
const tpp = new TextPostProcessor()
tpp.useMiddleware(new XSSMiddleware())
tpp.useMiddleware(new StaticDictionaryGenderMiddleware())
tpp.useMiddleware(new SplittingMiddleware())
tpp.useMiddleware(new SmartDictionaryGenderMiddleware())
tpp.useMiddleware(new HTMLConversionMiddleware())
ioc.registerSingelton("ITextPostProcessor-HTML-Gender", tpp)

//Text-Post-Processor to gender text.
const tppT = new TextPostProcessor()
tppT.useMiddleware(new XSSMiddleware())
tppT.useMiddleware(new StaticDictionaryGenderMiddleware())
tppT.useMiddleware(new SplittingMiddleware())
tppT.useMiddleware(new SmartDictionaryGenderMiddleware())
ioc.registerSingelton("ITextPostProcessor-Raw-Gender", tppT)

//Raw Text-Post-Processor nothing will be gendered but converted to html
const tppRaw = new TextPostProcessor()
tppRaw.useMiddleware(new XSSMiddleware())
tppRaw.useMiddleware(new HTMLConversionMiddleware())
ioc.registerSingelton("ITextPostProcessor-HTML", tppRaw)

//Raw Text-Post-Processor nothing will be gendered
const tppRawT = new TextPostProcessor()
tppRawT.useMiddleware(new XSSMiddleware())
ioc.registerSingelton("ITextPostProcessor-Raw", tppRawT)

// The const for all imports for internationalisation.
export const messages = { de, en, ar }

export const i18n = new createI18n({
  globalInjection: true,
  legacy: false,
  locale: 'de' ,
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