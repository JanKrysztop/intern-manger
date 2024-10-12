import type { App } from 'vue'
import vuetify from './vuetify'
import router from '../router';
import apiClient from './axios';

export function registerPlugins (app: App) {
  app.use(vuetify)
  app.use(router)
  app.config.globalProperties.$axios = apiClient
}
