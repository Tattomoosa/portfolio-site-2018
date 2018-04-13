<template>
  <div>
    <input v-model="post.title" placeholder="Post Title" />
    <br/>
    <textarea v-model="post.content" placeholder="Post Content" rows="20" cols="80"/>
    <br/>
    <input type="button" value="SUBMIT" v-on:click="addPost(post)"/>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'Post-Writer',
  data () {
    return {
      post: {
        title: '',
        content: ''
      }
    }
  },
  methods: {
    // Dispatches the Vuex action which uploads our post
    // using the normal Firestore API
    ...mapActions(['addPost'])
  }
}
</script>
