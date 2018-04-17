<template>
  <div>
    <div v-for="post in this.posts" :key="post.id">
      <h1>{{ post.title }}</h1>
      <h4>By: {{ user(post.author).name }}</h4>
      <post :contentLocation="post.contentLocation"></post>
      <delete-post :post="post"></delete-post>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Post from './Post.vue'
import DeletePost from './DeletePost.vue'

export default {
  name: 'Post-List',
  // this is communicating with Firebase behind the scenes
  computed: {
    ...mapGetters(['posts', 'user'])
  },
  components: {
    Post,
    DeletePost
  }
}
</script>
