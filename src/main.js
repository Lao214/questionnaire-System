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

import { nodeSchema } from 'k-form-design'
import 'k-form-design/packages/utils/useComponents'
import KFormDesign from 'k-form-design/packages/use.js'
import 'k-form-design/lib/k-form-design.css'
import  WEditor  from  './components/editor/index'
import formatDate from '@/utils/formatDate.js'
Vue.prototype.$formatDate = formatDate

Vue.use(KFormDesign)

// 添加组件
nodeSchema.addSchemas([
// {
// type: "editorWang", // 表单类型
// label: "编辑器", // 标题文字
// icon: "icon-gallery",
// component: WEditor,
// options: {
//   "height": 300,
//   "placeholder": "请输入",
//   "defaultValue": "",
//   "chinesization": true,
//   "hidden": false,
//   "disabled": false,
//   "showLabel": false,
//   "width": "100%"
// },
// model: "",
// key: "",
// rules: [
//   {
//     required: false,
//     message: "必填项"
//   }
// ]
// }
])

// 添加分组
nodeSchema.addSchemaGroup({
title: "自定义组件",
list: []
})

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
