import {useRouter} from 'vue-router';
import {useStore} from 'vuex';
import {computed, h, readonly} from 'vue';
import SpiderType from '@/components/spider/SpiderType.vue';
import TaskStatus from '@/components/task/TaskStatus.vue';
import {TABLE_COLUMN_NAME_ACTIONS} from '@/constants/table';
import useList from '@/layouts/list';
import Table from '@/components/table/Table.vue';

const useSpiderList = () => {
  // router
  const router = useRouter();

  // store
  const ns = 'spider';
  const store = useStore<RootStoreState>();
  const {commit} = store;

  // nav actions
  const navActions = readonly<ListActionGroup[]>([
    {
      name: 'common',
      children: [
        {
          buttonType: 'label',
          label: 'New Spider',
          tooltip: 'New Spider',
          icon: ['fa', 'plus'],
          type: 'success',
          onClick: () => {
            commit(`${ns}/showDialog`, 'create');
          }
        }
      ]
    }
  ]);

  // TODO: dummy data
  const projectNames = ['Project 1', 'Project 2', 'Project 3'];

  // table columns
  const tableColumns = readonly<TableColumns<Spider>>([
    {
      key: 'name',
      label: 'Name',
      icon: ['fa', 'font'],
      width: '160',
      align: 'left',
      hasFilter: true,
    },
    {
      key: 'spider_type',
      label: 'Spider Type',
      icon: ['fa', 'list'],
      width: '120',
      filterItems: [
        {label: 'Customized', value: 'customized'},
        {label: 'Configurable', value: 'configurable'},
      ],
      hasFilter: true,
      value: (row: Spider) => {
        return h(SpiderType, {type: row.spider_type});
      }
    },
    {
      key: 'project_id',
      label: 'Project',
      icon: ['fa', 'project-diagram'],
      width: '120',
      filterItems: () => {
        const arr: SelectOption[] = [];
        projectNames.forEach((d, i) => {
          arr.push({label: d, value: (i + 1).toString()});
        });
        return arr;
      },
      hasFilter: true,
    },
    // {
    //   key: 'is_long_task',
    //   label: 'Is Long Task',
    //   width: '80',
    // },
    {
      key: 'latest_tasks',
      label: 'Latest Tasks',
      icon: ['fa', 'project-diagram'],
      width: '180',
      defaultHidden: true,
    },
    {
      key: 'last_status',
      label: 'Last Status',
      icon: ['fa', 'heartbeat'],
      width: '120',
      hasFilter: true,
      value: (row: Spider) => {
        return h(TaskStatus, {status: row.last_status} as TaskStatusProps);
      }
    },
    {
      key: 'last_run_ts',
      label: 'Last Run',
      icon: ['fa', 'clock'],
      width: '160',
    },
    {
      key: 'create_ts',
      label: 'Created At',
      icon: ['far', 'calendar-plus'],
      width: '160',
    },
    {
      key: 'update_ts',
      label: 'Updated At',
      icon: ['far', 'calendar-check'],
      width: '160',
    },
    {
      key: 'create_username',
      label: 'Created By',
      icon: ['fa', 'user'],
      width: '100',
      hasFilter: true,
    },
    {
      key: 'remark',
      label: 'Remark',
      icon: ['fa', 'comment-alt'],
      width: '140',
    },
    {
      key: TABLE_COLUMN_NAME_ACTIONS,
      label: 'Actions',
      icon: ['fa', 'tools'],
      width: '180',
      fixed: 'right',
      buttons: [
        {
          type: 'success',
          size: 'mini',
          icon: ['fa', 'play'],
          tooltip: 'Run',
          onClick: (row) => {
            console.log('run', row);
          }
        },
        {
          type: 'primary',
          size: 'mini',
          icon: ['fa', 'search'],
          tooltip: 'View',
          onClick: (row) => {
            router.push(`/spiders/${row._id}`);
          }
        },
        {
          type: 'info',
          size: 'mini',
          icon: ['fa', 'clone'],
          tooltip: 'Clone',
          onClick: (row) => {
            console.log('clone', row);
          }
        },
        {
          type: 'danger',
          size: 'mini',
          icon: ['fa', 'trash-alt'],
          tooltip: 'Delete',
          onClick: (row) => {
            console.log('delete', row);
          }
        },
      ],
      disableTransfer: true,
    },
  ]);

  // table actions prefix
  const tableActionsPrefix = computed<ListActionButton[]>(() => {
    return [
      {
        buttonType: 'fa-icon',
        tooltip: 'Run',
        size: 'mini',
        icon: ['fa', 'play'],
        type: 'success',
        disabled: (table: typeof Table) => {
          return !table?.internalSelection?.length;
        },
      }
    ];
  });

  // const onClickCreate = () => {
  //   commit(`${ns}/showDialog`, 'create');
  // };
  //
  // const onClickEdit = () => {
  //   commit(`${ns}/showDialog`, 'edit');
  // };
  //
  // const onClickClone = () => {
  //   commit(`${ns}/showDialog`, 'clone');
  // };

  // const onClickRun = () => {
  //   commit(`${ns}/showDialog`, 'run');
  // };

  // options
  const opts = {
    navActions,
    tableColumns,
  } as UseListOptions<Spider>;

  return {
    ...useList<Spider>(ns, store, opts),
    tableActionsPrefix,
  };
};

export default useSpiderList;
