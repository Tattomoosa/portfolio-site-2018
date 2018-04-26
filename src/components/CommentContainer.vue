<template>
  <div>
      <span class="p is-size-7">
        {{ comment.author.name }}
      </span>
      <span class="p is-size-7 is-italic has-text-grey-light">
        &mdash;
        {{ time }}
      </span>
    <div class="box comment">
      <b-dropdown v-if="isActiveUser" class="comment-controls is-bottom-left">

        <button
        class="button"
        slot="trigger">
        <b-icon icon="dots-vertical"/>
        </button>

        <b-dropdown-item @click="$emit('delete')">
          <div v-if="isActiveUser">Delete Comment</div>
        </b-dropdown-item>

      </b-dropdown>
      <markdown-content :content="comment.content" :toc="false" />
    </div>
  </div>

</template>

<script>
import MarkdownContent from './MarkdownContent'
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: 'CommentContainer',
  props: ['comment'],
  computed: {
    ...mapGetters(['commentsOnPage', 'activeUser']),
    isActiveUser () {
      return this.activeUser ? this.comment.author.id === this.activeUser.id : false
    },
    time () {
      return this.comment.uploaded ? moment(this.comment.uploaded).fromNow() : ''
    }
  },
  components: {
    MarkdownContent
  }
}
</script>

<style>
.box.comment {
  position: relative;
  padding: 1rem;
  margin-bottom: 1rem;
}
.comment-controls {
  position: absolute;
  right: -.2rem;
  top: 0;
}
.comment-controls button {
  border: none;
  background: none;
  color: lightgrey;
}
</style>
