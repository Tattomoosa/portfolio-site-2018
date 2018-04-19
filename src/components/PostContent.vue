<template>
  <div class="container content-min-height">
    <b-loading
      :active.sync="isLoading"
      :is-full-page="false" />
      <!--
    <vue-markdown
      class="content"
      :breaks="false"
      @rendered="highlight"
      :source="postContent"></vue-markdown>
    -->
    <markdown-content
      :postContent="postContent" />
  </div>
</template>

<script>
import { download } from '@/storage.js'
import MarkdownContent from './MarkdownContent.vue'

export default {
  name: 'PostContent',
  data () {
    return {
      postContent: '',
      isLoading: true
    }
  },
  props: ['contentLocation'],
  components: {
    MarkdownContent
  },
  methods: {
    getPostContent () {
      download(this.contentLocation)
        .then((postContent) => {
          this.postContent = postContent
          this.isLoading = false
        })
    }
  },
  mounted () { this.getPostContent() }
}
</script>

<style>
.content-min-height {
  min-height: 100px;
}
</style>
