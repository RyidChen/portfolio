import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// 目前資料只由首頁使用，不需要 Pinia 全域狀態；跨頁共享資料時再引入即可。
app.use(router)

app.mount('#app')
