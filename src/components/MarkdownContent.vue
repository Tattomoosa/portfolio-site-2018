<template>
  <vue-markdown
    class="content"
    :breaks="false"
    :toc="toc || false"
    @rendered="highlight"
    :source="postContent"></vue-markdown>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import highlight from '@/highlighter.js'

export default {
  name: 'MarkDownContent',
  props: ['postContent', 'toc'],
  computed: {
    isLoading () { return this.postContent === '' }
  },
  components: {
    VueMarkdown
  },
  methods: {
    highlight () {
      if (!this.isLoading) setTimeout(highlight, 1)
    }
  }
}
</script>

<style>
/* .content .token.tag, .content .token.number { */
.content .tag, .content .number {
  display: inline;
  padding: inherit;
  font-size: inherit;
  line-height: inherit;
  text-align: inherit;
  vertical-align: inherit;
  border-radius: inherit;
  font-weight: inherit;
  white-space: inherit;
  background: inherit;
  margin: inherit;
}

.content img {
  display: block;
  color: black;
  background: #eee;
  min-height: 50px;
}

.content {
  width: 100%;
}

</style>
