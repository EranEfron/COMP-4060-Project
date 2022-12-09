import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home_page'
import Update from '@/components/Update'
import AddCar from '@/components/addCar'
import QueryByVim from '@/components/QueryByVim'
import Login from '@/components/Login'
import Register from '@/components/Register'
Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/home',
      name: 'Home',
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
      path: '/addCar',
      name: 'AddCar',
      component: AddCar
    },
    {
      path: '/update',
      name: 'Update',
      component: Update
    },
    {
      path: '/querybyvim',
      name: 'QueryByVim',
      component: QueryByVim
    }
  ]
})
