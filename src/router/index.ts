import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import login from '@/router/login';
import home from '@/router/home';
import node from '@/router/node';
import project from '@/router/project';
import spider from '@/router/spider';
import task from '@/router/task';
import schedule from '@/router/schedule';
import user from '@/router/user';
import tag from '@/router/tag';
import token from '@/router/token';
import {initRouterAuth} from '@/router/auth';

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
      ...tag,
      ...token,
    ],
  },
];

export const menuItems: MenuItem[] = [
  {path: '/', title: 'Home', icon: ['fa', 'home']},
  {path: '/nodes', title: 'Nodes', icon: ['fa', 'server']},
  {path: '/projects', title: 'Projects', icon: ['fa', 'project-diagram']},
  {path: '/spiders', title: 'Spiders', icon: ['fa', 'spider']},
  {path: '/schedules', title: 'Schedules', icon: ['fa', 'clock']},
  {path: '/tasks', title: 'Tasks', icon: ['fa', 'tasks']},
  {path: '/users', title: 'Users', icon: ['fa', 'users']},
  {path: '/tags', title: 'Tags', icon: ['fa', 'tag']},
  {path: '/tokens', title: 'Tokens', icon: ['fa', 'key']},
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

initRouterAuth(router);

export default router;
