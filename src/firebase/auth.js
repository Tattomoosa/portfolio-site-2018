import uiConfig from './uiConfig.js'
import firebaseui from 'firebaseui'
import { auth } from 'firebase'
// import database from './database.js'
import backend from './operations.js'

// init
const ui = new firebaseui.auth.AuthUI(auth())

const login = {
  elementId: 'firebaseui-auth',
  start (signInSuccessUrl) {
    let config = {...uiConfig, signInSuccessUrl}
    ui.start('#' + this.elementId, config)
  },
  inProgress: () => ui.isPendingRedirect()
}

const logOut = () => {
  auth().signOut()
}

// this needs to be called with a reference to a Vuex store once the app starts
const setAuthStateChangeHook = (store) => {
  auth().onAuthStateChanged((user) => {
    if (user) {
      // A reference to where the user belongs in our users collection
      // let docRef = db.collection('users').doc(user.uid)
      user.id = user.uid
      backend.on.login(user).then(() => store.dispatch('logIn', user))
    } else {
      store.commit('logOut') // synchronous
    }
  })
}

export { login, logOut, setAuthStateChangeHook }
