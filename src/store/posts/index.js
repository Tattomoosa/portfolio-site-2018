import Vue from 'vue'
import actions from './actions.js'

// state is populated as we recieve firebase information
const state = {}
const namespaced = true

const mutations = {
  // seems to work fine without adding
  // property to state beforehand
  registerPost: (state, id) => {
    Vue.set(state, id, {})
  },
  deletePost: (state, post) => {
    Vue.delete(state, post.id)
  }
}

const getters = {
  all: (state) => state,
  single: state => (id) => {
    if (state[id] === undefined) return undefined
    return Object.keys(state[id]).length > 0
      ? state[id]
      : null
  }
  /*
  list: state => ({ type, order, value }) => {
    let posts
    switch (type) {
      case 'with-tag':
        // posts = filterObject(posts, post => post.tags[value] === true)
        break
    }
    console.log(posts)
  }
  */
}

/*
const getCollectionReference = ({ type, value }) => {
  let ref
  switch (type) {
    case 'with-tag':
      ref = backend.get.ref.ALL_POSTS_WITH_TAG(this.value)
      ref = backend.get.ref.TAG(value)

  }
}

const filterObject = (obj, predicate) =>
  Object.keys(obj)
    .filter(key => predicate(obj[key]))
    .reduce((result, key) => (result[key] = obj[key], result), {})
    */

export default {
  namespaced,
  state,
  actions,
  getters,
  mutations
}
