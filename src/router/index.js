import Vue from 'vue'
import Router from 'vue-router'
import PostListPage from '@/components/PostListPage'
import PostWriter from '@/components/PostWriter'
import PostPage from '@/components/PostPage.vue'
import HomePage from '@/components/HomePage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage,
      meta: { alwaysScrollToTop: true }
    },
    {
      path: '/blog/post-writer',
      name: 'New Post',
      component: PostWriter
    },
    {
      path: '/blog',
      name: 'Most Recent Posts',
      component: PostListPage,
      props: {
        type: 'all',
        order: 'published-on',
        value: ''
      }
    },
    {
      path: '/blog/posts-tagged/:value',
      name: 'Most Recent Posts',
      component: PostListPage,
      props: {
        type: 'with-tag',
        order: 'published-on'
      }
    },
    {
      path: '/blog/post-writer/:postID',
      name: 'Edit Post',
      component: PostWriter
      // props: 'postID'
    },
    {
      path: '/blog/post/:postID',
      name: 'Post Page',
      component: PostPage,
      meta: { alwaysScrollToTop: true }
      // props: 'postID'
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    let scrollPosition = { x: 0, y: 0 }
    if (!to.matched.some(record => record.meta.alwaysScrollToTop)) {
      if (savedPosition) scrollPosition = savedPosition
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(scrollPosition)
      }, 500)
    })
  }
})
