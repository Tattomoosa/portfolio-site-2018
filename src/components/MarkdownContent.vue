<template>
  <!-- <transition appear tag="div" name="slide-up" mode="in-out"> -->
    <vue-markdown
      class="content"
      :breaks="false"
      :toc="toc"
      :toc-first-level="1"
      :toc-last-level="1"
      :toc-anchor-link="false"
      @rendered="highlight"
      @toc-rendered="tableOfContents"
      :source="content">
      <slot v-if="!content"></slot>
    </vue-markdown>
  <!-- </transition> -->
</template>

<script>
import VueMarkdown from 'vue-markdown'
import highlight from '@/highlighter.js'
import Vue from 'vue'

function getAllRegexMatches (regex, string, captureGroup) {
  captureGroup = captureGroup || null
  let match
  let matches = []
  do {
    match = regex.exec(string)
    if (match && match[captureGroup]) matches.push(match[captureGroup])
  } while (match)
  return matches
}

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
  destroyed () { this.$store.dispatch('updatePostTOC', []) },
  methods: {
    highlight () {
      // if (!this.isLoading) setTimeout(highlight, 1)
      if (!this.isLoading) Vue.nextTick(highlight, 1)
    },
    tableOfContents (tocHTML) {
      // strange bug(?) where vue-markdown re-renders on every state
      // change and loops infinitely, so let's check if our state has toc already
      if (this.$store.state.postTOC.length === 0) {
        let linkRegEx = /href="(.*)"/g
        let textRegEx = /<a href=".*?">(.*?)<\/a>/g
        let linkArray = getAllRegexMatches(linkRegEx, tocHTML, 1)
        let textArray = getAllRegexMatches(textRegEx, tocHTML, 1)
        let tocData = []

        linkArray.forEach((el, i) => tocData.push({ text: textArray[i], link: linkArray[i] }))

        // TODO add these to state to show in sidebar
        this.$store.dispatch('updatePostTOC', tocData)
      }
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
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  border-radius: 3px;
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

.content pre,
.content pre:not(:last-child),
.content pre code {
  word-wrap: none;
  white-space: pre-wrap;
  overflow-x: scroll;
  min-width: 0;
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

@media screen and (max-width: 800px) {
  .post-title-container h1.title.is-1 {
    font-size: 2rem;
  }
  .content h2 {
    font-size: 1.6rem;
  }
  .content p,
  .content li {
    font-size: 1rem;
  }
  .content code {
    font-size: .7rem;
  }
}

</style>
