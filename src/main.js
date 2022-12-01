import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'
import '@/icons' // icon
import '@/permission' // permission control

import formatDate from '@/utils/formatDate.js'
Vue.prototype.$formatDate = formatDate

import hasBtnPermission from '@/utils/btn-permission'
Vue.prototype.$hasBP = hasBtnPermission

// mock数据
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

const Base64 = require('js-base64').Base64
Vue.prototype.$getUserInfoByFXBD = function() {
  // 得到上下文对象
  const that = this
  // 从富学宝典中获取用户信息
  new Promise((resolve, reject) => {
    if (window.AndroidJs) {
      // 如果是在富学宝典安卓平台
      const userinfo = window.AndroidJs.shareUserInfo() || '{}'
      const info = JSON.parse(userinfo) || {}
      const data = {
        jobNo: info.jobNo,
        name: info.name,
        device: 'Android'
      }
      resolve(data)
    } else if (window.WTK) {
      // 如果是在富学宝典ios平台,有两种交互方式接口（方式1）
      const userinfo = window.WTK.shareUserInfo() || '{}'
      const info = JSON.parse(userinfo)
      const data = {
        jobNo: info.jobNo,
        name: info.name,
        device: 'IOS'
      }
      alert(info.jobNo)
      resolve(data)
    } else if (window.webkit && window.webkit.messageHandlers) {
      // 如果是在富学宝典ios平台,有两种交互方式接口(方式2)
      window.webkit.messageHandlers.userShare.postMessage(null)
      reject()
    }
  }).then(data => {
    // 拿到用户信息后的操作
    that.$setUserInfo(data)
  }).catch(err => {
    console.log(err)
  })
}
Vue.prototype.$setUserInfo = function(data) {
  // 将用户信息放入到状态管理器的，方便使用时调用
  const store = this.$store
  store.dispatch('index/setName', data.jobNo)
  store.dispatch('index/setRealname', data.name)
  store.dispatch('index/setDevice', data.device)
}

Vue.config.productionTip = false

const vm = new Vue({
  mounted() {
    this.$getUserInfoByFXBD()
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 与ios Application交互接口方式2（配合 window.webkit.messageHandlers.userShare.postMessage(null)使用）
window.userInfo = function(info) {
  // 得到用户信息
  console.log(info)
  const toStr = Base64.decode(info) // ios 中返回的是base64字串，需要进行base64 decode
  const userinfo = JSON.parse(toStr)
  userinfo.device = 'IOS'
  // 拿到用户信息后的操作
  vm.$setUserInfo(userinfo)
}
// 与富学宝典pc端交互接口
window.addEventListener('message', function(e) {
  if (e.data && e.data.code === 200) {
    // 得到用户信息
    const userinfo = {
      jobNo: e.data.userinfo.jobNo,
      name: e.data.userinfo.name,
      device: e.data.userinfo.device
    }
    // 拿到用户信息后的操作
    vm.$setUserInfo(userinfo)
  }
}, false)
