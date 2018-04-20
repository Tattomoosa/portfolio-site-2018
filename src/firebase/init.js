import config from './config'
import * as firebase from 'firebase'
import 'firebase/firestore'

firebase.initializeApp(config)

const db = firebase.firestore()
const fs = firebase.storage()

export {
  db,
  fs
}
