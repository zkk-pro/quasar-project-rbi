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
// 订单详情
export function getOrderDetail(params) {
  return http.get('userNode/order/detail', { params })
}
// 解锁
export function unlockAsk(params) {
  return http.get('userNode/order/unlockAsk', { params })
}
// 解锁
export function unlock(params) {
  return http.get('userNode/order/unlock', { params })
}
// pos 挖矿 列表
export function getNodeList() {
  return http.get('node/index')
}
// 用户信息
export function getUserInfo() {
  return http.get('userInfo/index')
}
// 首页
export function getIndexInfo() {
  return http.get('index/index')
}
// 安全验证
export function validate() {
  return http.get('userInfo/captcha')
}
// 节点购买
export function nodeBuy(params) {
  return http.get('userNode/order/add', { params })
}
// 总资产、交易记录、收益明细
export function getAssets(params) {
  return http.get('asset/logs', { params })
}
// 设置PIN
export function setPIN(params) {
  return http.get('userInfo/updatePIN', { params })
}
// 提币
export function withdraw(params) {
  return http.get('withdraw/add', { params })
}
