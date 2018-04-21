<template>
  <div class="section">
    <div class="container">
      <div class="columns">
      <side-bar></side-bar>
        <div class="column is-two-thirds">
          <div v-for="post in this.posts" :key="post.id">
            <post-container :post="post" :author="user(post.author)" ></post-container>
            <br/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
// import Post from './PostContent.vue'
import PostContainer from './PostContainer.vue'
import DeletePost from './DeletePost.vue'
import SideBar from './SideBar.vue'

export default {
  name: 'Post-List',
  computed: {
    ...mapGetters(['posts', 'user'])
  },
  components: {
    PostContainer,
    DeletePost,
    SideBar
  }
}
</script>
