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
const db = firebase.firestore()
const storage = firebase.storage()

const ui = new firebaseui.auth.AuthUI(firebase.auth())
const login = {
  elementId: 'firebaseui-auth',
  start () { ui.start('#' + this.elementId, uiConfig) },
  inProgress: () => ui.isPendingRedirect()
}

const setAuthStateChangeHook = (store) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // A reference to where the user belongs in our users collection
      let docRef = db.collection('users').doc(user.uid)
      docRef.get().then((doc) => {
        // user is not in our collection
        if (!doc.exists) {
          // set the info we can get from out auth provider
          docRef.set({
            name: user.displayName,
            uid: user.uid
          })
        }
      })
      store.commit('logIn', user)
    } else {
      store.commit('logOut')
    }
  })
}

const logOut = () => {
  firebase.auth().signOut()
}

export {
  db,
  storage,
  setAuthStateChangeHook,
  logOut,
  login
}
