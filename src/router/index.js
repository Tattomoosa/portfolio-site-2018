import Vue from 'vue'
import Router from 'vue-router'
import PostListPage from '@/components/PostListPage'
import PostWriter from '@/components/PostWriter'
import FileUploader from '@/components/FileUploader'
import PostPage from '@/components/PostPage.vue'
import HomePage from '@/components/HomePage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage,
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
        order: 'published-on',
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
      component: PostPage
      // props: 'postID'
    }
  ]
})
