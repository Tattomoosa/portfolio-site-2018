import { setRef } from '../sharedMethods.js'
import { backend } from '@/firebase'

const registerIndex = ({ commit, state, dispatch }, { ref, id }) => {
  if (state[id] === undefined) {
    commit('registerIndex', id)
    dispatch('setRef', { stateProperty: id, ref: ref })
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
    .then((querySnapshot) => {
      let indexIDs = []
      querySnapshot.forEach((doc) => {
        indexIDs.push(doc.id)
      })
      indexIDs.forEach((id) => {
        dispatch('registerIndex', { ref: ref.doc(id), id })
      })
      commit('setReady')
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
