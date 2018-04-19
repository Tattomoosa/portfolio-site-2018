import uiConfig from './uiConfig.js'
import firebaseui from 'firebaseui'
import { auth } from 'firebase'
// import database from './database.js'
import backend from './operations.js'

// init
const ui = new firebaseui.auth.AuthUI(auth())

const login = {
  elementId: 'firebaseui-auth',
  start () { ui.start('#' + this.elementId, uiConfig) },
  inProgress: () => ui.isPendingRedirect()
}

const logOut = () => {
  auth().signOut()
}

const setAuthStateChangeHook = (store) => {
  auth().onAuthStateChanged((user) => {
    if (user) {
      // A reference to where the user belongs in our users collection
      // let docRef = db.collection('users').doc(user.uid)
      // docRef.get().then((doc) => {
      backend.on.login(user)
      store.commit('logIn', user)
    } else {
      store.commit('logOut')
    }
  })
}

export { login, logOut, setAuthStateChangeHook }
