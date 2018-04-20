<template>
  <div></div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NotificationCenter',
  computed: {
    ...mapGetters(['notifications'])
  },
  watch: {
    notifications () {
      console.log(this.notifications)
      this.$toast.open({
        message: this.notifications[this.notifications.length - 1],
        type: 'is-white',
        position: 'is-bottom'
      })
    }
  }
}
</script>
