import { setRef } from '../sharedMethods.js'
import { backend } from '@/firebase'

const registerPost = ({ commit, state, dispatch }, id) => {
  if (state[id] === undefined) {
    commit('registerPost', id)
    dispatch('setRef', { stateProperty: id, ref: backend.get.ref.POST(id) })
  }
}

const registerPostCollection = ({ dispatch, state }) => {
  // temp to just grab our ids...
  let ref = backend.get.ref.ALL_POSTS()
  ref.get()
    .then((querySnapshot) => {
      let postIDs = []
      querySnapshot.forEach((doc) => {
        postIDs.push(doc.id)
        // console.log(doc)
      })
      return postIDs
      // end of temp code
    }).then((postIDs) => {
      postIDs.forEach((id) => {
        dispatch('registerPost', id)
      })
      return Promise.resolve()
    })
}

const registerPostIDArray = ({ dispatch, state }, ids) => {
  ids.forEach((id) => {
    dispatch('registerPost', id)
  })
}

const deletePost = ({ commit, dispatch }, post) => {
  backend.delete.post(post).then(() => {
    commit('deletePost', post)
    dispatch('notify', 'Deleted "' + post.title + '"', { root: true })
  })
}

export default {
  setRef,
  deletePost,
  registerPostCollection,
  registerPost,
  registerPostIDArray
}
