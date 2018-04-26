<template>
  <div>

    <!-- PostWriter load menu -->
    <b-table
    striped
    narrowed
    focusable
    :data="Object.values(postsFormatted)"
    v-if="previewStyle === 'postwriter'">

      <template slot-scope="props">

        <b-table-column
        sortable
        field="title"
        label="Title">
          <!--
          <router-link :to="'/post-writer/' + props.row.id">
            {{ props.row.title || 'Untitled' }}
          </router-link>
          -->
            <div class="field">
              <p class="control">
                <span v-if="props.row.title" v-html="props.row.title"></span>
                <span v-else>{{ 'Untitled (ID: ' + props.row.id + ')' }}</span>
              </p>
            </div>
        </b-table-column>

        <b-table-column
        sortable
        field="status"
        label="Published">
          <!--
          <router-link :to="'/post-writer/' + props.row.id">
            {{ props.row.title || 'Untitled' }}
          </router-link>
          -->
            <div class="field">
              <p class="control has-text-centered">
                <b-icon v-if="props.row.published" icon="checkbox-marked-circle" type="is-success" />
                <b-icon v-else icon="checkbox-blank-circle-outline" type="is-grey" />
              </p>
            </div>
        </b-table-column>

        <b-table-column
        sortable
        :width="80"
        field="uploaded"
        label="Uploaded">
        <div class="field">
          <p class="control">
            {{ props.row.editedOn ? props.row.editedOn.toLocaleDateString() : '...' }}
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
              <router-link :to="'/post-writer/' + props.row.id" @click="$emit('close')">
                <button class="button is-small" :disabled="props.row.id === $route.params.postID">
                    <b-icon icon="file" size="is-small" />
                  <span>
                  Open
                  </span>
                </button>
              </router-link>
            </p>
            <p class="control">
              <button class="button is-small" :disabled="props.row.id === $route.params.postID">
                <delete-post :post="props.row"/>
              </button>
            </p>
          </div>
        </b-table-column>

      </template>
    </b-table>

    <div v-else>
      <div v-for="post in postsFormatted" v-if="!onlyPublished || post.published" :key="post.id">

        <!-- Summaries (like homepage) -->
        <div v-if="previewStyle === 'summary'" class="summary">
          <post-container :onlySummary="true" :post="post"></post-container>
          <router-link :to="'/post/' + post.id">
            <br/>
            <a class="title is-4">Read More <b-icon icon="arrow-right" /></a>
          </router-link>
          <br/><br/>
            <p class="has-text is-italic">This post has 0 comments</p>
          <div class="space"></div>
          <div class="line"></div>
          <div class="space is-large"></div>
        </div>

      </div>
    </div>

  </div>
</template>
<script>
import { mapGetters } from 'vuex'
// import Post from './PostContent.vue'
import PostContainer from './PostContainer.vue'
import DeletePost from './DeletePost.vue'
import CommentWriter from './CommentWriter.vue'
import { backend } from '@/firebase'

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
    ...mapGetters(['posts'])
  },
  watch: {
    posts () {
      this.listFormatting()
    }
  },
  mounted () {
    let ref
    switch (this.type) {
      case 'all':
        ref = backend.get.ref.ALL_POSTS()
        break
      case 'by-user':
        ref = backend.get.ref.ALL_POSTS().where('author.id', '==', this.value)
        break
    }
    switch (this.order) {
      case 'edited-on':
        ref = ref.orderBy('editedOn')
        break
      case 'published-on':
      default:
        ref = ref.orderBy('publishedOn')
        this.reverse = true
        break
    }
    this.$store.dispatch('setRef', { stateProperty: 'posts', ref: ref })
      .then(() => {
        this.listFormatting()
      })
  },
  methods: {
    listFormatting () {
      if (this.reverse) {
        this.postsFormatted = this.posts.slice(0).reverse()
      }
    }
  },
  components: {
    PostContainer,
    DeletePost,
    CommentWriter
  }
}
</script>
