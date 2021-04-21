import {RouteRecordRaw} from 'vue-router';
import {TAB_NAME_OVERVIEW} from '@/constants/tab';

const endpoint = 'schedules';

export default [
  {
    path: endpoint,
    component: import('@/views/schedule/list/ScheduleList.vue'),
    children: [
      {
        path: `${endpoint}/:id`,
        redirect: to => {
          return {path: to.path + '/' + TAB_NAME_OVERVIEW};
        },
        component: () => import('@/views/schedule/detail/ScheduleDetail.vue'),
        children: [
          {
            path: TAB_NAME_OVERVIEW,
            component: () => import('@/views/schedule/detail/tabs/ScheduleDetailTabOverview.vue'),
          }
        ]
      }
    ]
  },
] as Array<RouteRecordRaw>;
