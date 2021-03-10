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
        component: () => import('@/views/node/list/NodeList.vue'),
      },
      {
        path: 'projects',
        name: 'ProjectList',
        component: () => import('@/views/project/list/ProjectList.vue'),
      },
      {
        path: 'spiders',
        name: 'SpiderList',
        component: () => import('@/views/spider/list/SpiderList.vue'),
      },
      {
        path: 'spiders/:id',
        redirect: to => {
          return {path: to.path + '/overview'};
        },
        component: () => import('@/views/spider/detail/SpiderDetail.vue'),
        children: [
          {
            path: 'overview',
            component: () => import('@/views/spider/detail/tabs/SpiderDetailTabOverview.vue'),
          },
          {
            path: 'files',
            component: () => import('@/views/spider/detail/tabs/SpiderDetailTabFiles.vue'),
          },
          {
            path: 'tasks',
            component: () => import('@/views/spider/detail/tabs/SpiderDetailTabTasks.vue'),
          },
          {
            path: 'settings',
            component: () => import('@/views/spider/detail/tabs/SpiderDetailTabSettings.vue'),
          },
        ]
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
