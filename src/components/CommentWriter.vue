<template>
  <div class="box">
    <!-- <textarea -->
    <!-- class="textarea box" -->
    <!-- placeholder="What do you think?"/> -->
  <!--
    <textarea
    type="textarea"
    class="comment-textarea"
    placeholder="What do you think?"
    resizable="false" />
    <div class="level">
      <div class="level-left"></div>
      <div class="level-right">
        <button class="button is-success">Submit Comment</button>
      </div>
    </div>
    -->
      <div class="level is-mobile">
        <div class="level-left"></div>
          <textarea
          type="textarea"
          class="comment-textarea"
          placeholder="What do you think?"
          v-model="comment.content"
          resizable="false" />
        <div class="level-right comment-textarea">
          <!-- :disabled="!(comment.content.length > minimumCommentLength)" -->
          <button
          @click="localUploadComment"
          class="button is-outlined comment-textarea">Submit</button>
        </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Vue from 'vue'

export default {
  name: 'CommentWriter',
  data () {
    return {
      minimumCommentLength: 10
    }
  },
  props: ['post'],
  computed: {
    ...mapGetters(['activeUser']),
    comment () {
      return {
        content: '',
        id: '',
        author: {
          name: this.activeUser ? this.activeUser.name : null,
          id: this.activeUser ? this.activeUser.id : null
        },
        post: {
          title: this.$props.post.title,
          id: this.$props.post.id
        }
      }
    }
  },
  watch: {
    activeUser () {
      if (this.activeUser) {
        this.comment.author.name = this.activeUser.name
        this.comment.author.id = this.activeUser.id
      }
    }
  },
  mounted () {
    if (this.activeUser) {
      this.comment.author.name = this.activeUser.name
      this.comment.author.id = this.activeUser.id
      this.comment.post.title = this.$props.post.title
      this.comment.post.id = this.$props.post.id
    }
  },
  methods: {
    localUploadComment () {
      this.uploadComment(this.comment).then(() => {
        // Vue.set(this.comment, 'content', '')
        console.log('made it')
      })
        this.comment.content = ''
    },
    ...mapActions(['uploadComment'])
  }
}
</script>

<style type="css">
textarea.comment-textarea {
  width: 100%;
  height: 80px;
  max-height: 100% !important;
  font-family: monospace;
  font-size: .75em;
  box-sizing: border-box;
  resize: none;
  background-color: #fafafa !important;
  /* border: 1px solid #b5b5b5; */
  padding: 1rem;
  z-index: 1;
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
}
button.comment-textarea {
  height: 80px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left: none;
}
</style>
