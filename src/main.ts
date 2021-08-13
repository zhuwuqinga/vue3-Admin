import { createApp } from 'vue'
import App from './App.vue'
// import { ElButton } from 'element-plus'
import ElementPlus from 'element-plus'
import router from './router'
import { store } from './store'
// 使用element
// import ElementPlus from 'element-plus';
// import 'element-plus/packages/theme-chalk/src/base.scss'
import 'element-plus/lib/theme-chalk/index.css'
// 自定义主题
// import './styles/element-variables.scss'
const app = createApp(App)

app.use(router)
app.use(store)

app.use(ElementPlus).mount('#app')
