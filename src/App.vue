<template>
  <div id="layout">
    <a href="#menu" id="menuLink" class="menu-link">
      <span></span>
    </a>

    <div id="menu">
      <div class="pure-menu">
        <a class="pure-menu-heading" href="#">Company</a>
        <ul class="pure-menu-list">
          <li class="pure-menu-item">
            <router-link :to="{name: 'signIn'}" class="pure-menu-link">Home</router-link>
          </li>
          <li class="pure-menu-item">
            <router-link :to="{name: 'hello'}" class="pure-menu-link">Hello</router-link>
          </li>
        </ul>
      </div>
    </div>

    <div id="main">
      <header class="header">
        <div class="user-photo" v-bind:style="{ backgroundImage: `url(${currentUser.photoUrl})` }" v-if="currentUser.photoUrl" alt="">
      </header>
      <div class="content">
        <Message v-bind:type="flash.type" v-bind:message="flash.message" v-bind:duration="flash.duration" />
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import config from '../config'
import Message from './components/common/Message'

const env = config.getEnv()

export default {
  name: 'app',
  components: {
    Message,
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser || {}
    },

    flash() {
      return this.$store.state.flash || {}
    },
  },

  methods: {
    bindFacebook() {
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

    bindSidebar() {
      const d = window.document
      const layout = d.getElementById('layout')
      const menu = d.getElementById('menu')
      const menuLink = d.getElementById('menuLink')
      const content = d.getElementById('main')

      const toggleClass = (element, className) => {
        const classes = element.className.split(/\s+/)
        const initLength = classes.length

        classes.forEach((cls, i) => {
          if (cls === className) {
            classes.splice(i, 1)
          }
        })

        // The className is not found
        if (initLength === classes.length) {
          classes.push(className);
        }

        element.className = classes.join(' ');
      }

      const toggleAll = e => {
        const active = 'active'
        e.preventDefault();
        toggleClass(layout, active)
        toggleClass(menu, active)
        toggleClass(menuLink, active)
      }

      menuLink.onclick = e => {
        toggleAll(e)
      }

      content.onclick = e => {
        if (menu.className.indexOf('active') !== -1) {
          toggleAll(e)
        }
      }
    },
  },

  mounted() {
    this.bindFacebook()
    this.bindSidebar()
  },
};
</script>

<style>
@import './scss/pure.css';
@import './scss/sidebar.css';
@import './scss/pure_custom.css';
</style>
