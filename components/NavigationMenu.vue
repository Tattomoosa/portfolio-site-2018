<template>
  <div>
    <span v-for="route in routes" :key="route.name">
      <router-link :to="route.path">{{ route.name }}</router-link>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Navigation-Menu',
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
  data () {
    return {
      routes: []
    }
  }
}
</script>
