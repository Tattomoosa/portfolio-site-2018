// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store.js'
import { db, setAuthStateChangeHook } from './firebase.js'

let postsRef = db.collection('posts')

setAuthStateChangeHook(store)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  // Grabs a reference to our 'posts' collection
  created () {
    // This gets us our collections reference
    this.$store.dispatch('setPostsRef', postsRef)
  },
  router,
  components: { App },
  template: '<App/>'
})
