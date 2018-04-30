<template>
  <div id="post-writer-controls">

    <div class="field has-addons white-border float-right">
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
        v-if="!post.published"
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
        @click="emit('unpublishPost')">
          <b-icon icon="check" />
          <span>Published</span>
        </button>
      </p>
    </div>

    <div class="field has-addons white-border float-right">
      <p class="control">
        <b-dropdown position="is-bottom-left">
          <button
          class="button is is-small"
          slot="trigger"
          value="ADD IMAGE">
          <b-icon icon="image" custom-size="mdi-18px" />
          <span>Media</span>
          </button>
          <b-dropdown-item custom class="file-upload-modal">
            <file-uploader
            :imageUploadCallback="imageUploadCallback"
            :location="imageUploadLocation"/>
          </b-dropdown-item>
        </b-dropdown>
      </p>
      <p class="control">
        <b-dropdown position="is-bottom-left">
          <button
          class="button is is-small"
          slot="trigger"
          value="ADD IMAGE">
          <b-icon icon="asterisk" custom-size="mdi-18px" />
          <span>Meta</span>
          </button>
          <b-dropdown-item custom class="file-upload-modal">
            <post-meta-modal :post="post"/>
          </b-dropdown-item>
        </b-dropdown>
      </p>
      <p class="control">
        <b-dropdown position="is-bottom-left">
          <button
          class="button is is-small"
          slot="trigger"
          value="">
          <b-icon icon="folder-open" custom-size="mdi-18px" />
          <span>Open</span>
          </button>
          <b-dropdown-item custom class="file-upload-modal">
            <!--
            <post-list
              type="by-user"
              order="edited-on"
              :value="activeUser.id"
              previewStyle="postwriter"
            />
          -->
            <post-list
              type="all"
              order="edited-on"
              :value="activeUser.id"
              previewStyle="postwriter"
            />
          </b-dropdown-item>
        </b-dropdown>
      </p>

    </div>

    <div class="field has-addons white-border float-right">
      <p class="control">
        <router-link to="/blog/post-writer/">
          <button
          class="button is-small"
          value="Open">
            <b-icon icon="plus" custom-size="mdi-18px" />
            <span>New</span>
          </button>
        </router-link>
      </p>
      <p class="control">
        <button
        class="button is-small"
        value="Delete">
        <!--
          <b-icon icon="close" custom-size="mdi-18px" />
          <span>Delete</span>
          -->
          <delete-post :post="post"/>
        </button>
      </p>
    </div>

  </div>
</template>

<script>
import FileUploader from './FileUploader.vue'
import PostMetaModal from './PostMetaModal'
import PostList from './PostList.vue'
import DeletePost from './DeletePost'
import { mapGetters } from 'vuex'

export default {
  name: 'Post-Writer-Controls',
  components: {
    FileUploader,
    PostMetaModal,
    DeletePost,
    PostList
  },
  props: [ 'imageUploadLocation', 'imageUploadCallback', 'post' ],
  computed: {
    ...mapGetters(['activeUser'])
  },
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
  right: -5px;
  bottom: 100%;
}
#post-writer-controls .field {
  position: relative;
  top: 4px;
}
#post-writer-controls .dropdown-menu {
  /*
  max-width: 100%;
  min-width: auto;
  */
}
.file-upload-modal {
  max-width: 100%;
  min-width: 40rem;
}
</style>
