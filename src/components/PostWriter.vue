<template>
  <div class="application-page">
    <div class="level is-mobile box">
      <div class="level-left">
        <h4>{{ post.title }}</h4>
      </div>
      <div class="level-right">
        <button
          class="button is-primary is-small"
          value="SUBMIT"
          v-on:click="uploadPost(post)">
          <b-icon icon="file-document" size="is-small" />
          <span>Submit Post</span>
        </button>
      </div>
    </div>
    <div class="columns box">
      <div class="column is-two-fifths full-height is-paddingless">
        <!-- <input class="input" v-model="post.title" placeholder="Post Title" /> -->
        <!-- <br/> -->
        <textarea
        @keyup="generateTitle"
        class="post-writer-text-area"
        v-model="post.content"
        placeholder="Post Content"/>
      </div>
      <div class="column is-three-fifths full-height can-scroll-y is-paddingless">
        <div class="full-height can-scroll-y md-preview">
      <markdown-content
      :loading="false"
      :postContent="post.content" />
    </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import MarkdownContent from './MarkdownContent.vue'

export default {
  name: 'Post-Writer',
  data () {
    return {
      post: {
        title: '',
        content: ''
      }
    }
  },
  components: {
    MarkdownContent
  },
  methods: {
    // Dispatches the Vuex action which uploads our post
    // using the normal Firestore API
    ...mapActions(['uploadPost']),
    generateTitle () {
      let firstLine = this.post.content.split('\n')[0]
      if (firstLine.slice(0, 2) === '# ') this.post.title = firstLine.slice(2)
      else this.post.title = ''
    }
  }
}
</script>

<style type=css>
.full-height {
  height: 85vh !important;
  width: 100%;
}
.can-scroll-y {
  overflow-y: scroll;
}
textarea.post-writer-text-area {
  width: 100%;
  height: 100%;
  font-family: monospace;
  font-size: .75em;
  box-sizing: border-box;
  resize: none;
  background-color: #fafafa !important;
}
.application-page {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
}
.md-preview {
  padding: 20px;
  border: 1px solid lightgrey;
}
</style>
