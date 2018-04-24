<template>
  <div id="app">
    <navigation-menu />
    <div class="menu-pad"></div>
        <!-- <keep-alive include="PostWriter"> -->
          <router-view/>
        <!-- </keep-alive> -->
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
@import url('https://fonts.googleapis.com/css?family=Bitter:400,400i,700');
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,700');
@import url('https://fonts.googleapis.com/css?family=Lato:400,600,700');
@import url('https://fonts.googleapis.com/css?family=Anonymous+Pro:400');
@import url('https://fonts.googleapis.com/css?family=Vollkorn:400,400i,700');
@import url('https://fonts.googleapis.com/css?family=Poppins:700');
@import url('https://fonts.googleapis.com/css?family=Source+Serif+Pro:400,600');


.menu-pad {
  height: 20px;
}

.relative {
  position: relative;
}

html, body {
  font-family: Montserrat;
  font-family: Poppins;
  font-family: Vollkorn;
  font-family: Lato;
}

.content p, .content li {
  font-family: Vollkorn;
  font-family: Bitter;
  font-family: Montserrat;
  font-family: 'Source Serif Pro';
}

code[class*="language-"] {
  font-family: Anonymous Pro;
  text-rendering: geometricPrecision;
}

.section, .container {
  height: 100%;
}

.navbar.is-fixed-top {
  height: 30px;
}
.line {
  width: 100%;
  background: #888;
  height: 2px;
}
.space {
  height: 2rem;
}
.space.is-large {
  height: 4rem;
}
</style>
