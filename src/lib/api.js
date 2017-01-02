import axios from 'axios'

// helper to eliminate repeated code
const http = function dohttp(method, url, data) {
  return new Promise((resolve, reject) => {
    axios({ method, url, data }).then(resp => {
        resolve(resp.data)
      })
      .catch(err => {
        reject({ type: "error", message: err })
      })
  })
}

export default {}

export class Account {
    // GET /v1/me
    static getMe() {
        return http("GET", "/me")
    }
}

export class Auth {
  static authenticate(userId, accessToken) {
    return http("POST", "/auth", { userId, accessToken })
  }
}
