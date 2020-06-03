import { login, getUserInfo } from 'src/api/apiList'
import Cookies from 'js-cookie'

export default {
  // 登录
  Login({ commit }, params) {
    return new Promise((resolve, reject) => {
      login(params)
        .then(res => {
          commit('setToken', res.data.token)
          Cookies.set('token', res.data.token)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 退出
  Logout({ commit }) {
    Cookies.remove('token')
    commit('logout')
  },
  // 更新用户信息
  UpdateUserInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getUserInfo()
        .then(res => {
          commit('updateUserInfo', res.data)
          Cookies.set('userinfo', res.data)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
