<template>

  <div class="column is-one-third is-hidden-touch">
    <div class="columns is-centered">

      <div class="column">

        <br/><br/>

      <div class="spacer"></div>
        <div class="full-width side-bar">
          <div class="level has-text-centered">
            <div class="level-item">
              <!-- <img class="image is-profile" src="http://placekitten.com/128/128" /> -->
              <!--
              <img class="is-profile box" src="http://placekitten.com/128/128" /> -->
              <div class="is-profile box"
                style="background: #0a8464; width: 128px; height: 128px;">
              </div>
            </div>
          </div>

          <div class="level">
            <div class="level-item">
              <div class="is-item has-text-centered">
                <h1 class="title">Matt O'Tousa</h1>
                <span class="subtitle">Front End Developer</span>
              </div>
            </div>
          </div>
          <!--
          <div class="level">
            <div class="level-item">
              Meat robot
            </div>
          </div>
          -->

          <div class="box full-width sidebar-links">

            <!-- <div id="#sidebar-toc"></div> -->
            <section v-if="postTOC && postTOC.length > 0">
              <h4 class="title is-6">This Post</h4>
              <a v-for="tocElement in postTOC"
                :href="tocElement.link">
                <p class="p is-size-7">{{ tocElement.text }}</p>
              </a>
            </section>

            <h4 class="title is-6">Related</h4>
          </div>

        </div>
      </div>

    </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SideBar',
  /*
  data () {
    return {
      postTOC: []
    }
  },
  */
  computed: {
    ...mapGetters(['postTOC'])
  }
}
</script>

<style type="css">
.spacer {
  height: 60px;
}
.is-profile {
  border-radius: 50%;
  padding: .8rem;
}
.full-width {
  width: 100%;
}
@media screen and (min-width: 1023px) {
  .side-bar {
    position: fixed;
    max-width: 300px;
  }
}

.table-of-contents {
  padding-top: 2rem;
  position: relative;
  padding-bottom: 2rem;
}
.table-of-contents>li>a,
.table-of-contents>li>ul>li>a{
  font-size: .8em;
  line-height: .6;
}
.table-of-contents:before {
  content: 'This Post';
  font-size: 16px;
  font-weight: 600;
  position: relative;
  top: -1rem;
}
.sidebar-links .title {
  margin-bottom: .5rem;
}
.sidebar-links section {
  margin-bottom: .8rem;
}
.sidebar-links {
  transition: height 1s;
}
</style>
