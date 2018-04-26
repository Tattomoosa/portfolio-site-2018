<template>
  <div class="section">
    <div class="container">
      <div class="columns">
      <side-bar></side-bar>
        <div class="column full-width">
          <b-field>
            <b-autocomplete
            v-model="query"
            placeholder="Search by Tag"
            expanded
            :data="searchTerms" >
            <template slot="empty">No results found</template>
            </b-autocomplete>
            <router-link :to="'/posts-tagged/' + query">
              <button class="button">Search</button>
            </router-link>
          </b-field>
          <br/><br/>
          <post-list
            :type="type"
            :order="order"
            :value="routerValue || value"
            :onlyPublished="true"
            previewStyle="summary"
          ></post-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostList from './PostList'
import SideBar from './SideBar.vue'
import { backend } from '@/firebase'
import { mapGetters } from 'vuex'

export default {
  name: 'Post-List-Page',
  data () {
    return {
      query: '',
      searchTerms: [],
      routerValue: this.$route.params.value
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
      let titles = []
      Object.values(this.tags).map((tag) => {
        tags.push(tag.name)
      })
      this.searchTerms = tags
    }
  },
  computed: {
    ...mapGetters(['tags'])
  },
  mounted () {
    this.$store.dispatch('setRef', {
      stateProperty: 'tags',
      ref: backend.get.ref.ALL_TAGS()
    }).then((a) => {
      this.populateSearch()
    })
  }
}
</script>
