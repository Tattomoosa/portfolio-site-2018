<template>
  <div class="">
        <b-dropdown class="post-controls is-bottom-left">

          <button
          class="button"
          slot="trigger">
          <b-icon icon="dots-vertical"/>
          </button>

          <b-dropdown-item>
            <delete-post :post="post" v-if="isActiveUser"></delete-post>
          </b-dropdown-item>

        </b-dropdown>
          <div class="post-title-container">
            <h1 class="title is-1">{{ post.title }}</h1>
            <h4 class="subtitle is-6 has-text-grey-dark">
              By {{ post.author.name }} &nbsp;
              <span class="p is-size-7 is-italic has-text-grey-light">
                posted {{ date.uploaded }}
              </span>
            </h4>
          </div>
          <br />
          <br/>
    <div v-if="onlySummary" class="content">
      <markdown-content>{{ post.summary }}</markdown-content>
    </div>
    <post-content v-else :contentLocation="post.contentLocation"></post-content>
  </div>
</template>

<script>
import PostContent from './PostContent'
import DeletePost from './DeletePost'
import moment from 'moment'
import { mapGetters } from 'vuex'
import MarkdownContent from './MarkdownContent.vue'

export default {
  props: ['post', 'onlySummary'],
  data () {
    return { isActiveUser: false }
  },
  components: {
    PostContent,
    DeletePost,
    MarkdownContent
  },
  computed: {
    date () {
      return {
        uploaded: moment(this.post.uploaded).fromNow()
      }
    },
    ...mapGetters(['activeUser'])
  },
  methods: {
    isAuthorActiveUser () {
      this.isActiveUser = this.activeUser && this.activeUser.id === this.post.author.id
    }
  },
  mounted () {
    this.isAuthorActiveUser()
  },
  watch: {
    activeUser () {
      this.isAuthorActiveUser()
    },
    author () {
      this.isAuthorActiveUser()
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
  }
</style>
