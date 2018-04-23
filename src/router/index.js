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
      name: 'PostList',
      component: PostList
    },
    {
      path: '/post-writer/',
      name: 'NewPost',
      component: PostWriter,
    },
    {
      path: '/post-writer/:postID',
      name: 'EditPost',
      component: PostWriter,
      props: 'postID'
    },
    {
      path: '/file-uploader',
      name: 'FileUploader',
      component: FileUploader
    },
    {
      path: '/post/:postID',
      name: 'PostPage',
      component: PostPage,
      props: 'postID'
    }
  ]
})
