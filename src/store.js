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
    users: null,
    activeUser: null
  },
  mutations: {
    logIn (state, user) {
      state.activeUser = user.providerData[0]
      // we overwrite uid since we want the unique user one
      state.activeUser.uid = user.uid
    },
    logOut (state) {
      state.activeUser = null
    },
    // Taking all of VuexFire's firebase mutations for ourself
    ...VuexFire.firebaseMutations
  },
  getters: {
    posts: state => state.posts,
    users: state => state.users,
    user: (state) => {
      return (uid) => {
        return state.users.find((user) => user.uid === uid) || {}
      }
    }
  },
  actions: {
    // This will make VuexFire aware of our posts db reference
    setRef: VuexFire.firebaseAction(({
      bindFirebaseRef
    }, {stateProperty, ref}) => {
      bindFirebaseRef(stateProperty, ref)
    }),
    addPost ({ commit, state }, post) {
      let author = state.activeUser.uid
      let postRef = db.collection('posts').doc()
      let userPostsRef = db.collection('users/' + author + '/posts/')

      post.author = author

      // this uses the Firestore API to add our post
      postRef.set(post)
      userPostsRef.doc(postRef.id).set({
        uid: postRef.id
      })
    }
  }
})
