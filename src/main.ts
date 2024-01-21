import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import messages from '@intlify/unplugin-vue-i18n/messages'
import { VueQueryPlugin } from '@tanstack/vue-query'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: localStorage.getItem('theme') ?? 'light',
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  fallbackLocale: 'en',
  locale: navigator.language,
  messages,
})

createApp(App)
  .use(createPinia())
  .use(router)
  .use(vuetify)
  .use(i18n)
  .use(VueQueryPlugin)
  .mount('#app')
