import config from './config'
import * as firebase from 'firebase'
import 'firebase/firestore'

firebase.initializeApp(config)

const db = firebase.firestore()
const storage = firebase.storage()

export {
  db,
  storage
}
