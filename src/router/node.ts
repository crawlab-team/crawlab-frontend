import {RouteRecordRaw} from 'vue-router';
import {TAB_NAME_OVERVIEW} from '@/constants/tab';

const endpoint = 'nodes';

export default [
  {
    path: endpoint,
    component: import('@/views/node/list/NodeList.vue'),
    children: [
      {
        path: `${endpoint}/:id`,
        redirect: to => {
          return {path: to.path + '/' + TAB_NAME_OVERVIEW};
        },
        component: () => import('@/views/node/detail/NodeDetail.vue'),
        children: [
          {
            path: TAB_NAME_OVERVIEW,
            component: () => import('@/views/node/detail/tabs/NodeDetailTabOverview.vue'),
          }
        ]
      }
    ]
  },
] as Array<RouteRecordRaw>;
