import { setRef } from '../sharedMethods.js'
import { backend } from '@/firebase'
// import Vue from 'vue'

const registerIndex = ({ commit, state, dispatch }, { ref, id }) => {
  if (state[id] === undefined) {
    commit('registerIndex', id)
    dispatch('setRef', { stateProperty: id, ref: ref }).then((tag) => {
      // console.log(Object.keys(tag).length === 0, tag)
      if (Object.keys(tag).length === 0) backend.delete.tag(tag.id)
    })
  }
}

const registerIndexCollection = ({ dispatch, state, commit }, type) => {
  let ref
  // console.log(backend.get.ref.ALL_TAGS())
  switch (type) {
    case 'tags':
      ref = backend.get.ref.ALL_TAGS()
      break
    default:
  }
  // console.log(type, ref)
  ref.get()
    .catch((error) => console.log(error))
    .then((querySnapshot) => {
      let indexIDs = []
      querySnapshot.forEach((doc) => {
        indexIDs.push(doc.id)
      })
      indexIDs.forEach((id) => {
        dispatch('registerIndex', { ref: ref.doc(id), id })
      })
      commit('setIndexReady')
    })
}

/*
const setRef = VuexFire.firebaseAction(({
  bindFirebaseRef
}, {stateProperty, ref}) => {
  return bindFirebaseRef(stateProperty, ref)
})
*/

export default {
  setRef,
  registerIndex,
  registerIndexCollection
}
