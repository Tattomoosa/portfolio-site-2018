import database from './database.js'
import getRef from './getRef.js'
import storage from './storage.js'

/*
const waitForAll = async (targets) => {
  targets.forEach((target) => {
    return await target.then()
  })
}
*/

const backend = {
  get: {
    user: id => getRef.USER(id).get(),
    // TODO refactor out 'storage'
    postContent: location => storage.download(location)
  },
  delete: {
    post: post => {
      return Promise.all([
        getRef.POST(post.id).delete(),
        getRef.POST_IN_USER({ userID: post.author, postID: post.id }).delete(),
        getRef.STORAGE(post.contentLocation).delete()
      ]).catch((error) => console.error('Error deleting post', error))
    }
  },
  add: {
    user: (user, docRef) => {
      getRef.USER(user.id).set({
        name: user.displayName,
        email: user.email,
        joined: database.timestamp(),
        lastLogin: database.timestamp(),
        id: user.id
      })
    },
    post: ({ post, authorID }) => {
      let postRef = getRef.ALL_POSTS().doc()
      let postContentRef = getRef.POST_CONTENT({ postID: postRef.id, authorID: authorID })
      let postContentFile = new File([post.content], 'post-content.md', {type: 'text/plain;charset=utf=8'})
      let postContentMetadata = ({ authorID: authorID, postID: postRef.id, title: post.title })

      return Promise.all([
        postContentRef.put(postContentFile, postContentMetadata),
        getRef.ALL_POSTS_BY_USER(authorID).doc().set({ id: postRef.id }),
        postRef.set({
          title: post.title,
          author: authorID,
          id: postRef.id,
          uploaded: database.timestamp(),
          contentLocation: postContentRef.fullPath // refactor this out
        })
      ]).catch((error) => console.error('Error adding post', error))
    }
  },
  on: {
    login: (user) => {
      getRef.USER(user.id).get().then((doc) => {
        if (doc.exists) {
          doc.ref.update({ lastLogin: database.timestamp() })
        } else {
          // create user
          backend.add.user(user, doc.ref)
        }
      })
    }
  }
}

export default backend
