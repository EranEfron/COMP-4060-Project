import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home_page'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Upload from '@/components/UploadRecord'
import Authorization from '@/components/Authorization'
import Download from'@/components/Download'

import Home_patient from'@/components/Home_page_patient'
import Download_patient from'@/components/Download_patient'

Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/home_page',
      name: 'Home_page',
      component: Home
    },
    {
      path: '/home_page_patient',
      name: 'Home_page_patient',
      component: Home_patient
    },
    {
      path: '/download_patient',
      name: 'Download_patient',
      component: Download_patient
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/download',
      name: 'Download',
      component: Download
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
      path: '/authorization',
      name: 'Authorization',
      component: Authorization
    }
  ]
})
