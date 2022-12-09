import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Update from '@/components/Update'
import AddCar from'@/components/addCar'
import QueryByVim from'@/components/QueryByVim'
import App from '@/App'
import Login from '@/components/Login'
Vue.use(Router)

export default new Router({
  routes: [
    
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: Home
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
      name:'QueryByVim',
      component:QueryByVim
    }
  ]
})
