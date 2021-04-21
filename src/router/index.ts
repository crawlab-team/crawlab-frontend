import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import node from '@/router/node';
import project from '@/router/project';
import spider from '@/router/spider';
import home from '@/router/home';
import schedule from '@/router/schedule';
import user from '@/router/user';
import task from '@/router/task';
import login from '@/router/login';

export const routes: Array<RouteRecordRaw> = [
  ...login,
  {
    path: '/',
    name: '',
    component: () => import('@/layouts/BasicLayout.vue'),
    children: [
      ...home,
      ...node,
      ...project,
      ...spider,
      ...task,
      ...schedule,
      ...user,
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
