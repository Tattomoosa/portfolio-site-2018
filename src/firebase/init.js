import config from './config'
import * as firebase from 'firebase'
import 'firebase/firestore'

console.log(config.firebase)

firebase.initializeApp(config.firebase)

const db = firebase.firestore()
// db.settings(config.firestore)

const fs = firebase.storage()

export {
  db,
  fs
}
