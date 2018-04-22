<template>
  <div id="post-writer-controls">
    <div class="field has-addons white-border float-right">
      <p class="control">
        <b-dropdown position="is-bottom-left">
          <button
          class="button is is-small"
          slot="trigger"
          value="ADD IMAGE">
          <b-icon icon="image" custom-size="mdi-18px" />
          <span>Files</span>
          </button>
          <b-dropdown-item custom class="file-upload-modal">
            <file-uploader
            :imageUploadCallback="imageUploadCallback"
            :location="imageUploadLocation"/>
          </b-dropdown-item>
        </b-dropdown>
      </p>

      <p class="control">
        <button
        class="button is-small"
        value="SUBMIT"
        @click="emit('uploadPost')">
          <b-icon icon="content-save" custom-size="mdi-18px" />
          <span>Save</span>
        </button>
      </p>

      <p class="control">

        <button
        v-if="!postPublished"
        class="button is-small"
        value="SUBMIT"
        @click="emit('publishPost')">
          <b-icon icon="publish" custom-size="mdi-18px"/>
          <span>Publish</span>
        </button>

        <button
        v-else
        class="button is-success is-small"
        value="SUBMIT"
        @click="emit('publishPost')">
          <b-icon icon="check" />
          <span>Published</span>
        </button>

      </p>
    </div>
  </div>
</template>

<script>
import FileUploader from './FileUploader.vue'

export default {
  name: 'Post-Writer-Controls',
  components: {
    FileUploader
  },
  props: [ 'imageUploadLocation', 'imageUploadCallback', 'postPublished' ],
  methods: {
    emit (event) {
      this.$emit(event)
    }
  }
}
</script>

<style type=css>
#post-writer-controls {
  position: absolute;
  width: 100%;
  word-wrap: break-word;
  right: 0;
  bottom: 100%;
}
.file-upload-modal {
  max-width: 500px;
}
</style>
