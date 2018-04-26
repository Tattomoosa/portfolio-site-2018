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
      <div class="level is-mobile is-marginless">
        <div class="level-left"></div>
          <textarea
          type="textarea"
          class="comment-textarea"
          placeholder="What do you think?"
          v-model="content"
          resizable="false" />
        <div class="level-right comment-textarea">
          <!-- :disabled="!(comment.content.length > minimumCommentLength)" -->
          <button
          @click="localUploadComment"
          class="button is-outlined comment-textarea">Submit</button>
        </div>
    </div>
    <p class="p is-size-7 has-text-grey-light">
      <span v-if="content.length > 0" >Markdown Preview:</span>
      <span v-else >Styling with
        <a href="https://daringfireball.net/projects/markdown/basics">
          Markdown
        </a>
        is supported</span>
    </p>
    <markdown-content :content="content" :toc="false" />
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import MarkdownContent from './MarkdownContent'

export default {
  name: 'CommentWriter',
  data () {
    return {
      content: '',
      minimumCommentLength: 10
    }
  },
  props: ['post'],
  computed: {
    ...mapGetters(['activeUser']),
    comment () {
      return {
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
      this.comment.content = this.content
      this.uploadComment(this.comment).then(() => {
        this.content = ''
      })
    },
    ...mapActions(['uploadComment'])
  },
  components: {
    MarkdownContent
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
