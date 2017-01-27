var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  port: 3000,
  uri: 'http://dev.leaguesmart.com',
  facebookAppID: '363028790729481',
  apiUrl: 'http://localhost:8888',
})
