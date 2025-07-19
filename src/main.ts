import './assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(
  createVuetify({
    icons: {
      defaultSet: 'mdi',
    },
    components,
    directives,
  }),
)

app.mount('#app')
