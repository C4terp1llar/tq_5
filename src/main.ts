import '@/app/styles/index.scss'
import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {vuetify} from "@/app/providers/vuetify.ts";

import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(vuetify);

app.mount('#app')
