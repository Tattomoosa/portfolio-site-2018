<template>
  <div id="app">
    <navigation-menu></navigation-menu>
    <div class="menu-pad"></div>
    <section class="section">
      <div class="container">
        <router-view/>
      </div>
    </section>
</div>
</template>

<script>
import NavigationMenu from './components/NavigationMenu.vue'

export default {
  name: 'App',
  components: {
    NavigationMenu
  }
}
</script>

<style>
.menu-pad {
  height: 20px;
}
</style>
