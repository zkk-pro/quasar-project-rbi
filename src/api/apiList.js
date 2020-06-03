import http from './http'

// 注册
export function registry(params) {
  return http.get('user/register/commit', { params })
}
// 发送验证码
export function sendCode(params) {
  return http.get('verify/code/send', { params })
}
// 登录
export function login(params) {
  return http.get('user/login/commit', { params })
}
// 挖矿订单
export function orderList(params) {
  return http.get('userNode/order/list', { params })
}
// pos 挖矿 列表
export function getNodeList() {
  return http.get('node/index')
}
// 用户信息
export function getUserInfo() {
  return http.get('userInfo/index')
}
