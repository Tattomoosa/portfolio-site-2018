<template>
  <div>
    <input value="Upload Location" v-model="location" />
    <input type="file" value="upload" v-on:change="setFile($event)" />
    <input type="button" value="Submit" v-on:click="upload()" />
    <div v-for="(upload, index) in uploads" :key="index">
      name: "{{ upload.file.name }}",
      type: "{{ upload.file.type }}",
      size: "{{ upload.file.size }}"
      <progress :value="upload.status.progress * 100"></progress>
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
        file: this.file
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
