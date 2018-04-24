<template>
  <div class="content-min-height">
    <b-loading
      :active.sync="isLoading"
      :is-full-page="false" />
    <markdown-content
      :toc="toc"
      :postContent="postContent" />
  </div>
</template>

<script>
import { backend } from '@/firebase'
import MarkdownContent from './MarkdownContent.vue'

export default {
  name: 'PostContent',
  data () {
    return {
      postContent: '',
      isLoading: true
      // postIDFromRouter: this.$route.params.postID
    }
  },
  props: ['contentLocation', 'toc'],
  components: {
    MarkdownContent
  },
  methods: {
    getPostContent () {
      backend.get.postContent(this.contentLocation)
        .then((postContent) => {
          let newLine = postContent.indexOf('\n')
          // postContent = [postContent.slice(0, newLine), postContent.slice(newLine + 1)]
          // Lop off title since we are writing it above
          postContent = postContent.slice(newLine + 1)
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
