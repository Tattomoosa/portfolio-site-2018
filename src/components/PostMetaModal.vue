<template>
  <div>

    <b-field label="Tags">
      <b-input v-model="tagsInput" />
    </b-field>
    <b-field>
      <b-taglist>
        <transition-group appear name="slide-up" mode="out-in">
          <!--
          <b-tag
          closable
          v-for="(tag, index) in allTags"
          @close="removeTag(index)"
          :key="index">{{ tag }}</b-tag>
          -->
          <b-tag
          type="is-primary"
          closable
          v-for="(tag, index) in existingTags"
          @close="removeTag(index, existingTags)"
          :key="tag">{{ tag }}</b-tag>
          <b-tag
          closable
          type="is-light"
          v-for="(tag, index) in newTags"
          @close="removeTag(index, newTags)"
          :key="tag">{{ tag }}</b-tag>

        </transition-group>
      </b-taglist>
    </b-field>
    <b-field>
      <button class="button" @click="saveMetadata()">
        <b-icon icon="content-save" />
        <span>
          Save Post Metadata
        </span>
      </button>
    </b-field>

  </div>
</template>

<script>
export default {
  name: 'Post-Meta-Modal',
  data () {
    return {
      thisPost: {},
      newTags: [],
      existingTags: [],
      allTags: [],
      tagsInput: ''
    }
  },
  props: ['post'],
  watch: {
    tagsInput () {
      this.newTags = []
      this.tagsInput.split(',').forEach((i) => {
        this.newTags.push(i.trim())
      })
      this.newTags = this.newTags.filter((v) => v.length > 2)
      this.allTags = this.existingTags.concat(this.newTags)
    },
    post () {
      this.onPostUpdated()
    }
  },
  methods: {
    saveMetadata () {
      // iterable objects are better for firebase
      let tagsIterable = {}
      this.allTags.forEach((i) => {
        tagsIterable[i] = true
      })
      let meta = {
        tags: tagsIterable
      }
      this.$store.dispatch('uploadPostMetadata', { post: this.thisPost, meta: meta }).then(() => {
        // we have to call this since Vuex can't see that post.meta.tags has changed.
        // (i think) definitely have to tho
        this.tagsInput = ''
        this.onPostUpdated()
      })
    },
    onPostUpdated () {
      let existingTags = []
      // Vuex is not watching our post deep enough, so we
      // gotta get it straight from the source...
      // maybe there is a better way.
      this.thisPost = this.$store.getters['posts/single'](this.post.id)
      let postTags = this.thisPost ? this.thisPost.tags : null
      // pull out existing tags
      if (postTags) {
        Object.keys(postTags).forEach((key) => {
          existingTags.push(key)
        })
        this.existingTags = existingTags
        this.allTags = this.existingTags.concat(this.newTags)
      }
    },
    removeTag (index, array) {
      /*
      if (index < this.existingTags.length) {
        console.log('existing')
        this.existingTags.splice(index, 1)
      } else {
        console.log('new')
        this.newTags.splice(index - this.existingTags.length, 1)
        this.tagsInput = ''
        this.newTags.forEach((i) => {
          this.tagsInput += i + ', '
        })
      }
      this.allTags = this.existingTags.concat(this.newTags)
      */
      array.splice(index, 1)
      // do i still need allTags here?
      this.allTags = this.existingTags.concat(this.newTags)
    }
  }
}
</script>

<style>
</style>
