<template>
  <div>

    <span
    class="navbar-item"
    v-if="activeUser === null"
    @click="showLoginModal = true">
      Log In
    </span>

      <b-dropdown v-else class="is-bottom-left navbar-item has-dropdown">
        <a class="navbar-link" slot="trigger">{{ activeUser.name }}
        </a>

        <b-dropdown-item has-link>
          <router-link to="/blog/post-writer/">
            Add Post
          </router-link>
        </b-dropdown-item>

        <b-dropdown-item @click="logOut">Log Out</b-dropdown-item>
      </b-dropdown>

    <b-modal
    width="400px"
    :active.sync="showLoginModal">
      <div class="box">
        <h4 class="title is-4 has-text-centered">
          Sign In
        </h4>
        <firebase-u-i></firebase-u-i>
      </div>
    </b-modal>

  </div>
</template>

<script>
import FirebaseUI from './FirebaseUI.vue'
import { login, logOut } from '@/firebase'
import { mapGetters } from 'vuex'

export default {
  name: 'SignIn',
  methods: {
    logOut
  },
  data () {
    return {
      showLoginModal: false
    }
  },
  mounted () {
    // if a login is in progress we need FirebaseUI
    // to stay on the page
    if (login.inProgress()) this.showLoginModal = true
  },
  computed: {
    ...mapGetters(['activeUser'])
  },
  watch: {
    activeUser () {
      if (this.activeUser) this.showLoginModal = false
    }
  },
  components: {
    FirebaseUI
  }
}
</script>
