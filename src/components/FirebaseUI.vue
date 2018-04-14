<template>
  <div id="firebaseui-auth"></div>
</template>
<script>
import { login } from '@/firebase.js'
export default {
  name: 'FirebaseUI',
  mounted () {
    login('#firebaseui-auth')
  }
}
</script>

<style>
@import '../../node_modules/firebaseui/dist/firebaseui';

</style>
