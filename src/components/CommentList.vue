<template>
  <div>
    <h1 class="title is-2">Comments</h1>
    <hr>
    <div v-for="comment in comments" :key="comment.id">
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
      <!-- {{ moment(comment.uploaded).fromNow() }} -->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { backend } from '@/firebase'
import moment from 'moment'

export default {
  name: 'CommentList',
  props: ['post'],
  data () {
    return {
      comments: []
    }
  },
  computed: {
    ...mapGetters(['commentsOnPage'])
  },
  watch: {
    commentsOnPage () {
      this.comments = this.commentsOnPage.slice(0).reverse()
    }
  },
  mounted () {
    this.setRef({ stateProperty: 'commentsOnPage', ref: backend.get.ref.ALL_COMMENTS_IN_POST(this.post.id).orderBy('uploaded') })
  },
  methods: {
    ...mapActions(['setRef']),
    formatTime (time) {
      return time ? moment(time).fromNow() : ''
    }
  }
}
</script>
