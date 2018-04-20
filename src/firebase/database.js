import collections from './collections.js'
import { db } from './init.js'
import * as firebase from 'firebase'

const validate = {
  collection: () => true
}

const get = (collection, uid) => {
  if (validate.collection(collection)) {
    let docRef = db.collection(collection).doc(uid)
    return docRef.get()
  } else console.error(collection, 'is not a valid collection')
}

// const get2 = (collection, )

const destroy = (collection, uid) => {
  if (validate.collection(collection)) {
    let docRef = db.collection(collection).doc(uid)
    return docRef.delete()
  } else console.error(collection, 'is not a valid collection')
}

export default {
  get,
  delete: destroy,
  timestamp: () => {
    return firebase.firestore.FieldValue.serverTimestamp()
  },
  collections
}
