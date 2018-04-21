<template>
  <div class="">
    <div class="level is-mobile">
      <div class="level-left">
        <div class="is-item has-text-left">
          <h1 class="title is-4">{{ post.title }}</h1>
          <h4 class="subtitle is-6 has-text-grey-dark">
            By {{ author.name }} &nbsp;
            <span class="p is-size-7 is-italic has-text-grey-light">
              posted {{ date.uploaded }}
            </span>
          </h4>
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
import moment from 'moment'

export default {
  props: ['post', 'author'],
  components: {
    PostContent,
    DeletePost
  },
  mounted () {
    console.log(this.author.joined)
  },
  computed: {
    date () {
      return {
        uploaded: moment(this.post.uploaded).fromNow()
      }
    }
  }
}
</script>

<style>
  .margin-top {
    margin-top: 50px;
  }
</style>
