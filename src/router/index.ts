import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import Home from '../views/home/Home.vue';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/Login.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/login/Login.vue')
  },
  {
    path: '/',
    name: '',
    component: () => import('../layouts/BasicLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/home/Home.vue')
      },
      {
        path: 'spiders',
        name: 'SpiderList',
        component: () => import('../views/spider/SpiderList.vue')
      }
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
