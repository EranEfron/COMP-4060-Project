import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home_page'
import QueryByID from '@/components/QueryByID'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Upload from '@/components/UploadRecord'
Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/home_page',
      name: 'Home_page',
      component: Home
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/upload',
      name: 'Upload',
      component: Upload
    },
    
    {
      path: '/querybyid',
      name: 'QueryByID',
      component: QueryByID
    }
  ]
})
