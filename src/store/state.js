import Cookies from 'js-cookie'

export default function() {
  return {
    language: Cookies.get('lang') || 'zh-CN',
    token: Cookies.get('token') || '',
    userinfo: Cookies.get('userinfo') ? JSON.parse(Cookies.get('userinfo')) : {} // 用户信息
  }
}
