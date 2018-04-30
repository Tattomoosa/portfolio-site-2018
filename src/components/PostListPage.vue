<template>
  <div class="section">
    <div class="container">
      <div class="columns">
        <div class="column full-width">
            <!--
          <b-field>
            <b-autocomplete
            v-model="query"
            placeholder="Search by Tag"
            expanded
            :data="tags" >
            <template slot="empty">No results found</template>
            </b-autocomplete>
            <router-link :to="'/posts-tagged/' + query">
              <button class="button">Search</button>
            </router-link>
          </b-field>
          -->
          <br/><br/>
          <transition appear name="slide-right" mode="out-in">
          <h2 class="title is-4" :key="category">
            {{ category }}
          </h2>
          </transition>
          <transition appear name="width" mode="out-in">
          <div class="line"></div>
          </transition>
          <div class="space"></div>
          <post-list
            :type="type"
            :order="order"
            :value="routerValue || value"
            :onlyPublished="true"
            previewStyle="summary"
          ></post-list>
        </div>
        <transition appear name="fade" mode="out-in">
          <side-bar :key="'sidebar'"></side-bar>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import PostList from './PostList'
import SideBar from './SideBar.vue'
// import { backend } from '@/firebase'
import { mapGetters } from 'vuex'

export default {
  name: 'Post-List-Page',
  data () {
    return {
      query: '',
      searchTerms: []
    }
  },
  props: ['type', 'order', 'value', 'search'],
  components: {
    PostList,
    SideBar
  },
  methods: {
    populateSearch () {
      let tags = []
      // let titles = []
      if (this.tags) {
        Object.values(this.tags).map((tag) => {
          tags.push(tag.name)
        })
      }
      this.searchTerms = tags
    }
  },
  computed: {
    ...mapGetters({tags: 'tags/listIndexes'}),
    routerValue () {
      return this.$route.params.value
    },
    category () {
      let { type, routerValue } = this
      if (type === 'all') return 'Most Recent Posts'
      if (type === 'with-tag') return 'Posts tagged"' + routerValue + '"'
    }
    /*
    tags () {
      populateSearch()
    }
    */
  },
  mounted () {
    /*
    this.$store.dispatch('setRef', {
      stateProperty: 'tags',
      ref: backend.get.ref.ALL_TAGS()
    }).then((a) => {
      this.populateSearch()
    })
    */
  }
}
</script>
