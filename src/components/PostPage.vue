<template>
  <div class="section">
    <div class="container">
      <div class="columns">
        <transition name="fade" mode="out-in">
        <div class="column full-width">
          <br/><br/><br/>
          <post-container
          v-if="post(postID)"
          @loaded="isLoading = false"
          :post="post(postID)" />
          <br/>
          <!-- <comment-writer v-if="post(postID)" :post="post(postID)" /> -->
          <!-- <comment-list v-if="post(postID)" :post="post(postID)"></comment-list> -->
          <comment-writer v-if="!isLoading" :post="post(postID)" />
          <comment-list v-if="!isLoading" :post="post(postID)" />
        </div>
        </transition>
        <side-bar :postPage="true"></side-bar>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import PostContainer from './PostContainer.vue'
import DeletePost from './DeletePost.vue'
import SideBar from './SideBar.vue'
import CommentWriter from './CommentWriter.vue'
import CommentList from './CommentList.vue'

export default {
  name: 'PostPage',
  data () {
    return {
      postID: this.$route.params.postID,
      isLoading: true
    }
  },
  computed: {
    ...mapGetters({
      post: 'posts/single'
    })
  },
  created () {
    // if state doesn't know this post
    if (this.post(this.postID) === undefined) {
      // then we go get it
      this.$store.dispatch('posts/registerPost', this.postID)
    }
  },
  components: {
    PostContainer,
    DeletePost,
    SideBar,
    CommentWriter,
    CommentList
  }
}
</script>
