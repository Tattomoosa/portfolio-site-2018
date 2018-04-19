import database from './database.js'

const backend = {
  get: {
    user: ({ uid }) => {
      return database.get(database.collections.USERS, uid)
    },
  },
  delete: {
    post: (uid) => {
      database
        .delete(database.collections.POSTS, uid)
        .then((response) => {
          console.log(response)
        })
    }
  },
  add: {
    user: (user, ref) => {
      // set the info we can get from out auth provider
      // and some times
      doc.ref.set({
        name: user.displayName,
        email: user.email,
        joined: database.timestamp(),
        lastLogin: database.timestamp(),
        uid: user.uid
      })
    }
  },
  on: {
    login: (user) => {
      backend.get.user(user).then((doc) => {
        if (doc.exists) {
          doc.ref.update({ lastLogin: database.timestamp() })
        // user doesn't exist - create user
        } else {
          backend.add.user(user, doc.ref)
        }
      })
    }
  }
}

export default backend
