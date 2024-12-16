import './assets/main.css'
import Vue3Toastify from "vue3-toastify";
import 'vue3-toastify/dist/index.css';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'

const app = createApp(App)

app.use(Vue3Toastify, {
    autoClose: 3000, // Default auto-close duration (3 seconds)
    position: "top-right", // Position of toasts
});
app.use(router)
app.use(store)
app.mount('#app')
