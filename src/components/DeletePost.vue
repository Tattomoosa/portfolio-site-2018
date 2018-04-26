<template>
  <div @click="confirmDelete">
  <b-icon
    icon="delete"
    size="is-small"
    ></b-icon>
  <span>Delete Post</span>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'DeletePost',
  props: ['post', 'callback'],
  methods: {
    ...mapActions(['deletePost']),
    confirmDelete () {
      this.$dialog.confirm({
        title: 'Delete Post?',
        message: 'Are you sure you want to delete "' + this.post.title + '"? This will remove all associated comments and images and cannot be undone.',
        onConfirm: this.destroyPost,
        confirmText: 'Delete Post',
        type: 'is-danger',
        hasIcon: true
      })
    },
    destroyPost () {
      this.deletePost(this.post)
    }
  }
}
</script>
