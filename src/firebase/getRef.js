// This is a list of every valid reference used by the application
import { db, fs } from './init.js'

/*
function documentRef (ref) {
}
*/

export default {
  USER: (userID) => db.doc('users/' + userID),
  POST: (postID) => db.doc('posts/' + postID),
  POST_IN_USER: ({ userID, postID }) => db.doc('users/' + userID + '/posts/' + postID),
  ALL_USERS: () => db.collection('users'),
  ALL_POSTS: () => db.collection('posts/'),
  ALL_POSTS_BY_USER: (userID) => db.collection('users/' + userID + '/posts/'),
  STORAGE: (location) => fs.ref(location),
  POST_CONTENT: ({ postID, authorID }) =>
    fs.ref('users/' + authorID + '/posts/' + postID + '/' + 'post-' + postID + '.md'),
  /*
  POST_STORAGE: ({ postID, authorID }) =>
    fs.ref('users/' + authorID + '/posts/' + postID + '/'),
    */
  POST_IMAGES_FOLDER: ({ postID, authorID }) =>
    fs.ref('users/' + authorID + '/posts/' + postID + '/images')
}
