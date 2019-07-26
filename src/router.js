import Vue from 'vue';
import Router from 'vue-router';
import Container from './MainContainer';
import Login from './Login';
import Home from './views/Home.vue';
import test from "./views/test.vue";
import ex from "./views/ex.vue";
import axios from 'axios';

Vue.use(Router);

var router = new Router({
  routes: [
    {
      path:'/',
      component: Container,
      children:[
        {
          path: '/',
          name: 'home',
          component: Home
        },
        {
          path: '/test',
          name: 'test',
          component: test
        },
        {
          path: '/ex',
          name: 'ex',
          component: ex
        },
      ]
    },
    {
      path:'/login',
      name:'login',
      component:Login
    }
  ]
});
router.beforeEach((to,from,next) => {
  if (to.path != '/login') {
    let name = localStorage.getItem('name') || '';
    let psw = localStorage.getItem('psw') || '';
    axios.post(
      '/login',
      {
        name:name,
        psw:psw
      }
    ).then(resp => {
      if (resp.status == 200) {
        next()
      } else {
        next('login')
      }
    }).catch(err => {
      next('login');
    })
  } else {
    next();
  }
});
export default router;