<template>
  <div @click="$router.push('/post-writer/' + post.id)">
    <!-- <router-link :to="'/post-writer/' + post.id"> -->
      <b-icon
        icon="lead-pencil"
        size="is-small"
        ></b-icon>
      <span>Edit Post</span>
    <!-- </router-link> -->
  </div>
</template>

<script>

export default {
  name: 'EditPost',
  props: ['post'],
  methods: {
    /*
    ...mapActions(['deletePost']),
    destroyPost () {
      this.deletePost(this.post)
    }
    */
  }
}
</script>
