<template>
  <div>
    <input
      type="button"
      value="Log Out"
      v-if="user !== null"
      v-on:click="logOut"
      >
    <firebase-u-i v-else ></firebase-u-i>
  </div>
</template>

<script>
import FirebaseUI from './FirebaseUI.vue'
import { logOut } from '@/firebase.js'

export default {
  name: 'SignIn',
  methods: {
    logOut
  },
  computed: {
    user () { return this.$store.state.user }
  },
  components: {
    FirebaseUI
  }
}
</script>
