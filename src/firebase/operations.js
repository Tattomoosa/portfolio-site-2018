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
    postContent: location => storage.download(location),
    newID: {
      post: () => getRef.ALL_POSTS().doc().id
    },
    location: {
      postImages: ({ postID, authorID }) => getRef.POST_IMAGES_FOLDER({ postID, authorID }).fullPath
    }
  },
  delete: {
    post: post => {
      // Loads up a reference for every image associated with the post
      let imageRefs = []
      if (post.images.length > 0) {
        post.images.forEach((image) => {
          imageRefs.push(getRef.POST_IMAGES_FOLDER({ postID: post.id, authorID: post.authorID }).child(image))
        })
      }
      return Promise.all([
        imageRefs.map(image => image.delete()),
        getRef.POST(post.id).delete(),
        getRef.POST_IN_USER({ userID: post.authorID, postID: post.id }).delete(),
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
      let postRef = getRef.ALL_POSTS().doc(post.id)
      let postContentRef = getRef.POST_CONTENT({ postID: postRef.id, authorID: post.author.id })
      let postContentFile = new File([post.content], 'post-content.md', {type: 'text/plain;charset=utf=8'})
      let postContentMetadata = ({ authorID: authorID, postID: postRef.id, title: post.title })

      /*
      if (!post.title) return Promise.reject(new Error('Post has no title'))
      if (!post.summary) return Promise.reject(new Error('Post has no summary'))
      */

      // upload associated storage data first because otherwise posts will try to load before they can
      return postContentRef.put(postContentFile, postContentMetadata).then(() => {
        return Promise.all([
          getRef.ALL_POSTS_BY_USER(authorID).doc(postRef.id).set({ id: postRef.id }),
          postRef.set({
            title: post.title,
            author: post.author,
            summary: post.summary,
            id: postRef.id,
            images: post.images,
            published: post.published,
            uploaded: database.timestamp(),
            contentLocation: postContentRef.fullPath // refactor this out?
          })
        ]).catch((error) => console.error('Error adding post', error))
      })
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
