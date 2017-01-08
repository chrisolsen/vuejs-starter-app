var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  port: 3000,
  uri: 'http://dev.myapp.io',
  facebookAppID: '',
  apiUrl: 'http://localhost:8888',
})
