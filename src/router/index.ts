import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import Home from '../views/home/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/Login.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/login/Login.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
