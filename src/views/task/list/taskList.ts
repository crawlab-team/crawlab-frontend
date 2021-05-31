import useList from '@/layouts/list';
import {useStore} from 'vuex';
import {computed, h, onBeforeMount, onBeforeUnmount, onMounted} from 'vue';
import NavLink from '@/components/nav/NavLink.vue';
import TaskStatus from '@/components/task/TaskStatus.vue';
import {TABLE_COLUMN_NAME_ACTIONS} from '@/constants/table';
import {useRouter} from 'vue-router';
import {ElMessage, ElMessageBox} from 'element-plus';
import useRequest from '@/services/request';

const {
  post,
} = useRequest();

const useTaskList = () => {
  const ns = 'task';
  const store = useStore<RootStoreState>();
  const {commit} = store;

  // router
  const router = useRouter();

  // use list
  const {
    actionFunctions,
  } = useList<Task>(ns, store);

  // action functions
  const {
    deleteByIdConfirm,
  } = actionFunctions;

  // all spider dict
  const allSpiderDict = computed<Map<string, Spider>>(() => store.getters['spider/allDict']);

  // nav actions
  const navActions = computed<ListActionGroup[]>(() => [
    {
      name: 'common',
      children: [
        {
          buttonType: 'label',
          label: 'New Task',
          tooltip: 'New Task',
          icon: ['fa', 'plus'],
          type: 'success',
          onClick: () => {
            commit(`${ns}/showDialog`, 'create');
          }
        }
      ]
    }
  ]);

  // table columns
  const tableColumns = computed<TableColumns<Task>>(() => [
    {
      key: 'spider',
      label: 'Spider',
      icon: ['fa', 'spider'],
      width: '200',
      value: (row: Task) => {
        if (!row.spider_id) return;
        const spider = allSpiderDict.value.get(row.spider_id);
        return h(NavLink, {
          label: spider?.name,
          path: `/spiders/${spider?._id}`,
        });
      },
    },
    {
      key: 'status',
      label: 'Status',
      icon: ['fa', 'heartbeat'],
      width: '120',
      value: (row: Task) => {
        return h(TaskStatus, {status: row.status} as TaskStatusProps);
      },
    },
    {
      key: TABLE_COLUMN_NAME_ACTIONS,
      label: 'Actions',
      icon: ['fa', 'tools'],
      width: '180',
      fixed: 'right',
      buttons: [
        {
          type: 'primary',
          size: 'mini',
          icon: ['fa', 'search'],
          tooltip: 'View',
          onClick: (row) => {
            router.push(`/tasks/${row._id}`);
          }
        },
        {
          type: 'warning',
          size: 'mini',
          icon: ['fa', 'redo'],
          tooltip: 'Restart',
          onClick: async (row) => {
            await ElMessageBox.confirm('Are you sure to restart?', 'Restart', {type: 'warning'});
            await post(`/tasks/${row._id}/restart`);
            await ElMessage.success('Restarted successfully');
            await store.dispatch(`task/getList`);
          }
        },
        {
          type: 'danger',
          size: 'mini',
          icon: ['fa', 'trash-alt'],
          tooltip: 'Delete',
          onClick: deleteByIdConfirm,
        },
      ],
      disableTransfer: true,
    },
  ]);

  // options
  const opts = {
    navActions,
    tableColumns,
  } as UseListOptions<Task>;

  // fetch all list
  onBeforeMount(async () => {
    await Promise.all([
      store.dispatch(`spider/getAllList`),
      store.dispatch(`project/getAllList`),
    ]);
  });

  // auto update
  let autoUpdateHandle: NodeJS.Timeout;
  onMounted(() => {
    autoUpdateHandle = setInterval(async () => {
      await store.dispatch(`task/getList`);
    }, 5000);
  });
  onBeforeUnmount(() => {
    clearInterval(autoUpdateHandle);
  });

  return {
    ...useList<Task>(ns, store, opts),
  };
};

export default useTaskList;
