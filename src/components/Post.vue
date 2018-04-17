<template>
  <div>
    <vue-markdown
      :source="postContent">
    </vue-markdown>
  </div>
</template>

<script>
import { download } from '@/storage.js'
import VueMarkdown from 'vue-markdown'

export default {
  name: 'Post',
  data () {
    return {
      postContent: 'loading...'
    }
  },
  props: ['contentLocation'],
  components: {
    VueMarkdown
  },
  methods: {
    getPostContent () {
      download(this.contentLocation)
        .then((postContent) => (this.postContent = postContent))
    }
  },
  mounted () { this.getPostContent() }
}
</script>
