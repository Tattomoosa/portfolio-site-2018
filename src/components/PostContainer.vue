<template>
  <div class="post-container">
        <b-dropdown v-if="isActiveUser" class="post-controls is-bottom-left">

          <button
          class="button"
          slot="trigger">
          <b-icon icon="dots-vertical"/>
          </button>

          <b-dropdown-item>
            <edit-post :post="post" ></edit-post>
          </b-dropdown-item>

          <b-dropdown-item>
            <delete-post :post="post" ></delete-post>
          </b-dropdown-item>

        </b-dropdown>
          <div class="post-title-container">
            <h1 class="title is-1" v-html="post.title"></h1>
            <h4 class="subtitle is-6 has-text-grey-dark">
              <!-- By {{ post.author.name }} &nbsp; -->
              <span class="p is-size-7 is-italic has-text-grey-light">
                &nbsp; posted {{ date.uploaded }}
              </span>
            </h4>
          </div>
          <br />
          <br/>
    <div v-if="onlySummary" class="content">
      <markdown-content :toc="false">{{ post.summary }}</markdown-content>
    </div>
    <post-content v-else :toc="true" :contentLocation="post.contentLocation"></post-content>
  </div>
</template>

<script>
import PostContent from './PostContent'
import DeletePost from './DeletePost'
import EditPost from './EditPost'
import moment from 'moment'
import { mapGetters } from 'vuex'
import MarkdownContent from './MarkdownContent.vue'

export default {
  props: ['post', 'onlySummary'],
  components: {
    PostContent,
    DeletePost,
    EditPost,
    MarkdownContent
  },
  computed: {
    date () {
      return {
        uploaded: moment(this.post.uploaded).fromNow()
      }
    },
    ...mapGetters(['activeUser']),
    isActiveUser () {
      console.log('hit')
      return this.activeUser && this.activeUser.id === this.post.author.id
    }
  }
}
</script>

<style>
  .margin-top {
    margin-top: 50px;
  }
  .post-title-container {
    /* margin-right: 32%; */
  }
  .post-controls {
    position: absolute;
    right: 0;
    top: -2rem;
  }
  .post-controls button {
    border: none;
  }
  .post-container {
    position: relative;
  }
  .post-title-container .title {
    line-height: 1.1;
  }
</style>
