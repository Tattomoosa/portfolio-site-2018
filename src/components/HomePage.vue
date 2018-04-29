<template>
  <div>
    <transition name="fade" mode="out-in">
      <!-- <video-bg :sources="[video]"> -->
        <!-- <div class="full-screen-element dim"></div> -->
        <div class="full-screen-element">
          <div class="level">
            <div class="level-item full-screen-element">

              <mo-effect />

              <!--
              <div class="level has-text-centered">
                <div class="level-item">

                  <div class="is-item box has-text-centered">
                    <h1 class="title is-1">Matt O'Tousa</h1>
                    <span class="subtitle is-3">Front End Developer</span>
                  </div>

                </div>
              </div>
              -->

            </div>
          </div>
        </div>
      <!-- </video-bg> -->
    </transition>
  </div>
</template>
<script>
import VideoBg from 'vue-videobg'
import video from '@/assets/343011110.mp4'
import MoEffect from './MoEffect'

export default {
  name: 'HomePage',
  data () {
    return {
      video
    }
  },
  components: {
    VideoBg,
    MoEffect
  },
  mounted () {
    document.querySelector('video').playbackRate = 0.4
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
.VideoBg video {
  max-width: inherit;
  filter: blur(10px);
  filter: contrast(200%) blur(10px) hue-rotate(180deg);
  z-index: -1;
  min-width: 110vw;
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
    left: -100%;
    top: -120%;
    min-height: 300%;
    min-width: 300%;
    filter: blur(10px);
    filter: contrast(200%) blur(10px) hue-rotate(180deg);
}
</style>
