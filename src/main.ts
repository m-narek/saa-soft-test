import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/main.scss'
import { createPinia } from 'pinia'
import clickOutside from './directives/clickOutside'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(clickOutside)

app.mount('#app')
