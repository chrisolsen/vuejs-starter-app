import axios from 'axios'
import config from "../../config"

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

export class Image {
  static get(name, width = 0, height = 0) {
    const baseUrl = config.getEnv().imageApiUrl
    return `${baseUrl}/your_path/images?name=${name}&w=${width}&h=${height}`
  }
}

export class Account {
    // GET /v1/me
    static getMe() {
        return http("GET", "/me")
    }
}

export class Auth {
  static authenticate(credentials) {
    return http("POST", "/auth", credentials)
  }
}
