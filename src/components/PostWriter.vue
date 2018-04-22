<template>
  <div class="application-page">
    <div v-if="activeUser" class="width-constrain">
      <post-writer-controls
      :imageUploadLocation="post.imageUploadLocation"
      :imageUploadCallback="addImageToPostData"
      :postPublished="post.published"
      @publishPost="localUploadPost(true)"
      @uploadPost="localUploadPost(false)"/>
      <div class="columns box full-height main-window">
        <div class="column is-two-fifths full-height is-paddingless">
          <!-- <input class="input" v-model="post.title" placeholder="Post Title" /> -->
          <!-- <br/> -->
          <textarea
          @keyup="generatePostData"
          class="post-writer-text-area textarea box"
          v-model="post.content"
          placeholder="Post Content"/>
        </div>
        <div class="column is-three-fifths full-height preview-container is-paddingless">
          <div class="full-height can-scroll-y md-preview">
            <markdown-content
            :loading="false"
            :postContent="post.content" />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="level">
      <div class="level-item">
        <b-message type="is-danger" size="is-large" has-icon>
          You must be logged in to use this feature
        </b-message>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import MarkdownContent from './MarkdownContent.vue'
import PostWriterControls from './PostWriterControls.vue'

export default {
  name: 'Post-Writer',
  data () {
    return {
      post: {}
    }
  },
  components: {
    MarkdownContent,
    PostWriterControls
  },
  mounted () {
    this.getPostID()
  },
  beforeDestroy () {
    // this.deletePost(this.post)
  },
  computed: {
    ...mapGetters(['activeUser'])
  },
  watch: {
    activeUser () {
      this.getPostID()
    }
  },
  methods: {
    // Dispatches the Vuex action which uploads our post
    // using the normal Firestore API
    ...mapActions(['uploadPost', 'createPost', 'deletePost']),
    generatePostData () {
      let firstLine = this.post.content.split('\n')[0]
      let summary = '##' + this.post.content.split('##')[1]
      if (firstLine.slice(0, 2) === '# ' && firstLine.length > 2) this.post.title = firstLine.slice(2)
      else this.post.title = ''
      this.post.summary = summary || ''
      // console.log(summary)
    },
    addImageToPostData (file) {
      this.post.images.push(file.name)
    },
    getPostID () {
      if (this.activeUser) {
        this.createPost()
          .then((post) => {
            this.post = post
          })
      }
    },
    localUploadPost (published) {
      published = published || false
      this.post.published = published
      this.uploadPost(this.post)
      if (published) {
        this.getPostID()
      }
    }
  }
}
</script>

<style type=css>
.full-height {
  height: 100%;
  width: 100%;
  margin: 0;
}
.width-constrain {
  max-width: 1344px;
  max-width: 1600px;
  height: 100%;
  margin: auto;
  position: relative;
}
.can-scroll-y {
  overflow-y: scroll;
}
textarea.post-writer-text-area {
  width: 100%;
  height: 100%;
  min-height: 100% !important;
  max-height: 100% !important;
  font-family: monospace;
  font-size: .75em;
  box-sizing: border-box;
  resize: none;
  background-color: #fafafa !important;
  padding: 1rem;
}
.application-page {
  position: absolute;
  width: 100%;
  width: 100vw;
  height: 100vh;
  top: 0;
  bottom: 0;
  padding: 60px;
  padding-top: 100px;
  box-sizing: border-box;
}
.md-preview {
  padding: 10px 20px;
  padding: 0;
  padding-left: 2rem;
  padding-top: .7rem;
}
.md-preview>h1 {
  display: inherit;
}
.preview-container {
  position: relative;
  border-bottom-left-radius: 0;
  /*
  border-bottom: 20px solid white;
  */
}
.float-right {
  float: right;
}
.float-left {
  float: left;
}
.white-border {
  margin: 5px;
  padding: 5px;
  background: white;
  border: 1px solid grey;
  border: 0;
  border-radius: 5px;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
}
.main-window {
  padding: 10px;
}
</style>
