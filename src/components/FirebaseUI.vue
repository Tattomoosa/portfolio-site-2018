<template>
  <div :id="loginElementId"></div>
</template>
<script>
import { login } from '@/firebase'
export default {
  name: 'FirebaseUI',
  data () {
    return {
      loginElementId: login.elementId
    }
  },
  mounted () {
    login.start(window.location.href)
  }
}
</script>

<style>
@import '../../node_modules/firebaseui/dist/firebaseui';

</style>
