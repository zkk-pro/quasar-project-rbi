import Cookies from 'js-cookie'

export default function() {
  return {
    token: Cookies.get('token'),
    userinfo: Cookies.get('userinfo') ? JSON.parse(Cookies.get('userinfo')) : {} // 用户信息
  }
}
