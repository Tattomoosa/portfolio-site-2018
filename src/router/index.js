import Vue from 'vue'
import Router from 'vue-router'
import PostList from '@/components/PostList'
import PostWriter from '@/components/PostWriter'
import FileUploader from '@/components/FileUploader'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PostList',
      component: PostList
    },
    {
      path: '/post-writer',
      name: 'PostWriter',
      component: PostWriter
    },
    {
      path: '/file-uploader',
      name: 'FileUploader',
      component: FileUploader
    }
  ]
})
