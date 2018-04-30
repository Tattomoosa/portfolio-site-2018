<template>
  <nav class="navbar is-fixed-top">
    <div class="container">
      <div class="navbar-brand">
        <div class="navbar-item">
          <b-icon icon="lead-pencil"/>
          <span>
            &nbsp;Blog
            <span class="subtitle is-size-7">Blog</span>
          </span>
        </div>
        <div
          role="button"
          class="navbar-burger"
          @click="toggleMenu"
          :class="{'is-active': navIsActive}"
          aria-label="menu"
          aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </div>
      </div>
      <!--
      <div
      class="navbar-menu"
      :class="{'is-active': navIsActive}">
        <div class="navbar-start"></div>
        <div class="navbar-end">
          <div class="navbar-item" @click="toggleMenu" v-for="route in routes" :key="route.name">
            <router-link class="navbar-item" :to="route.path">
              {{ route.name }}
            </router-link>
          </div>
          <div class="navbar-item">
            <sign-in></sign-in>
          </div>
        </div>
      </div>
      -->
      <div
      class="navbar-menu"
      :class="{'is-active': navIsActive}">
        <div class="navbar-start"></div>
        <div class="navbar-end">
          <router-link
          class="navbar-item"
          @click.native="toggleMenu"
          to="/">
            Home
          </router-link>
          <router-link
          class="navbar-item"
          @click.native="toggleMenu"
          @touchstart="toggleMenu"
          to="/blog/">
            Blog
          </router-link>
        </div>
          <div class="navbar-item">
            <sign-in></sign-in>
          </div>
        </div>
      </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import SignIn from './SignIn.vue'

export default {
  name: 'Navigation-Menu',
  data () {
    return {
      navIsActive: false,
      routes: []
    }
  },
  created () {
    // This dynamically grabs every route in router and returns
    // an object with a name and a path that we can build router-links with
    this.$router.options.routes.forEach(route => {
      this.routes.push({
        name: route.name,
        path: route.path
      })
    })
  },
  computed: {
    ...mapGetters(['activeUser'])
  },
  methods: {
    toggleMenu () {
      console.log(this.navIsActive)
      this.navIsActive = !this.navIsActive
    }
  },
  components: {
    SignIn
  }
}
</script>

<style type=css>
.router-link-exact-active {
  text-decoration: underline !important;
}
</style>
