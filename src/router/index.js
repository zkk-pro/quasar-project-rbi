import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

const whiteRoute = ['/login', '/registry']

export default function({ store /* , ssrContext */ }) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, form, next) => {
    if (store.getters.token) {
      if (!whiteRoute.includes(to.path)) {
        next()
      } else {
        next({ path: '/' })
      }
    } else {
      if (whiteRoute.includes(to.path) || to.path === '/') {
        next()
      } else {
        next({ path: '/login' })
      }
    }
  })

  return Router
}