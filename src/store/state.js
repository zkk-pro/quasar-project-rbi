import Cookies from 'js-cookie'

export default function() {
  return {
    token: Cookies.get('token')
  }
}
