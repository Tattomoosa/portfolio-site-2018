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
    <transition name="fade" mode="out-in">
    <div class="post-title-container">

      <b-taglist v-if="post.tags">
        <b-tag
        v-for="tag in Object.keys(post.tags)"
        :key="tag"
        type="is-light">
          <b-tooltip
          type="is-dark"
          animated
          :label="'See more with tag ' + tag">
            <router-link
            :to="'/posts-tagged/' + tag">
              {{ tag }}
            </router-link>
          </b-tooltip>
        </b-tag>
      </b-taglist>

      <h1 class="title is-1" v-html="post.title"></h1>
      <h4 class="subtitle is-6 has-text-grey-dark">
        <!-- By {{ post.author.name }} &nbsp; -->
        <span class="p is-size-7 is-italic has-text-grey-light">
          &nbsp; posted {{ date.publishedOn }}
        </span>
      </h4>
    </div>
    </transition>
    <br />
    <br/>
    <div v-if="post">
      <div v-if="onlySummary" class="content">
        <markdown-content :toc="false">{{ post.summary }}</markdown-content>
      </div>
      <post-content
      v-else
      @loaded="loaded"
      :toc="true"
      :post="post"
      :contentLocation="post.contentLocation"></post-content>
    </div>
    <!-- <post-content v-else :toc="true" :postID="postID"></post-content> -->
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
  data () {
    return {
      isLoading: true
    }
  },
  components: {
    PostContent,
    DeletePost,
    EditPost,
    MarkdownContent
  },
  computed: {
    date () {
      return {
        publishedOn: moment(this.post.publishedOn).fromNow()
      }
    },
    ...mapGetters({
      activeUser: 'activeUser'
    }),
    isActiveUser () {
      return this.activeUser && this.activeUser.id === this.post.author.id
    }
  },
  methods: {
    loaded () {
      this.isLoading = false
      this.$emit('loaded')
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
