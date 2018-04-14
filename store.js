// ./src/store.js
// Initialize Vuex and VuexFire with some basic actions
import Vue from 'vue'
import Vuex from 'vuex'
// This is how we interact with Firebase through vuexfire
import * as VuexFire from 'vuexfire'
// To manipulate the data directly in our database
import { db } from '@/firebase.js'

// This tells Vue to use Vuex
Vue.use(Vuex)

// Creating our Vuex store
export default new Vuex.Store({
  strict: true,
  state: {
    // This tells VuexFire we want our data to be an array
    posts: [],
    user: null
  },
  mutations: {
    logIn (state, user) {
      state.user = user.providerData[0]
    },
    logOut (state) {
      state.user = null
    },
    // Taking all of VuexFire's firebase mutations for ourself
    ...VuexFire.firebaseMutations
  },
  getters: {
    posts: state => state.posts
  },
  actions: {
    // This will make VuexFire aware of our posts db reference
    setPostsRef: VuexFire.firebaseAction(({
      bindFirebaseRef
    }, ref) => {
      bindFirebaseRef('posts', ref)
    }),
    addPost ({ commit }, post) {
      // this uses the Firestore API to add our post
      db.collection('posts').add(post)
    }
  }
})
