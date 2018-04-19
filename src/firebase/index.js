// ./src/firebase.js
import { db, storage } from './init.js'
import { login, logOut, setAuthStateChangeHook } from './auth.js'
import backend from './operations'

export {
  db,
  backend,
  storage,
  setAuthStateChangeHook,
  logOut,
  login
}
