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
  }
}
