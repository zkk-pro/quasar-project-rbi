export default {
  // 保存token
  setToken(state, token) {
    state.token = token
  },
  // 退出
  logout(state) {
    state.token = ''
  },
  // 更新用户信息
  updateUserInfo(state, userinfo) {
    state.userinfo = userinfo
  },
  // 改变语言
  changeLanguage(state, language) {
    state.language = language
  },
  // 设置用户信息
  setUserInfo(state, userinfo) {
    state.userinfo = userinfo
  }
}
