// ./src/firebase.js
import * as firebase from 'firebase'
import 'firebase/firestore'

const config = ({
  apiKey: 'AIzaSyAOT6hxIKiHavqeowq3syxVTK3aqFrQFfA',
  authDomain: 'vue-blog-2e5c5.firebaseapp.com',
  databaseURL: 'https://vue-blog-2e5c5.firebaseio.com',
  projectId: 'vue-blog-2e5c5',
  storageBucket: 'vue-blog-2e5c5.appspot.com',
  messagingSenderId: '977095327349'
})

// this must run before any other firebase functions
firebase.initializeApp(config)
let db = firebase.firestore()

export default db
