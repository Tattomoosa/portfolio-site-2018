<template>

  <div class="column is-one-third is-hidden-touch">
    <div class="columns is-centered">

      <div class="column">
          <br/>

        <div class="spacer"></div>
        <div class="full-width side-bar">

          <!--
            <div class="level has-text-centered">
              <div class="level-item">
                <img :src="navImage" v-if="$route.path !== '/'" class="nav-image" />
              </div>
            </div>
            -->

        <transition name="fade" appear mode="out-in">
          <div class="level">
            <div class="level-item">
              <div class="is-item has-text-centered">
                <router-link to="/">
                <h1 class="title">Matt O'Tousa</h1>
                <span class="subtitle">Front End Developer</span>
                </router-link>
              </div>
            </div>
          </div>
        </transition>

        <transition name="fade" appear mode="out-in">
          <div class="level">
            <div class="level-item">
          </div>
          <div class="level-item social-link">
            <a href="https://github.com/Tattomoosa">
                <b-icon icon="github-circle" />
            </a>
          </div>
          <div class="level-item social-link">
            <a href="https://twitter.com/mlotousa">
                <b-icon icon="twitter" />
            </a>
          </div>
          <div class="level-item social-link">
            <a href="https://stackoverflow.com/users/6344525/matt-otousa">
                <b-icon icon="stack-overflow" />
            </a>
          </div>
          <div class="level-item social-link">
            <a href="https://www.linkedin.com/in/matt-otousa/">
                <b-icon icon="linkedin" />
            </a>
          </div>
          <div class="level-item">
          </div>
          </div>
        </transition>

          <div v-if="postPage" class="box full-width sidebar-links">

            <section v-if="postTOC && postTOC.length > 0">
              <h4 class="title is-6">This Post</h4>
              <ul class="sidebar-toc">
              <transition-group name="fade" appear mode="out, in">
                <a v-for="(tocElement, index) in postTOC" :key="index"
                  :href="tocElement.link">
                  <li class="li is-size-7">{{ tocElement.text }}</li>
                </a>
              </transition-group>
              </ul>
            </section>

            <!-- <h4 class="title is-6">Related</h4> -->
          </div>

          <div v-else class="box full-width sidebar-links">
            <section>
              <h4 class="title is-6">Most Popular</h4>
              <router-link to="/blog/posts-tagged/building-this-blog">
                <p class="p is-size-7">
                  Building this blog with Vue and Firebase
                </p>
              </router-link>
              <router-link to="/blog/posts-tagged/string-theory/">
                <p class="p is-size-7">
                  String Theory T-Shirt Co
                </p>
              </router-link>
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
                Most content is rendered from Markdown
                using vue-markdown and markdown-it.
                Everything is dynamic, driven by
                a Firebase Firestore.
              </p>
            </section>
          </div>

        </div>
      <!-- </transition> -->
      </div>

    </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import navImage from '@/assets/mo-logo.png'
import MoEffect from './MoEffect'
export default {
  name: 'SideBar',
  data () {
    return {
      navImage
    }
  },
  components: {
    MoEffect
  },
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
  position: relative;
}
.box.is-profile {
  padding: 16px;
}
.img-shadow {
  position: absolute;
  width: 100%;
  height: 100%;
  box-shadow: inset 2px 3px 3px 0 rgba(0, 0,0,.2);
  border-radius: 50%;
  top: 0;
  left: 0;
}
.full-width {
  width: 100%;
}
@media screen and (min-width: 1000px) {
  .side-bar {
    position: fixed;
    max-width: 300px;
    margin-left: 20px;
  }
}
@media screen and (min-width: 1400px) {
  .side-bar {
    position: fixed;
    max-width: 360px;
    margin-left: 30px;
    padding-left: 30px;
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

.social-link span i {
  color: #363636 !important;
  transition: 2s ease-out;
}

.social-link:hover span i {
  transform: scale(1.6,1.6);
  transition: .6s ease-out;
  color: #2aa484 !important;
}
ul.sidebar-toc {
  list-style-type: disc;
  margin-left: 10px;
}
</style>
