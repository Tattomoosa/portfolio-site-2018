<template>
  <button
  @click="destroyPost"
  class="button is-danger is-small">
  <b-icon
    icon="delete"
    size="is-small"
    ></b-icon>
  <span>Delete</span>
  </button>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'DeletePost',
  props: ['post'],
  methods: {
    ...mapActions(['deletePost']),
    destroyPost () {
      this.deletePost(this.post)
    }
  }
}
</script>
