// ./src/store.js
// Initialize Vuex and VuexFire with some basic actions
import Vue from 'vue'
import Vuex from 'vuex'
// This is how we interact with Firebase through vuexfire
import * as VuexFire from 'vuexfire'
// To manipulate the data directly in our database
import { backend, db } from '@/firebase'
// To upload and download files
import { upload, deleteFile } from '@/storage.js'

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
    uploads: {}
  },
  mutations: {
    logIn (state, user) {
      console.log(user)
      state.activeUser = user.providerData[0]
      // we overwrite uid since we want the unique user one
      // state.activeUser = user.uid
      state.activeUser.uid = user.uid
      // console.log(state.activeUser)
    },
    logOut (state) { state.activeUser = null },
    updateUploads (state, snapshot) {
      // this is a unique identifier of the file
      // so we use it to register a unique object
      // inside state.uploadProgress
      // state.uploads[snapshot.ref.location.path] = {
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
      return (uid) => {
        return state.users.find((user) => user.uid === uid) || {}
      }
    },
    uploads: state => state.uploads,
    activeUser: state => state.activeUser
  },
  actions: {
    // This will make VuexFire aware of our posts db reference
    setRef: VuexFire.firebaseAction(({
      bindFirebaseRef
    }, {stateProperty, ref}) => {
      bindFirebaseRef(stateProperty, ref)
    }),
    uploadFile ({ commit }, { location, file, callback }) {
      const snapshot = upload(location, file)
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
    deletePost ({ commit }, post) {
      const postRef = db.doc('posts/' + post.id)
      // const postRef = database.get(database.collections.POSTS, post.id)
      const loc = 'users/' + post.author + '/posts/' + post.id
      const userPostRef = db.doc(loc)
      const storageLocation = loc + '/post-content.md'

      postRef.delete()
      userPostRef.delete()
      // backend.delete.post (post.id)
      // backend.delete(database.collections.POSTS_BY_USER, post.id)
      deleteFile(storageLocation)
    },
    uploadPost ({ commit, dispatch, state }, post) {
      const author = state.activeUser.uid
      const postRef = db.collection('posts').doc()
      const userPostsRef = db.collection('users/' + author + '/posts/')
      const postContent = {
        location: 'users/' + author + '/posts/' + postRef.id,
        file: new File(
          [post.content],
          'post-content.md',
          {type: 'text/plain;charset=utf-8'}),
        callback: {
          complete (location) {
            postRef.update({ contentLocation: location })
          }
        }
      }

      dispatch('uploadFile', postContent)

      // Use the Firestore API to add our post
      postRef.set({
        title: post.title,
        author: author
      })
      // Set a reference to this post in our user's document
      userPostsRef.doc(postRef.id).set({
        uid: postRef.id
      })
    }
  }
})
