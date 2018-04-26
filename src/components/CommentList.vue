<template>
  <div>
    <h1 class="title is-2">Comments</h1>
    <hr>
    <b-loading :active-sync="isLoading" :is-full-page="false" />
    <div v-if="!isLoading" v-for="comment in comments" :key="comment.id">
    <!--
      <div>
        {{ comment.content }}
      </div>
      <span class="p is-size-7">
        &mdash;
        {{ comment.author.name }}
      </span>
      <span class="p is-size-7 is-italic has-text-grey-light">
        {{ formatTime(comment.uploaded) }}
      </span>
      <button v-if="isActiveUser(comment.author)">Delete Comment</button>
      -->
      <comment-container :comment="comment" @delete="deleteComment(comment)"/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { backend } from '@/firebase'
import CommentContainer from './CommentContainer'

export default {
  name: 'CommentList',
  props: ['post'],
  data () {
    return {
      comments: [],
      isLoading: true
    }
  },
  computed: {
    ...mapGetters(['commentsOnPage'])
  },
  watch: {
    commentsOnPage () {
      // this.comments = this.commentsOnPage.slice(0).reverse()
      this.comments = this.commentsOnPage
    }
  },
  mounted () {
    // get comments through vuexfire
    this.setRef({ stateProperty: 'commentsOnPage', ref: backend.get.ref.ALL_COMMENTS_IN_POST(this.post.id).orderBy('uploaded') })
      .then(() => {
        this.isLoading = false
      })
  },
  destroyed () {
    // remove comment reference from vuexfire
    this.removeRef('commentsOnPage')
  },
  methods: {
    ...mapActions(['setRef', 'removeRef', 'deleteComment'])
  },
  components: {
    CommentContainer
  }
}
</script>
