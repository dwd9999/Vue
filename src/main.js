// import Vue from 'vue'
import { registerPlugins } from '@/plugins'
// import { useUserStore } from '@/stores/userPiniaStore'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

//Vuetify-dialog
// import VuetifyDialog from 'vuetify-dialog'
// import 'vuetify-dialog/dist/vuetify-dialog.css'

const pinia = createPinia()
const app = createApp(App)
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi', // This is already the default value - only for display purposes
  },
})

// Vue.use(VuetifyDialog, {
//   context: {
//     vuetify
//   }
// })

pinia.use(piniaPluginPersistedstate);
registerPlugins(app)
app.use(pinia).use(router).use(vuetify)

// const userStore = useUserStore()

router.isReady().then(() => {
  app.mount('#app')
})
