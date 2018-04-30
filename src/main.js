// ./src/main.js
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { setAuthStateChangeHook } from '@/firebase'
import Buefy from 'buefy'
// import 'buefy/lib/buefy.css'
import '@mdi/font/css/materialdesignicons.min.css'
import VueClipboard from 'vue-clipboard2'

Vue.use(Buefy)
Vue.use(VueClipboard)

setAuthStateChangeHook(store)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  // Grabs a reference to our 'posts' collection
  created () {
    // This gets us our collections reference
    // this.$store.dispatch('setRef', {stateProperty: 'posts', ref: db.collection('posts').orderBy('uploaded')})
    // this.$store.dispatch('setRef', {stateProperty: 'users', ref: db.collection('users')})
    // this.$store.dispatch('postIndexes', { stateProperty: ''})
    this.$store.dispatch('tags/registerIndexCollection', 'tags')
  },
  router,
  components: { App },
  template: '<App/>'
})
