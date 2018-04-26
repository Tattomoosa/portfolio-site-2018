<template>
  <div :key="this.type + ' ' + this.value + ' by ' + this.order ">

    <!-- PostWriter load menu -->
    <b-table
    striped
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
                  {{ props.row.publishedOn ? props.row.publishedOn.toLocaleDateString() : '' }}
                </span>
                <span v-else>
                  <br/>Draft
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
              <button class="button is-small">
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
            <!-- <p class="has-text is-italic">This post has 0 comments</p> -->
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
    },
    type () {
      this.load()
    },
    order () {
      this.load()
    },
    value () {
      this.load()
    }
  },
  mounted () {
    this.load()
  },
  methods: {
    listFormatting () {
      if (this.reverse) {
        this.postsFormatted = this.posts.slice(0).reverse()
      }
    },
    load () {
      let ref
      switch (this.type) {
        case 'with-tag':
          // tags actually each have their own subcollection
          // wasteful, i know
          ref = backend.get.ref.ALL_POSTS_WITH_TAG(this.value)
          // ref = backend.get.ref.ALL_TAGS()
          console.log(ref)
          break
        case 'by-user':
          ref = backend.get.ref.ALL_POSTS().where('author.id', '==', this.value)
          break
        case 'all':
        default:
          ref = backend.get.ref.ALL_POSTS()
          console.log(ref)
          break
      }
      switch (this.order) {
        case 'edited-on':
          ref = ref.orderBy('editedOn')
          break
        case 'published-on':
          ref = ref.orderBy('publishedOn')
          this.reverse = true
          break
        default:
          break
      }
      this.$store.dispatch('setRef', { stateProperty: 'posts', ref: ref })
        .then(() => {
          // console.log(this.posts)
          this.listFormatting()
        })
    }
  },
  components: {
    PostContainer,
    DeletePost,
    CommentWriter
  }
}
</script>
