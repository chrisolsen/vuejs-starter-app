export default class {
  static getToken() {
    return window.localStorage.getItem('authToken')
  }

  static setToken(token) {
    window.localStorage.setItem('authToken', token)
  }

  static clearToken() {
    window.localStorage.clear('authToken')
  }

  static isAuthenticated() {
    const token = this.getToken()
    return token != null && token.length > 0
  }
}
