<template>
  <div class="section">
    <div class="container">
      <div class="columns">
        <div class="column full-width">
          <br/><br/><br/>
          <post-container
          :key="post.id"
          v-if="post"
          @loaded="isLoading = false"
          :post="post" />
          <br/>
          <!-- <comment-writer v-if="post(postID)" :post="post(postID)" /> -->
          <!-- <comment-list v-if="post(postID)" :post="post(postID)"></comment-list> -->
          <comment-writer v-if="!isLoading" :post="post" />
          <comment-list v-if="!isLoading" :post="post" />
        </div>
        <transition name="fade">
          <side-bar :postPage="true" :key="'sidebar'"></side-bar>
        </transition>
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
      isLoading: true
    }
  },
  computed: {
    ...mapGetters({
      postGetter: 'posts/single'
    }),
    postID () {
      return this.$route.params.postID
    },
    post () {
      let post = this.postGetter(this.postID)
      // if state doesn't know this post
      if (post === undefined) {
        // then we go get it
        this.$store.dispatch('posts/registerPost', this.postID)
      }
      return post
    }
  },
  created () {
    /*
    // if state doesn't know this post
    if (this.post(this.postID) === undefined) {
      // then we go get it
      this.$store.dispatch('posts/registerPost', this.postID)
    }
    */
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
