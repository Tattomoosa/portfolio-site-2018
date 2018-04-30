<template>
  <div id="app">
    <navigation-menu />
    <div class="menu-pad"></div>
        <!-- <keep-alive include="PostWriter"> -->
            <!-- <router-view :key="$route.path" /> -->
            <div class="site-content">
              <!-- <transition name="fade" mode="out-in"> -->
                <router-view />
              <!-- </transition> -->
            </div>
        <!-- </keep-alive> -->
    <notification-center />
    <blog-footer />
</div>
</template>

<script>
import NavigationMenu from './components/NavigationMenu.vue'
import NotificationCenter from './components/NotificationCenter.vue'
import BlogFooter from './components/BlogFooter.vue'

export default {
  name: 'App',
  components: {
    NavigationMenu,
    NotificationCenter,
    BlogFooter
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
  font-family: Lato;
}

#app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.site-content {
  flex: 1;
}

.content p, .content li {
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
  background: #eee;
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
  transition: opacity .5s;
  transition-timing-function: ease-out;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active, .slide-up-leave-active {
  transition: transform 1s, opacity 1s;
  transition-timing-function: ease-out;
  position: relative;
}
.slide-up-enter, .slide-up-leave-to {
  opacity: 0;
  transform: translate(0, 40px)
}
.slide-up-move {
  transform: 2s;
}

.slide-down-enter-active, .slide-down-leave-active {
  transition: transform 1s, opacity 1s;
  transition-timing-function: ease-out;
}
.slide-down-enter, .slide-down-leave-to {
  opacity: 0;
  transform: translate(0, -40px)
}
.slide-down-move {
  transition: transform 2s;
}

.slide-left-enter-active, .slide-left-leave-active {
  transition: transform .5s, opacity .5s;
  transition-timing-function: ease-out;
}
.slide-left-enter, .slide-left-leave-to {
  opacity: 0;
  transform: translate(40px, 0%)
}
.slide-left-move {
  transition: transform 2s;
}

.slide-right-enter-active, .slide-right-leave-active {
  transition: transform .5s, opacity .5s;
  transition-timing-function: ease-out;
}
.slide-right-enter, .slide-right-leave-to {
  opacity: 0;
  transform: translate(-40px, 0%)
}
.slide-right-move {
  transition: transform 2s;
}

.width-enter-active, .width-leave-active {
  transition: width 1.8s, opacity 2s;
  transition-timing-function: ease-out;
}
.width-enter, .width-leave-to {
  opacity: 0;
  width: 0;
}
.width-move {
  transition: transform 2s;
}

</style>
