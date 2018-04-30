<template>
  <div>
    <transition name="fade" mode="out-in">
        <div class="full-screen-element">
          <div class="level">
            <div class="level-item full-screen-element">

              <mo-effect />

            </div>
          </div>
        </div>
    </transition>
  </div>
</template>
<script>
import MoEffect from './MoEffect'

export default {
  name: 'HomePage',
  data () {
    return {
    }
  },
  components: {
    MoEffect
  },
  mounted () {
    // document.querySelector('video').playbackRate = 0.4
  }
}
</script>

<style>
.dim {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255,255,255, .8);
}
.full-screen-element {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
}
.marquee-video {
    position: absolute;
    /*
    left: -100%;
    top: -120%;
    min-height: 300%;
    min-width: 300%;
    */
    /* filter: contrast(200%) blur(10px) hue-rotate(180deg); */
    filter: blur(3px);
    min-width: 170%;
    min-height: 160%;
    left: -20%;
    top: -30%;
    animation-name: fade-in;
    animation-duration: 1.2s;
    animation-timing-function: ease-in;
}
</style>
