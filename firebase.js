// ./src/firebase.js
import * as firebase from 'firebase'
import 'firebase/firestore'
import firebaseui from 'firebaseui'

const config = ({
  apiKey: 'AIzaSyAOT6hxIKiHavqeowq3syxVTK3aqFrQFfA',
  authDomain: 'vue-blog-2e5c5.firebaseapp.com',
  databaseURL: 'https://vue-blog-2e5c5.firebaseio.com',
  projectId: 'vue-blog-2e5c5',
  storageBucket: 'vue-blog-2e5c5.appspot.com',
  messagingSenderId: '977095327349'
})

// This is our firebaseui configuration object
const uiConfig = ({
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  tosUrl: '/terms-of-service' // This doesn't exist yet
})

// This must run before any other firebase functions
firebase.initializeApp(config)
let db = firebase.firestore()

let ui = new firebaseui.auth.AuthUI(firebase.auth())
let login = function (elementId) {
  ui.start(elementId, uiConfig)
}

let setAuthStateChangeHook = (store) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      store.commit('logIn', user)
    } else {
      store.commit('logOut')
    }
  })
}

let logOut = () => {
  firebase.auth().signOut()
}

export {
  db,
  setAuthStateChangeHook,
  logOut,
  login
}
