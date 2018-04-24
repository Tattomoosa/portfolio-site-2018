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
    post: id => getRef.POST(id).get(),
    postContent: location => storage.download(location),
    newID: {
      post: () => getRef.ALL_POSTS().doc().id,
      comment: () => getRef.ALL_COMMENTS().doc().id
    },
    location: {
      postImages: ({ postID, authorID }) => getRef.POST_IMAGES_FOLDER({ postID, authorID }).fullPath
    },
    postComments: (postID) => getRef.ALL_COMMENTS_IN_POST(postID).get()
      .then((querySnapshot) => {
        let docArray = []
        querySnapshot.forEach((doc) => {
          docArray.push(doc.data())
        })
        return Promise.resolve(docArray)
      }),
    ref: getRef
  },
  delete: {
    post: post => {
      // Loads up a reference for every image associated with the post
      let imageRefs = []
      if (post.images.length > 0) {
        post.images.forEach((image) => {
          imageRefs.push(getRef.POST_IMAGES_FOLDER({ postID: post.id, authorID: post.author.id }).child(image))
        })
      }
      return Promise.all([
        imageRefs.map(image => image.delete()),
        getRef.POST(post.id).delete(),
        getRef.POST_IN_USER({ userID: post.author.id, postID: post.id }).delete(),
        getRef.STORAGE(post.contentLocation).delete()
      ]).catch((error) => console.error('Error deleting post', error))
    },
    comment: comment => {
      return Promise.all([
        getRef.COMMENT_IN_USER(comment).delete(),
        getRef.COMMENT_IN_POST(comment).delete(),
      ]).catch((error) => console.error('Error deleting comment', error))
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
    comment: (comment) => {
      comment.id = backend.get.newID.comment()

      return Promise.all([
        getRef.ALL_COMMENTS_IN_POST(comment.post.id).doc(comment.id).set({
          content: comment.content,
          author: comment.author,
          post: comment.post,
          uploaded: database.timestamp(),
          id: comment.id
        }),
        getRef.ALL_COMMENTS_BY_USER(comment.author.id).doc(comment.id).set({
          content: comment.content,
          author: comment.author,
          post: comment.post,
          uploaded: database.timestamp(),
          id: comment.id
        })
      ]).catch((error) => console.error('Error adding comment', error))
    },
    post: ({ post, authorID }) => {
      let postRef = getRef.ALL_POSTS().doc(post.id)
      let postContentRef = getRef.POST_CONTENT({ postID: postRef.id, authorID: post.author.id })
      let postContentFile = new File([post.content], 'post-content.md', {type: 'text/plain;charset=utf=8'})
      let postContentMetadata = ({ authorID: authorID, postID: postRef.id, title: post.title })

      if (post.published) {
        if (!post.title) return Promise.reject(new Error('Post has no title'))
        if (!post.summary) return Promise.reject(new Error('Post has no summary'))
      }

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
