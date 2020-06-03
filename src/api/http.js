import Axios from 'axios'
import { Notify } from 'quasar'
import store from 'src/store'
// import router from 'src/router'

const request = Axios.create({
  baseURL: process.env.API,
  timeout: 15 * 1000
})

request.interceptors.request.use(
  config => {
    if (config.data) {
      config.data = { data: config.data }
    } else {
      config.params = { data: config.params }
    }
    config.headers.token = store().getters.token || ''
    return config
  },
  err => {
    console.log(err)
  }
)

request.interceptors.response.use(
  res => {
    const { data } = res
    if (data.code === 0) {
      return data
    } else if (data.code === 401) {
      // 未登录/会话过期拦截
      Notify.create({
        message: data.message
      })
      setTimeout(() => {
        store().dispatch('Logout')
        location.reload()
      }, 1500)
    } else if (data.code === 10000) {
      Notify.create({
        textColor: 'red',
        message: data.message
      })
      return Promise.reject(data)
    }
  },
  err => {
    return Promise.reject(err)
  }
)

export default request
