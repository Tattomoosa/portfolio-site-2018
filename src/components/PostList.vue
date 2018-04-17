<template>
  <div>
    <div v-for="(post, index) in this.posts" :key="index">
      <h1>{{ post.title }}</h1>
      <h4>By: {{ user(post.author).name }}</h4>
      <post :contentLocation="post.contentLocation"></post>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Post from './Post.vue'

export default {
  name: 'Post-List',
  // this is communicating with Firebase behind the scenes
  computed: {
    ...mapGetters(['posts', 'user'])
  },
  components: {
    Post
  }
}
</script>
