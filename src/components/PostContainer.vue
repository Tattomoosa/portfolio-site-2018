<template>
  <div>
    <div class="level is-mobile">
      <div class="level-left">
        <div class="is-item has-text-left">
          <h1 class="title is-3">{{ post.title }}</h1>
          <h4 class="subtitle is-6">By {{ author.name }}</h4>
        </div>
      </div>
      <div class="level-right">
        <delete-post :post="post"></delete-post>
      </div>
    </div>
    <post-content :contentLocation="post.contentLocation"></post-content>
  </div>
</template>

<script>
import PostContent from './PostContent'
import DeletePost from './DeletePost'

export default {
  props: ['post', 'author'],
  components: {
    PostContent,
    DeletePost
  }
}
</script>
