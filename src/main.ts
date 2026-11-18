import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import './style.css'
import { useUiStore } from './stores/uiStore'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

// Inicializar tema respetando preferencia o default oscuro
const uiStore = useUiStore()
uiStore.initTheme()

app.mount('#app')
