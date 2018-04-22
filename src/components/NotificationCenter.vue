<template>
  <div></div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'NotificationCenter',
  computed: {
    ...mapGetters(['notifications'])
  },
  methods: {
    ...mapActions(['dismissNotification'])
  },
  watch: {
    // TODO Rapid actions make these go off out of order
    // for some reason
    notifications () {
      if (this.notifications.length > 0) {
        let toast = this.notifications[this.notifications.length - 1]
        this.$toast.open({
          message: toast.message,
          type: toast.color || 'is-success',
          position: 'is-bottom'
        })
      }
      this.dismissNotification()
    }
  }
}
</script>
