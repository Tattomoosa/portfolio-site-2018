<template>
  <div>
    <div v-for="post in this.posts" :key="post.name">
      <h1>{{ post.name }}</h1>
      <p>{{ post.content }}</p>
      <p>{{ post }}</p>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  // this is communicating with Firebase behind the scenes
  computed: mapGetters(['posts'])
}
</script>
