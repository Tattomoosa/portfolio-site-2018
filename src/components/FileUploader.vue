<template>
  <div>
      <b-field label="Upload Location">
        <b-input v-model="location" />
      </b-field>
      <!-- <input type="file" value="upload" v-on:change="setFile($event)" /> -->
      <b-field label="File Upload">
        <b-upload v-model="file" drag-drop>
          <div class="has-text-centered">
            <div>
              <b-icon icon="upload" />
            </div>
            Drop files here or click to upload
          </div>
        </b-upload>
      </b-field>
      <button class="button is-primary" v-on:click="upload()">UPLOAD</button>
    <div v-for="(upload, index) in uploads" :key="index">
      name: "{{ upload.file.name }}",
      type: "{{ upload.file.type }}",
      size: "{{ upload.file.size }}"
      <progress class="progress is-primary" :value="upload.status.progress * 100"></progress>
      <a :href="upload.link">VIEW</a>
    </div>
  </div>
</template>

<script>
// import { upload } from '../storage.js'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'FileUploader',
  data () {
    return {
      file: null,
      location: ''
    }
  },
  methods: {
    ...mapActions(['uploadFile']),
    upload () {
      this.uploadFile({
        location: this.location,
        file: this.file[0]
      })
    },
    setFile (e) {
      this.file = e.target.files[0]
    }
  },
  computed: {
    ...mapGetters(['uploads'])
  }
}
</script>
