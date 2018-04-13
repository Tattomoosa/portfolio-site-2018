<template>
  <div id="app">
    <navigation-menu></navigation-menu>
    <router-view/>
  </div>
</template>

<script>
import navigationMenu from './components/NavigationMenu.vue'

export default {
  name: 'App',
  components: {
    navigationMenu
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
