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
    // postContent: id => getRef.POST_Content
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
      let postCommentCollectionRef = []
      // let postCommentRefs = []
      // let authorCommentRefs = []
      let comments = []
      if (post.images.length > 0) {
        post.images.forEach((image) => {
          imageRefs.push(getRef.POST_IMAGES_FOLDER({ postID: post.id, authorID: post.author.id }).child(image))
        })
      }
      // we have to pull the corresponding copy of each comment from each user
      // and we need to have this info before deleting it
      postCommentCollectionRef = getRef.ALL_COMMENTS_IN_POST(post.id)
      return postCommentCollectionRef.get().then((snapshot) => {
        snapshot.forEach((doc) => {
          let comment = doc.data()
          // authorCommentRefs.push(getRef.COMMENT_IN_USER(comment))
          // postCommentRefs.push(getRef.COMMENT_IN_POST(comment))
          comments.push(comment)
        })
      }).then(() => Promise.all([
        // postCommentRefs.map(comment => comment.delete()),
        // authorCommentRefs.map(comment => comment.delete()),
        comments.map(comment => backend.delete.comment(comment)),
        imageRefs.map(image => image.delete()),
        getRef.POST(post.id).delete(),
        getRef.POST_IN_USER({ userID: post.author.id, postID: post.id }).delete(),
        getRef.STORAGE(post.contentLocation).delete()
      ])
      ).catch((error) => console.error('Error deleting post', error))
    },
    comment: comment => {
      return Promise.all([
        getRef.COMMENT_IN_USER(comment).delete(),
        getRef.COMMENT_IN_POST(comment).delete()
      ]).catch((error) => console.error('Error deleting comment', error))
    },
    // NEVER use this to delete a tag from a post,
    // this deletes the ENTIRE tag
    tag: tagName => {
      getRef.TAG(tagName).delete()
    }
  },
  add: {
    user: (user, docRef) => {
      return getRef.USER(user.id).set({
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

      let postData = {
        id: postRef.id,
        title: post.title,
        author: post.author,
        images: post.images,
        summary: post.summary,
        published: post.published,
        editedOn: database.timestamp(),
        contentLocation: postContentRef.fullPath
      }

      // if our post object has no published on date, but is published
      // then today is it's published on date
      if (post.publishedOn === undefined && post.published === true) {
        postData.publishedOn = database.timestamp()
      }

      // upload associated storage data first because otherwise posts will try to load before they can
      return postContentRef.put(postContentFile, postContentMetadata).then(() => {
        return Promise.all([
          getRef.ALL_POSTS_BY_USER(authorID).doc(postRef.id).set({ id: postRef.id }),
          postRef.set(postData, { merge: true })
        ]).catch((error) => console.error('Error adding post', error))
      })
    },
    postMetadata: ({ post, meta }) => {
      // tags on post have NOT CHANGED so that we can
      // delete unused tags but we don't do that yet...
      let postRef = getRef.POST(post.id)
      // let tagRefs = []
      /*
      // LATER ON DATA DUPLICATION
      let postInTag = {
        title: post.title,
        summary: post.summary,
        author: post.author,
        publishedOn: post.publishedOn,
        published: post.published
      }
      */
      // let tagsToDelete = (post.meta && typeof post.meta.tags === 'Object') ? post.meta.tags : {}
      let tagsToDelete = {}
      if (post.tags) tagsToDelete = post.tags
      console.log(tagsToDelete)
      // let tagRefsToDelete = []

      // debug
      Object.keys(tagsToDelete).forEach((key) => {
        console.log(key + ' is in post.tags')
      })
      //

      Object.keys(meta.tags).forEach((key) => {
        // tagRefs.push(getRef.POST_IN_TAG({ tagName: key, postID: post.id }))
        if (tagsToDelete.hasOwnProperty(key)) delete tagsToDelete[key]
      })

      // debug
      Object.keys(tagsToDelete).forEach((key) => {
        console.log(key + ' needs to be deleted')
      })
      //

      /*
      Object.keys(tagsToDelete).forEach((key) => {
        tagRefsToDelete.push(getRef.POST_IN_TAG({ tagName: key, postID: post.id }))
      })
      */

      return Promise.all([
        // add post id to each tag document
        Object.keys(meta.tags).map(
          tagName => getRef.ALL_TAGS().doc(tagName).set({
            [post.id]: true
          }, {
            merge: true
          })
        ),
        // delete any post ids from tags the post no longer has
        Object.keys(tagsToDelete).map(tagName => {
          getRef.ALL_TAGS().doc(tagName).set({ [post.id]: database.deleteField() }, { merge: true })
        }),
        // tagRefsToDelete.map(tagRef => tagRef.delete()),
        // tagRefs.map(tagRef => tagRef.set(postInTag)),
        // add the tags to the post itself
        postRef.update({ ...meta })
      ]).catch((error) => console.error('Error adding post metadata', error))
    }
  },
  on: {
    login: (user) => {
      return getRef.USER(user.id).get().then((doc) => {
        return new Promise((resolve, reject) => {
          if (doc.exists) {
            doc.ref.update({ lastLogin: database.timestamp() })
              .then(() => resolve())
              .catch((error) => reject(error))
          } else {
            // create user
            backend.add.user(user, doc.ref)
              .then(() => resolve())
              .catch((error) => reject(error))
          }
        })
      })
    }
  }
}

export default backend
