<template>
  <div class="section">
    <div class="container">
      <div class="columns">
      <side-bar></side-bar>
        <div class="column full-width">
          <br/><br/><br/>
            <post-container v-if="thisPost" :post="thisPost"></post-container>
            <br/>
          <comment-writer v-if="thisPost" :post="thisPost" />
          <comment-list v-if="thisPost" :post="thisPost"></comment-list>
        </div>
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
import { backend } from '@/firebase'

export default {
  name: 'PostPage',
  data () {
    return {
      postID: this.$route.params.postID
    }
  },
  computed: {
    ...mapGetters(['post']),
    thisPost () {
      return this.post(this.postID)
    }
  },
  created () {
    // if state doesn't know this post
    if (this.post(this.postID) === undefined) {
      // this.$store.dispatch('setRef', { stateProperty: 'posts', ref: [backend.get.ref.POST(this.postID)] })
      this.$store.dispatch('setRef', { stateProperty: 'posts', ref: backend.get.ref.ALL_POSTS().where('id', '==', this.postID) })
    }
  },
  watch: {
    post () {
      this.thisPost = this.post(this.postID)
    }
    /*
    thisPost () {
      if (!this.thisPost) {
        this.$router.push('/')
      }
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
