<template>
  <div :key="this.type + ' ' + this.value + ' by ' + this.order ">

    <!-- PostWriter load menu -->
    <b-table
    striped
    focusable
    narrowed
    class="post-writer-load-menu"
    :data="Object.values(posts)"
    v-if="previewStyle === 'postwriter'">

      <template slot-scope="props">

        <b-table-column
        sortable
        field="title"
        label="Title">
            <div class="field">
              <p class="control">
                <span v-if="props.row.title" v-html="props.row.title"></span>
                <span v-else>{{ 'Untitled (ID: ' + props.row.id + ')' }}</span>
              </p>
            </div>
        </b-table-column>

        <b-table-column
        sortable
        field="published"
        label="Published">
            <div class="field">
              <p class="control has-text-centered">
                <span v-if="props.row.published" >
                  <b-icon icon="checkbox-marked-circle" type="is-success" />
                </span>
                <span v-else>
                  <b-icon icon="checkbox-blank-circle-outline" type="is-grey" />
                </span>
              </p>
            </div>
        </b-table-column>

        <b-table-column
        sortable
        field="publishedOn"
        label="Publish Date">
          <!--
          <router-link :to="'/post-writer/' + props.row.id">
            {{ props.row.title || 'Untitled' }}
          </router-link>
          -->
            <div class="field">
              <p class="control has-text-centered">
                <span v-if="props.row.published" >
                  {{ props.row.publishedOn ? props.row.publishedOn.toDate().toLocaleDateString() : '' }}
                </span>
                <span v-else>
                  Draft
                </span>
              </p>
            </div>
        </b-table-column>

        <b-table-column
        sortable
        field="uploaded"
        label="Last Edited">
        <div class="field">
          <p class="control">
            {{ props.row.editedOn ? props.row.editedOn.toDate().toLocaleDateString() : '...' }}
          </p>
        </div>
        </b-table-column>

        <b-table-column
        :width="150"
        field="actions"
        class="is-paddingless"
        label="Actions">
          <div class="field has-addons is-paddingless">
            <p class="control">
              <router-link :to="'/blog/post-writer/' + props.row.id" @click="$emit('close')">
                <button class="button is-small" :disabled="props.row.id === $route.params.postID">
                    <b-icon icon="file" size="is-small" />
                  <span>
                  Open
                  </span>
                </button>
              </router-link>
            </p>
            <p class="control">
              <button class="button is-small">
                <delete-post :post="props.row"/>
              </button>
            </p>
          </div>
        </b-table-column>

      </template>
    </b-table>

    <div v-else>
      <transition-group appear tag="div" name="slide-up" mode="in">
        <div v-for="(post, index) in posts" v-if="!onlyPublished || post.published" :key="post.id">

        <!-- Summaries (like homepage) -->
          <div v-if="previewStyle === 'summary'" class="summary">
            <post-container :onlySummary="true" :post="post" :style="{transitionDelay: 4 * index + 's'}"></post-container>
            <transition appear name="slide-left" mode="in-out">
            <router-link :to="'/blog/post/' + post.id">
              <br/>
              <a class="title is-4">
                Read More
                  <b-icon class="read-more-arrow" icon="arrow-right" />
              </a>
            </router-link>
            </transition>
            <br/><br/>
            <div class="space"></div>
            <transition appear name="width">
              <div class="line"></div>
            </transition>
            <div class="space"></div>
          </div>

        </div>
      </transition-group>
    </div>

  </div>
</template>
<script>
// import { mapGetters } from 'vuex'
// import Post from './PostContent.vue'
import PostContainer from './PostContainer.vue'
import DeletePost from './DeletePost.vue'
import CommentWriter from './CommentWriter.vue'

export default {
  name: 'Post-List',
  data () {
    return {
      postsFormatted: [],
      reverse: true
    }
  },
  props: [ 'type', 'order', 'value', 'onlyPublished', 'previewStyle' ],
  computed: {
    // ...mapGetters({posts: 'posts'}),
    posts () {
      let posts
      // let condition = (c) => { return c === undefined || Object.keys(c).length === 0 }
      if (this.type === 'with-tag' && this.value) {
        posts = this.$store.getters['tags/postsAtIndex'](this.value)
      } else if (this.type === 'all') {
        posts = this.$store.getters['posts/all']
        // this.$store.dispatch('posts/registerPostCollection')
      }

      if (typeof posts === 'object') {
        posts = Object.values(posts)
        if (this.order === 'published-on') {
          posts.sort((a, b) => {
            if (a.publishedOn < b.publishedOn) return 1
            if (a.publishedOn > b.publishedOn) return -1
            return 0
          })
        }
      }

      return posts
    }
  },
  watch: {
    posts () {
    },
    type () {
    },
    order () {
    },
    value () {
    }
  },
  mounted () {
  },
  components: {
    PostContainer,
    DeletePost,
    CommentWriter
  }
}
</script>
<style>
a .read-more-arrow {
  position: relative;
  transition: all 1s;
  transition-timing-function: ease-out
}
a:hover .read-more-arrow {
  transform: translate(10px, 0);
}

.post-writer-load-menu tbody tr td p {
  font-size: 12px;
}
</style>
