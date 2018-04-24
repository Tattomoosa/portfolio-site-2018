<template>
  <div>
    <div class="">
      <b-field label="Location">
      </b-field>
        <span v-for="(loc, index) in locationSplit" :key="index">
          <span class="p is-size-7"> {{ loc }} /</span>
        </span>
        <!--
        <nav class="breadcrumb is-small" aria-label="breadcrumbs">
          <ul>
            <li v-for="(loc, index) in locationSplit" :key="index"><a href="#">{{ loc }}</a></li>
          </ul>
        </nav>
        -->
      <!-- <input type="file" value="upload" v-on:change="setFile($event)" /> -->
      <b-field label="File Upload">
      </b-field>
      <b-field class="input-upload" expanded>
        <b-upload v-model="file" class="full-width input-upload" expanded drag-drop>
          <div class="has-text-centered full-width ">
            <div>
              <b-icon icon="upload" size="is-large" />
            </div>
            {{ file[0].name || 'Drop files here or click to upload' }}
          </div>
        </b-upload>
      </b-field>
    <button class="button is-primary full-width" v-on:click="upload()">UPLOAD</button>
  </div>
    <br/>
    <!--
    <div class="img-preview-container">
      <div class="box half" v-for="(upload, index) in uploads" :key="index">
        <div class="upload-img">
          <progress class="progress is-primary is-small" :value="upload.status.progress * 100"></progress>
          <img class="box is-paddingless" v-if="upload.file.type.match('image')" :src="upload.link" />
        </div>
        <span class="">
          {{ upload.file.name }}
          <span class="is-small"> {{ upload.file.type }} </span>
        </span>
      </div>
    </div>-->
    <!-- <b-tabs> -->
      <!-- <b-tab-item label="Table"> -->
    <div class="img-preview-container">
        <b-table
          detailed
          :data="Object.values(uploads)"
          hoverable>

          <template slot="detail" slot-scope="props">
            <div class="media-content">
              <p class="image is=256x256">
                <img :src="props.row.link" />
              </p>
            </div>
          </template>

          <template slot-scope="props">
            <b-table-column
              field="file.name"
              label="Name">
              {{ props.row.file.name }}
            </b-table-column>

            <b-table-column
              field="type"
              label="Type">
              {{ props.row.file.type }}
            </b-table-column>

            <b-table-column
              field="link"
              label="Link">
              <!--
                <a :href="props.row.link">
                  link
                </a>
                -->
                <button
                  v-clipboard:copy="props.row.link"
                  v-clipboard:success="copied"
                  class="button is-small">
                  Copy
                </button>
            </b-table-column>
          </template>

        </b-table>
      </div>

      <!-- </b-tab-item> -->
    <!-- </b-tabs> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'FileUploader',
  data () {
    return {
      file: [{}],
      locationSplit: []
    }
  },
  props: [
    'location',
    'imageUploadCallback',
    'local'
  ],
  methods: {
    ...mapActions(['uploadFile', 'notify']),
    upload () {
      if (!this.local) {
        this.uploadFile({
          location: this.location,
          file: this.file[0]
        }).then((file) => {
          this.$props.imageUploadCallback(file)
        })
      } else {
        // TODO implement holding files locally
      }
    },
    setFile (e) {
      this.file = e.target.files[0]
    },
    copied () {
      this.notify('Copied image link to clipboard')
    }
  },
  computed: {
    ...mapGetters(['uploads'])
  },
  watch: {
    location () {
      this.locationSplit = this.location ? this.location.split('/') : 'no location'
    }
  }
}
</script>

<style type=css>
.input-upload .upload-draggable {
  width: 100% !important;
  display: block;
}
.upload-block {
  max-width: 400px;
  height: 200px;
}
.half {
  width: 32%;
  max-width: 49%;
  box-sizing: border-box;
  display: inline-block;
}
.upload-img {
  width: 150px;
  height: 150px;
}
.upload-img .upload {
  display: block;
}
.full-width {
  width: 100% !important;
  display: block;
}
.img-preview-container {
  max-height: 400px;
  overflow-y: scroll;
}
</style>
