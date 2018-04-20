<template>
  <div class="container">
    <div v-for="post in this.posts" :key="post.id">
      <post-container :post="post" :author="user(post.author)" ></post-container>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
// import Post from './PostContent.vue'
import PostContainer from './PostContainer.vue'
import DeletePost from './DeletePost.vue'

export default {
  name: 'Post-List',
  computed: {
    ...mapGetters(['posts', 'user'])
  },
  components: {
    PostContainer,
    DeletePost
  }
}
</script>
