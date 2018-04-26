<template>
  <div class="section">
    <div class="container">
      <div class="columns">
      <side-bar></side-bar>
        <div class="column full-width">
          <br/><br/>
          <post-list
            :type="type"
            :order="order"
            :value="value"
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

export default {
  name: 'Post-List-Page',
  props: ['type', 'order', 'value'],
  components: {
    PostList,
    SideBar
  }
}
</script>
