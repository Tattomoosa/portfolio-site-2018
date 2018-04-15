// ./src/main.js
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store.js'
import { db, setAuthStateChangeHook } from './firebase.js'

setAuthStateChangeHook(store)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  // Grabs a reference to our 'posts' collection
  created () {
    // This gets us our collections reference
    this.$store.dispatch('setRef', {stateProperty: 'posts', ref: db.collection('posts')})
    this.$store.dispatch('setRef', {stateProperty: 'users', ref: db.collection('users')})
  },
  router,
  components: { App },
  template: '<App/>'
})
