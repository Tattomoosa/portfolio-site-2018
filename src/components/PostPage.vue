<template>
  <div class="section">
    <div class="container">
      <div class="columns">
      <side-bar></side-bar>
        <div class="column full-width">
          <br/><br/>
            <post-container v-if="thisPost" :post="thisPost"></post-container>
            <br/>
          <comment-writer />
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
  name: 'PostPage',
  data () {
    return { thisPost: null, postID: this.$route.params.postID }
  },
  computed: {
    ...mapGetters(['post'])
  },
  methods: {
    setThisPost () {
      this.thisPost = this.post(this.postID)
    }
  },
  watch: {
    post () {
      this.setThisPost()
    }
  },
  mounted () {
    this.setThisPost()
  },
  components: {
    PostContainer,
    DeletePost,
    SideBar,
    CommentWriter
  }
}
</script>
