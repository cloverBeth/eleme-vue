// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import goods from './components/goods/goods'
import ratings from './components/ratings/ratings'
import seller from './components/seller/seller'
import './common/stylus/index.styl'
import Vuex from 'vuex'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    count: 0
  },
  // 添加的商品元素
  addCartEl: {},
  mutations: {
    increment(state) {
      state.count++
    }
  }
})
let routes = [
  { path: '/goods', component: goods },
  { path: '/ratings', component: ratings },
  { path: '/seller', component: seller }
]
// 接着创建路由实例
let router = new VueRouter({
  // ES6缩写语法，相当于routes:routes
  routes,
  linkActiveClass: 'active'
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  data: {
    eventHub: new Vue()
  },
  render: h => h(App)
})
router.push('goods')
