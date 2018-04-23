<template>
  <div class="section">
    <div class="container">
      <div class="columns">
      <side-bar></side-bar>
        <div class="column full-width">
          <br/><br/>
          <div v-for="post in postsReversed" v-if="post.published" :key="post.id">
            <post-container :onlySummary="true" :post="post"></post-container>
            <router-link :to="'post/' + post.id">
              <br/>
              <a class="title is-4 has-text-info">Read More <b-icon icon="arrow-right" /></a>
            </router-link>
            <br/><br/>
              <p class="has-text is-italic">This post has 0 comments</p>
            <div class="space"></div>
            <div class="line"></div>
            <div class="space is-large"></div>
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
import CommentWriter from './CommentWriter.vue'

export default {
  name: 'Post-List',
  data () {
    return {
      postsReversed: []
    }
  },
  computed: {
    ...mapGetters(['posts', 'user'])
  },
  watch: {
    posts () {
      this.reversePosts()
    }
  },
  mounted () {
    this.reversePosts()
  },
  methods: {
    reversePosts () {
      this.postsReversed = this.posts.slice(0).reverse()
    }
  },
  components: {
    PostContainer,
    DeletePost,
    SideBar,
    CommentWriter
  }
}
</script>
