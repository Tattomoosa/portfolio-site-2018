<template>
  <div id="app">
    <navigation-menu />
    <div class="menu-pad"></div>
        <!-- <keep-alive include="PostWriter"> -->
          <!-- <transition name="fade" mode="out-in"> -->
            <!-- <router-view :key="$route.path" /> -->
            <router-view />
          <!-- </transition> -->
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
@import url('https://fonts.googleapis.com/css?family=Lato:400,600,700');
@import url('https://fonts.googleapis.com/css?family=Source+Serif+Pro:400,600');
@import url('https://fonts.googleapis.com/css?family=Source+Code+Pro');

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
  font-family: 'Source Code Pro';
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

/* LINK STUFF TODO MOVE THIS */
.content a, a, a.title {
  color: #2aa484;
  position: relative;
}
.content a:hover, a:hover, a.title:hover {
  color: #0a8464;
}
.content a:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: 2px;
  left: 0;
  background-color: #0a8464;
  visibility: hidden;
  -webkit-transform: scaleX(0);
  transform: scaleX(0);
  -webkit-transition: all 0.3s ease-in-out 0s;
  transition: all 0.3s ease-in-out 0s;
}
.content a:hover:before {
  visibility: visible;
  -webkit-transform: scaleX(1);
  transform: scaleX(1);
}
p code {
  color: black;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 8s transform 8s;
  transition-timing-function: ease-in-out;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translate(100px, 0)
}
.height-enter-active, .height-leave-active {
  transition: scaleY 8s;
}
.height-enter, .height-leave-to {
  /*
  transform: scaleY(0)
  */
  max-height: 0;
}
</style>
