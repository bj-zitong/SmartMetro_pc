import Vue from 'vue'
import ElementUI from 'element-ui'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
import 'element-ui/lib/theme-chalk/index.css'
import './element-variables.scss'
import './style/home.css'
// animate动画库
import 'animate.css'
import App from './App'
import router from './router'
import store from './store'
// 自定义的全局组件
import Notification from '@/components/notification'
// 国际化
import i18n from './lang'
// 全局权限检查
import './permission'
// 全局图标
import './icons'
// 全局 Mock 接口
import './mock'
import api from './api/api'
import http from '../src/api/https'
// //挂载到VUE实例，以便全局使用
Vue.prototype.api = api;
Vue.prototype.http = http;
// import axios from 'axios'
// import {post,fetch,patch,put} from '../src/api/https'
// //定义全局变量
// Vue.prototype.$post=post;
// Vue.prototype.$fetch=fetch;
// Vue.prototype.$patch=patch;
// Vue.prototype.$put=put;
// 全局引入echarts
Vue.use(ElementUI, {
    size: 'medium',
    i18n: (key, value) => i18n.t(key, value)
})
Vue.use(Notification)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: h => h(App)
})



