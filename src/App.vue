<template>
  <div id="app">
    <navigation-menu />
    <div class="menu-pad"></div>
      <!-- <div class="container"> -->
        <router-view/>
      <!-- </div> -->
    <notification-center />
</div>
</template>

<script>
import NavigationMenu from './components/NavigationMenu.vue'
import NotificationCenter from './components/NotificationCenter.vue'

export default {
  name: 'App',
  components: {
    NavigationMenu,
    NotificationCenter
  }
}
</script>

<style>
.menu-pad {
  height: 20px;
}
.relative {
  position: relative;
}
html, body {
  width: 100vw;
  height: 100vh;
  position: absolute;
  overflow-y: scroll;
}
.section, .container {
  height: 100%;
}
</style>
