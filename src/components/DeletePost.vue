<template>
  <input
    v-on:click="destroyPost"
    type="button"
    value="DELETE THIS POST" />
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
