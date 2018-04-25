import Vue from 'vue'
import Router from 'vue-router'
import PostList from '@/components/PostList'
import PostWriter from '@/components/PostWriter'
import FileUploader from '@/components/FileUploader'
import PostPage from '@/components/PostPage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Post List',
      component: PostList
    },
    {
      path: '/post-writer',
      name: 'New Post',
      component: PostWriter
    },
    {
      path: '/most-recent-posts',
      name: 'Most Recent Posts',
      component: PostList
    },
    {
      path: '/post-writer/:postID',
      name: 'Edit Post',
      component: PostWriter,
      props: 'postID'
    },
    {
      path: '/file-uploader',
      name: 'File Uploader',
      component: FileUploader
    },
    {
      path: '/post/:postID',
      name: 'Post Page',
      component: PostPage,
      props: 'postID'
    }
  ]
})
