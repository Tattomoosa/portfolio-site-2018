<template>

  <div class="column is-one-third is-hidden-touch">
    <div class="columns is-centered">

      <div class="column">

        <div class="spacer"></div>
        <div class="full-width side-bar">

          <!--
          <div class="level has-text-centered">
            <div class="level-item">
              <div class="is-profile box">
                 <div class="is-profile" style="background: #1a8464; width: 128px; height: 128px;"></div>
              </div>
            </div>
          </div>
          -->

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

          <div v-if="postPage" class="box full-width sidebar-links">

            <!-- <div id="#sidebar-toc"></div> -->
            <section v-if="postTOC && postTOC.length > 0">
              <h4 class="title is-6">This Post</h4>
              <transition-group name="height" mode="out, in">
              <a v-for="(tocElement, index) in postTOC" :key="index"
                :href="tocElement.link">
                <p class="p is-size-7">- {{ tocElement.text }}</p>
              </a>
              </transition-group>
            </section>

            <h4 class="title is-6">Related</h4>
          </div>

          <div v-else class="box full-width sidebar-links">
            <section>
              <h4 class="title is-6">Most Popular</h4>
              <a>
                <p class="p is-size-7">
                  Building this blog with Vue and Firebase
                </p>
              </a>
            </section>
            <section>
              <h4 class="title is-6">About Me</h4>
              <p class="p is-size-7">
                Midwest to Pacific Northwest transplant.
                Audio Engineer turned Front End Developer.
                When I'm not building slick data-driven
                web applications I'm usually painting
                or hiking.
              </p>
            </section>
            <section>
              <h4 class="title is-6">About This Blog</h4>
              <p class="p is-size-7">
                Powered by Firebase, Vue, and Bulma.
                Most content is rendered from Markdown.
                Everything is dynamic, driven by
                a Firebase Firestore.
                Fork it for yourself on <a href="">GitHub</a>
              </p>
            </section>
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
  props: ['postPage'],
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
@media screen and (min-width: 1215px) {
  .side-bar {
    position: fixed;
    max-width: 300px;
    margin-left: 20px;
  }
}
@media screen and (min-width: 1400px) {
  .side-bar {
    position: fixed;
    max-width: 380px;
    margin-left: 30px;
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
