<template>
  <div id="app">
    <sign-in></sign-in>
    <navigation-menu></navigation-menu>
    <router-view/>
</div>
</template>

<script>
import NavigationMenu from './components/NavigationMenu.vue'
import SignIn from './components/SignIn.vue'

export default {
  name: 'App',
  components: {
    NavigationMenu,
    SignIn
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
