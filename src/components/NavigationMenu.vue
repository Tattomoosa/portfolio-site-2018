<template>
  <nav class="navbar is-fixed-top">
    <div class="container">
      <div class="navbar-brand">
        <div class="navbar-item is-paddingless" style="margin: 4px 8px 0 ;">
          <span>
            <router-link to="/">
              <transition name="fade" appear type="out, in" >
                <img :src="navImage" v-if="$route.path !== '/'" class="nav-image" />
              </transition>
            </router-link>
          </span>
        </div>
        <div
          role="button"
          class="navbar-burger"
          @click="toggleMenu"
          :class="{ 'is-active': navIsActive }"
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
      class="navbar-menu mo-nav"
      :class="{'is-active': navIsActive}">
        <div class="navbar-start"></div>
        <div class="navbar-end">
          <router-link
          class="navbar-item"
          @click.native="toggleMenu"
          to="/blog/posts-tagged/project">
            Projects
          </router-link>
          <router-link
          class="navbar-item"
          @click.native="toggleMenu"
          to="/blog/posts-tagged/tutorial">
            Tutorials
          </router-link>
          <router-link
          class="navbar-item"
          @click.native="toggleMenu"
          to="/blog/">
            Blog
          </router-link>
          <a class="navbar-item">
            <sign-in></sign-in>
          </a>
        </div>
        </div>
      </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import SignIn from './SignIn.vue'
import navImage from '@/assets/mo-logo.png'

export default {
  name: 'Navigation-Menu',
  data () {
    return {
      navIsActive: false,
      routes: [],
      navImage
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
      // console.log(this.navIsActive)
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

img.nav-image {
  min-width: 30px;
  min-height: 35px;
}

</style>
