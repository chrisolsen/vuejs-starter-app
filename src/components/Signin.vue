<template>
  <div id="signin">
    <div class="signin-modal">
      <h2 class="signin-modal-header">Sign In</h2>
      <div class="error" v-if="error">{{error}}</div>
      <div class="signin-modal-content">
        <form class="signin__form" v-show="isReady()">
          <FacebookLogin v-on:click="signinWithFacebook" />
        </form>
        <Spinner :size="26" :color="spinnerColor" v-show="showSpinner()" />
      </div>
    </div>
  </div>
</template>

<script>
import Session from '../lib/session'
import { Auth, Accounts } from '../lib/api'
import Spinner from './common/Spinner'
import FacebookLogin from './common/FacebookLogin'

const STATE_INIT = 0
const STATE_READY = 1
const STATE_SIGNING_IN = 2

export default {
  components: {
    Spinner,
    FacebookLogin,
  },
  data() {
    return {
      spinnerColor: "#000",
      showFacebookButton: false,
      state: STATE_INIT,
    }
  },

  // before showing login screen determine if user has valid facebook session
  created() {
    // Allow for retries in case the facebook library is not yet loaded
    let attemptCount = 0
    const fn = () => {
      if (attemptCount >= 5) {
        return
      }
      if (typeof window.FB === 'undefined' || window.FB == null) {
        attemptCount += 1
        setTimeout(fn, 1000)
        return
      }
      window.FB.getLoginStatus((response) => {
        if (response.status !== 'connected') {
          this.state = STATE_READY
          this.showFacebookButton = true
        } else {
          this.state = STATE_SIGNING_IN
          this.authenticateUser(response.authResponse.userID, response.authResponse.accessToken)
        }
      })
    }
    fn()
  },

  methods: {
    isReady() {
      return this.state === STATE_READY
    },
    showSpinner() {
      return this.state !== STATE_READY
    },
    /**
     * Handle click event of the facebook button
     */
    signinWithFacebook() {
      this.state = STATE_SIGNING_IN
      window.FB.login((response) => {
        if (response.authResponse) {
          const userId = response.authResponse.userID
          const token = response.authResponse.accessToken
          this.authenticateUser(userId, token)
        }
      }, { scope: "email,public_profile" })
    },

    authenticateUser(userId, accessToken) {
      Auth.authenticate(userId, accessToken)
        .then((sessionToken) => {
          Session.setToken(sessionToken)
          this.$router.replace("/")
        }).catch(err => {
          if (err.response.status === 401) {
            // fetch facebook account details
            window.FB.api("/me?fields=name,id,first_name,last_name,email,gender,location,locale,timezone,picture.width(800)", (user) => {
              const profileUrl = user.picture.data.url
              const data = {
                account: {
                  name: user.name,
                  firstName: user.first_name,
                  lastName: user.last_name,
                  email: user.email,
                  gender: user.gender,
                  location: user.location,
                  timezone: user.timezone,
                  locale: user.locale,
                },
                credentials: {
                  providerId: user.id,
                  providerName: "facebook",
                  providerToken: accessToken,
                },
              }

              // create account, sign user in and redirect
              let account = null
              Accounts.create(data)
                .then(a => {
                  account = a
                  return Auth.authenticate(userId, accessToken)
                })
                .then(sessionToken => (
                  Session.setToken(sessionToken)
                ))
                .then(() => (
                  Accounts.setProfileImage(account.key, profileUrl)
                ))
                .then(() => {
                  this.$router.replace("/")
                })
                .catch(msg => {
                  this.$store.commit("message", msg)
                })
            })
            return
          }

          this.state = STATE_READY
          this.error = "Failed to login"
        })
    },
  },
}
</script>

<style lang="scss" scoped>
  @import "../scss/colors";
  #signin {
    /*overlay*/
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .5);
    /*child modal*/
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .signin-modal {
    background: white;
    border: 1px solid #ccc;
    width: 400px;
    border-radius: 2px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .signin-modal-header {
    font-size: 1.2rem;
    color: $primaryTextColor;
    background-color: #fff;
    border-bottom: 1px solid $dividerColor;
    padding: 16px;
    margin: 0;
  }

  .signin-modal-content {
    padding: 50px;
  }

  .signin__form {
    text-align: center;
  }

  input {
    margin-bottom: 10px;
  }
</style>