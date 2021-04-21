import {RouteRecordRaw} from 'vue-router';
import {TAB_NAME_OVERVIEW} from '@/constants/tab';

const endpoint = 'projects';

export default [
  {
    path: endpoint,
    component: () => import('@/views/project/list/ProjectList.vue'),
  },
  {
    path: `${endpoint}/:id`,
    redirect: to => {
      return {path: to.path + '/overview'};
    },
    component: () => import('@/views/project/detail/ProjectDetail.vue'),
    children: [
      {
        path: TAB_NAME_OVERVIEW,
        component: () => import('@/views/project/detail/tabs/ProjectDetailTabOverview.vue'),
      },
    ]
  },
] as Array<RouteRecordRaw>;
