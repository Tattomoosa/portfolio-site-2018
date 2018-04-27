import * as VuexFire from 'vuexfire'

export const setRef = VuexFire.firebaseAction(({
  bindFirebaseRef
}, {stateProperty, ref}) => {
  return bindFirebaseRef(stateProperty, ref)
})
