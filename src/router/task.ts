import {RouteRecordRaw} from 'vue-router';
import {TAB_NAME_OVERVIEW} from '@/constants/tab';

const endpoint = 'tasks';

export default [
  {
    path: endpoint,
    component: () => import('@/views/task/list/TaskList.vue'),
  },
  {
    path: `${endpoint}/:id`,
    redirect: to => {
      return {path: to.path + '/overview'};
    },
    component: () => import('@/views/task/detail/TaskDetail.vue'),
    children: [
      {
        path: TAB_NAME_OVERVIEW,
        component: () => import('@/views/task/detail/tabs/TaskDetailTabOverview.vue'),
      },
    ]
  },
] as Array<RouteRecordRaw>;
