import Vuex from 'vuex'

export default function() {
  return new Vuex.Store({
    state: {
      currentUser: null,
      message: null,
    },

    mutations: {
      currentUser(state, user) {
        state.currentUser = user // jshint ignore:line
      },
      message(state, args) {
        state.message = args // jshint ignore:line
      },
    },
  })
}
