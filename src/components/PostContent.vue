<template>
  <div class="content-min-height">
      <!--
    <markdown-content
      v-if="isLoading"
      :content="post.summary" />
    -->
    <div>
      <b-loading
        :active.sync="isLoading"
        :is-full-page="false" />
    <transition appear name="slide-up" mode="out-in">
      <markdown-content
        v-if="!isLoading"
        :toc="toc"
        :content="postContent" />
    </transition>
    </div>

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
  // props: ['contentLocation', 'toc'],
  props: ['contentLocation', 'toc', 'post'],
  components: {
    MarkdownContent
  },
  computed: {
    // ...mapGetters({ post: 'posts/single' }),
  },
  /*
  watch: {
    'post[postID]': () => {
      let isLoaded = Object.keys(this.post[postID]).length > 0
      // if (this.post[postID]) {
      if (
      ) {
        getPostContent ()
      }
    }
  },
  */
  /*
  watch: {
    contentLocation () {
      console.log('content lcoation changeed')
      this.getPostContent()
    }
  },
  */
  methods: {
    getPostContent () {
      if (this.contentLocation) {
        backend.get.postContent(this.contentLocation)
          .then((postContent) => {
            let newLine = postContent.indexOf('\n')
            // postContent = [postContent.slice(0, newLine), postContent.slice(newLine + 1)]
            // Lop off title since we are writing it above
            postContent = postContent.slice(newLine + 1)
            this.postContent = postContent
            this.isLoading = false
            this.$emit('loaded')
          })
      }
    }
  },
  mounted () { this.getPostContent() }
}
</script>

<style>
.content-min-height {
  min-height: 400px;
}
</style>
