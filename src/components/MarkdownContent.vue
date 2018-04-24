<template>
  <vue-markdown
    class="content"
    :breaks="false"
    :toc="toc"
    toc-id="#sidebar-toc"
    @rendered="highlight"
    @toc-rendered="tableOfContents"
    :source="content">
    <slot v-if="!content"></slot>
  </vue-markdown>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import highlight from '@/highlighter.js'
import Vue from 'vue'

export default {
  name: 'MarkDownContent',
  props: [
    'content',
    'toc'
  ],
  computed: {
    isLoading () { return this.content === '' }
  },
  components: {
    VueMarkdown
  },
  activated () { this.highlight() },
  methods: {
    highlight () {
      // if (!this.isLoading) setTimeout(highlight, 1)
      if (!this.isLoading) Vue.nextTick(highlight, 1)
    },
    tableOfContents (foo) {
      console.log('made it', foo)
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

.content p, .content li {
  line-height: 1.7;
  font-size: 1.25rem;
  color: #262626;
}

.content h1 {
  font-weight: bold;
  font-size: 2.6em;
}

.content h2 {
  font-size: 2.2rem;
  font-weight: bold;
  position: relative;
  margin-bottom: 1rem;
  box-sizing: border-box;
}
/*
.content h2:after {
  content: '';
  width: 100%;
  display: block;
  position: absolute;
  bottom: 10px;
  left: 0;
  height: .55px;
  background: #333;
}
*/

.content pre, .content pre:not(:last-child) {
  word-wrap: normal;
  margin: 2rem 0;
}

.content img {
  width: 100%;
}

/*
.content h1,h2,h3,h4,h5,h6,p {
  width: 80%;
  margin: auto;
}
*/


</style>
