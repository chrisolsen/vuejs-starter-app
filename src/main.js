// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import axios from 'axios'
import App from './App'

import routes from './routes'
import store from './store'
import Session from './lib/session'
import { Account } from './lib/api'
import config from '../config'

const env = config.getEnv()

// axios config
axios.defaults.baseURL = env.apiUrl
// attach session token to each request
axios.interceptors.request.use(c => {
  if (Session.isAuthenticated()) {
    c.headers.Authorization = `token=${Session.getToken()}`
  }
  return c
})

// load plugins
Vue.use(VueRouter)
Vue.use(Vuex)

// bind routes
const router = new VueRouter({
  routes,
})

const publicRoutes = [
  'root',
  'signIn',
  'hello',
]

// auth
router.beforeEach((to, from, next) => {
  const adminOnly = !publicRoutes.includes(to.name)
  const signedIn = Session.isAuthenticated()
  // ensure auth token exists
  if (adminOnly && !signedIn) {
    next({ name: 'signIn' })
    return
  }

  // ensure current user account data is obtained if
  const state = router.app.$store && router.app.$store.state
  const currentUser = state && state.currentUser
  if (adminOnly && signedIn && !currentUser) {
    Account.getMe()
      .then(user => {
        router.app.$store.commit("currentUser", user)
        next()
      })
    return
  }
  next()
})


/* eslint-disable no-new */
new Vue({
  router,
  store: store(),
  el: '#app',
  template: '<App/>',
  components: { App },
});
