<template>
  <div id="app">
    <img src="./assets/logo.png">
    <hello></hello>
  </div>
</template>

<script>
import Hello from './components/Hello';
import config from '../config'

const env = config.getEnv()

export default {
  name: 'app',
  components: {
    Hello,
  },
  mounted() {
    const fbid = env.facebookAppID
    if (!fbid) {
      window.console.error("need to enter facebook app id here")
      return
    }

    window.fbAsyncInit = function fninit() {
      window.FB.init({
        appId: fbid,
        cookie: true,
        xfbml: true,
        version: 'v2.8',
      })
    }

    const setup = function fnsetup(d, s, id) {
      if (d.getElementById(id)) {
        return
      }
      const fjs = d.getElementsByTagName(s)[0]
      const js = d.createElement(s)
      js.id = id
      js.src = "//connect.facebook.net/en_US/sdk.js"
      fjs.parentNode.insertBefore(js, fjs)
    }

    setup(window.document, 'script', 'facebook-jssdk')
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
