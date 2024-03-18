import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n, useI18n } from 'vue-i18n'

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
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'
import { VFab } from 'vuetify/labs/components'

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  fallbackLocale: 'en',
  locale: navigator.language,
  messages,
})

const vuetify = createVuetify({
  locale: {
    adapter: createVueI18nAdapter({ i18n, useI18n }),
  },
  components: {
    ...components,
    VFab,
  },
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

createApp(App)
  .use(createPinia())
  .use(router)
  .use(vuetify)
  .use(i18n)
  .use(VueQueryPlugin)
  .mount('#app')
