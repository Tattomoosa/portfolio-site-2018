<template>
  <!--
  <button
  @click="destroyPost"
  class="button is-danger is-small">
  -->
  <div @click="destroyPost">
  <b-icon
    icon="delete"
    size="is-small"
    ></b-icon>
  <span>Delete Post</span>
  </div>
  <!--
  </button>
  -->
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
