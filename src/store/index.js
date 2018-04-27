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

import posts from './posts'
import tags from './tags'

// This tells Vue to use Vuex
Vue.use(Vuex)

// Creating our Vuex store
export default new Vuex.Store({
  strict: true,
  state: {
    // This tells VuexFire we want our data to be an array
    // posts: [],
    users: null,
    activeUser: null,
    uploads: {},
    notifications: [],
    commentsOnPage: [],
    postTOC: []
    // allTags: {}
  },
  modules: {
    posts,
    tags
  },
  mutations: {
    addNotification (state, { message, color }) {
      state.notifications.push({ message, color })
    },
    dismissNotification (state) {
      if (state.notifications.length > 0) state.notifications.shift()
    },
    logIn (state, user) {
      // state.activeUser = user.providerData[0]
      // we overwrite uid since we want the unique user one
      // state.activeUser.id = user.uid
      state.activeUser = user
    },
    logOut (state) { state.activeUser = null },
    updatePostTOC (state, toc) {
      // console.log(toc)
      state.postTOC = toc
    },
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
    // posts: state => state.posts,
    users: state => state.users,
    // tags: state => state.tags,
    /*
    post: state => {
      return (id) => state.posts.find((post) => post.id === id || null)
    },
    */
    /*
    user: state => {
      return (id) => {
        console.log('searching for user with id:', id)
        let user = state.users.find((user) => user.id === id || null)
        console.log(user)
        return user || {}
      }
    },
    */
    commentsOnPage: state => state.commentsOnPage,
    uploads: state => state.uploads,
    activeUser: state => state.activeUser,
    notifications: state => state.notifications,
    postTOC: state => state.postTOC
  },
  actions: {
    // This will make VuexFire aware of a database reference
    setRef: VuexFire.firebaseAction(({
      bindFirebaseRef
    }, {stateProperty, ref}) => {
      return bindFirebaseRef(stateProperty, ref)
    }),
    removeRef: VuexFire.firebaseAction(({
      unbindFirebaseRef
    }, stateProperty) => {
      unbindFirebaseRef(stateProperty)
    }),
    updatePostTOC ({ commit }, toc) {
      commit('updatePostTOC', toc)
    },
    logIn ({ commit }, authUser) {
      backend.get.user(authUser.id).then((userDoc) => {
        commit('logIn', userDoc.data())
      })
    },
    notify ({ commit }, { message, color }) {
      // yuck get rid of this
      if (!message) { message = arguments[1]; color = 'is-success' }
      commit('addNotification', { message, color })
    },
    dismissNotification ({ commit }, message) {
      commit('dismissNotification')
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
      return file
    },
    deletePost ({ commit, dispatch }, post) {
      backend.delete.post(post).then(() => {
        dispatch('notify', 'Deleted "' + post.title + '"')
      })
    },
    deleteComment ({ dispatch }, comment) {
      backend.delete.comment(comment).then(() => {
        dispatch('notify', 'Deleted comment')
      })
    },
    uploadComment ({ commit, dispatch, state }, comment) {
      if (!state.activeUser) {
        // TODO make this an alert
        dispatch('notify', {
          message: 'GOTTA LOG IN BRAH',
          color: 'is-danger'
        })
        return Promise.reject(new Error('Not Logged In'))
      }
      backend.add.comment(comment).then(() => {
        dispatch('notify', 'Comment Added')
        return Promise.resolve()
      })
    },
    uploadPost ({ commit, dispatch, state }, { post, message }) {
      if (post.published) {
        if (!post.title) {
          dispatch('notify', {
            message: 'CANNOT PUBLISH: Post has no title',
            color: 'is-danger'
          })
          post.published = false
        }
        if (!post.summary) {
          dispatch('notify', {
            message: 'CANNOT PUBLISH: Post has no content',
            color: 'is-danger'
          })
          post.published = false
        }
      }
      return backend.add.post({ post: post, authorID: state.activeUser.id }).then(() => {
        dispatch('notify', message)
        return Promise.resolve()
      })
    },
    uploadPostMetadata ({ dispatch }, { post, meta }) {
      return backend.add.postMetadata({ post, meta }).then(() => {
        dispatch('notify', 'Metadata Updated')
      })
    },
    createPost ({ state }) {
      let id = backend.get.newID.post()
      let author = state.activeUser
      return {
        id,
        author: {
          id: author.id,
          name: author.name
        },
        authorID: author.id,
        title: '',
        content: '',
        summary: '',
        published: false,
        images: [],
        imageUploadLocation: backend.get.location.postImages({ postID: id, authorID: author.id })
      }
    }
  }
})
