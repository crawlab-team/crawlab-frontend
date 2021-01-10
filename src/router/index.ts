import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login.vue'),
  },
  {
    path: '/',
    name: '',
    component: () => import('@/layouts/BasicLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/home/Home.vue'),
      },
      {
        path: 'nodes',
        name: 'NodeList',
        component: () => import('@/views/node/NodeList.vue'),
      },
      {
        path: 'spiders',
        name: 'SpiderList',
        component: () => import('@/views/spider/SpiderList.vue'),
      },
      {
        path: 'spiders/:id',
        name: 'SpiderDetail',
        component: () => import('@/views/spider/SpiderDetail.vue'),
        children: [
          {
            path: '',
            component: () => import('@/views/spider/SpiderDetailContent.vue'),
          }
        ]
      }
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
