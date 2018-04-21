<template>
  <div class="application-page">
    <div class="width-constrain">
      <div class="columns box full-height main-window">
        <div class="column is-two-fifths full-height is-paddingless">
          <!-- <input class="input" v-model="post.title" placeholder="Post Title" /> -->
          <!-- <br/> -->
          <textarea
          @keyup="generateTitle"
          class="post-writer-text-area textarea box"
          v-model="post.content"
          placeholder="Post Content"/>
        </div>
        <div class="column is-three-fifths full-height preview-container is-paddingless">
              <div id="post-writer-controls">
                    <div class="field has-addons white-border float-right">
                      <p class="control">
                        <b-dropdown position="is-bottom-left">
                          <button
                            class="button is is-small"
                            slot="trigger"
                            value="ADD IMAGE">
                            <b-icon icon="image" />
                            <span>Files</span>
                          </button>
                          <b-dropdown-item custom class="file-upload-modal">
                            <file-uploader></file-uploader>
                          </b-dropdown-item>
                        </b-dropdown>
                      </p>

                      <p class="control">
                        <button
                          class="button is-small"
                          value="SUBMIT"
                          v-on:click="uploadPost(post)">
                          <b-icon icon="content-save" />
                          <span>Save</span>
                        </button>
                      </p>

                      <p class="control">
                        <button
                          class="button is-small"
                          value="SUBMIT"
                          v-on:click="uploadPost(post)">
                          <b-icon icon="file" />
                          <span>PUBLISH</span>
                        </button>
                      </p>
                </div>
              </div>
          <div class="full-height can-scroll-y md-preview">
            <markdown-content
            :loading="false"
            :postContent="post.content" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import MarkdownContent from './MarkdownContent.vue'
import FileUploader from './FileUploader.vue'

export default {
  name: 'Post-Writer',
  data () {
    return {
      post: {
        title: 'Untitled',
        content: '',
        uploadModal: false
      }
    }
  },
  components: {
    MarkdownContent,
    FileUploader
  },
  methods: {
    // Dispatches the Vuex action which uploads our post
    // using the normal Firestore API
    ...mapActions(['uploadPost']),
    generateTitle () {
      let firstLine = this.post.content.split('\n')[0]
      if (firstLine.slice(0, 2) === '# ' && firstLine.length > 2) this.post.title = firstLine.slice(2)
      else this.post.title = 'Untitled'
    },
    toggleImageUploadModal () {
      this.uploadModal = !this.uploadModal
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
  height: 100%;
  margin: auto;
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
  padding: 20px;
}
.application-page {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  padding: 60px;
  padding-top: 100px;
  box-sizing: border-box;
}
.md-preview {
  padding: 10px 20px;
  padding: 0;
  padding-left: 10px;
  /*
  padding-top: 80px;
  */
}
.md-preview>h1 {
  display: inherit;
}
#post-writer-controls {
  position: absolute;
  /*
  background: white;
  */
  margin-bottom: 0;
  width: 100%;
  word-wrap: break-word;
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
.file-upload-modal {
  width: 500px;
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
