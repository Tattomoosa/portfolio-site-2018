// ./src/store.js
// Initialize Vuex and VuexFire with some basic actions
import Vue from 'vue'
import Vuex from 'vuex'
// This is how we interact with Firebase through vuexfire
import * as VuexFire from 'vuexfire'
// To manipulate the data directly in our database
import { backend } from '@/firebase'
// To upload and download files
import storage from '@/firebase/storage.js'

// This tells Vue to use Vuex
Vue.use(Vuex)

// Creating our Vuex store
export default new Vuex.Store({
  strict: true,
  state: {
    // This tells VuexFire we want our data to be an array
    posts: [],
    users: null,
    activeUser: null,
    uploads: {},
    notifications: []
  },
  mutations: {
    notify (state, message) {
      state.notifications.push(message)
    },
    logIn (state, user) {
      state.activeUser = user.providerData[0]
      // we overwrite uid since we want the unique user one
      state.activeUser.id = user.uid
    },
    logOut (state) { state.activeUser = null },
    updateUploads (state, snapshot) {
      // this is a unique identifier of the file
      // so we use it to register a unique object
      // inside state.uploadProgress
      let key = snapshot.ref.location.path
      let data = {
        // here we can put any information from the
        // snapshot that we want to display
        // as it uploads
        file: {
          name: snapshot.task.blob_.data_.name,
          size: snapshot.task.blob_.size(),
          type: snapshot.task.blob_.type()
        },
        link: snapshot.downloadURL,
        status: {
          bytesTransferred: snapshot.bytesTransferred,
          bytesTotal: snapshot.totalBytes,
          progress: snapshot.bytesTransferred / snapshot.totalBytes
        }
      }
      // Vue.set(object, key, data)
      Vue.set(state.uploads, key, data)
    },
    // Taking all of VuexFire's firebase mutations for ourself
    ...VuexFire.firebaseMutations
  },
  getters: {
    posts: state => state.posts,
    users: state => state.users,
    user: state => {
      return (id) => {
        return state.users.find((user) => user.id === id) || {}
      }
    },
    uploads: state => state.uploads,
    activeUser: state => state.activeUser,
    notifications: state => state.notifications
  },
  actions: {
    // This will make VuexFire aware of a database reference
    setRef: VuexFire.firebaseAction(({
      bindFirebaseRef
    }, {stateProperty, ref}) => {
      bindFirebaseRef(stateProperty, ref)
    }),
    notify ({ commit }, message) {
      commit('notify', message)
    },
    uploadFile ({ commit }, { location, file, callback }) {
      const snapshot = storage.upload(location, file)
      const fileLocation = snapshot.ref_.fullPath
      if (!callback) callback = {}
      snapshot.on('state_changed',
        function progress (snapshot) {
          commit('updateUploads', snapshot)
        },
        function error (err) {
          console.error(err)
        },
        function complete () {
          if (typeof callback.complete === 'function') {
            callback.complete(fileLocation)
          }
        })
    },
    deletePost ({ commit, dispatch }, post) {
      backend.delete.post(post).then(() => {
        dispatch('notify', 'post deleted')
      })
    },
    uploadPost ({ commit, dispatch, state }, post) {
      backend.add.post({ post: post, authorID: state.activeUser.id }).then((a) => {
        dispatch('notify', 'post uploaded')
      })
    }
  }
})
