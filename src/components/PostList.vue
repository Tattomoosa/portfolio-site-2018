<template>
  <div>
    <div v-for="(post, index) in this.posts" :key="index">
      <h1>{{ post.title }}</h1>
      <h4>By: {{ user(post.author).name }}</h4>
      <p>{{ post.content }}</p>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Post-List',
  // this is communicating with Firebase behind the scenes
  computed: {
    ...mapGetters(['posts', 'user'])
  }
}
</script>
