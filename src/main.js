import Vue from 'vue'
import ElementUI from 'element-ui'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
import 'element-ui/lib/theme-chalk/index.css'
import './element-variables.scss'
import './style/home.css'
import './style/style.css'
// animate动画库
import 'animate.css'
import App from './App'
import router from './router'
import store from './store'
// import './utils/flexible'
// import 'lib-flexible'
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
//管理系统
Vue.prototype.PersonnelLocalhosts = "http://192.168.1.100:8001";
//视频
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  ak: 'PqfHQFagf9cB9Un7y46hbLVDCKwYxzDx'
})
// 全局引入echarts
Vue.use(ElementUI, {
    size: 'medium',
    i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: h => h(App)
})



