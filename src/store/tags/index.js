import actions from './actions.js'
import Vue from 'vue'

const state = () => {
  return {
    indexReady: false
  }
}

const namespaced = true

const getters = {
  ready: state => state.indexReady,
  listIndexes (state) {
    let list = []
    Object.values(state).map((i) => {
      list.push(i.id)
    })
    return list
  },
  indexIDs: (state) => {
    return (index) => {
      if (state[index]) return Object.keys(state[index])
      else return null
    }
  },
  postsAtIndex: (state, getters, rootState) => {
    return (index) => {
      // returns an object with the actual posts
      // with ids corresponding to each tag
      let posts = {}
      if (state[index]) {
        let keys = Object.keys(state[index])
        keys.forEach((i) => {
          if (rootState.posts[i]) {
            Vue.set(posts, i, rootState.posts[i])
          }
        })
        return posts
      } else return {}
    }
  }
}

const mutations = {
  registerIndex: (state, id) => {
    Vue.set(state, id, {})
  },
  setIndexReady: (state) => {
    state.ready = true
  }
}

export default {
  namespaced,
  state,
  actions,
  getters,
  mutations
}
