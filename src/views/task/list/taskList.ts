import useList from '@/layouts/list';
import {useStore} from 'vuex';
import {getDefaultUseListOptions} from '@/utils/list';
import {h} from 'vue';
import SpiderTag from '@/components/spider/SpiderTag.vue';

const useTaskList = () => {
  const ns = 'task';
  const store = useStore<RootStoreState>();
  const {commit} = store;

  // nav actions
  const navActions: ListActionGroup[] = [
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
  ];

  // table columns
  const tableColumns: TableColumns<Task> = [
    {
      key: 'name',
      label: 'Name',
      icon: ['fa', 'font'],
      width: '150',
    },
    {
      key: 'spider',
      label: 'Spider',
      icon: ['fa', 'spider'],
      width: '200',
      value: (row: Task) => {
        return h(SpiderTag, {spider: row.spider} as SpiderTagProps, []);
      },
    }
  ];

  // options
  const opts = getDefaultUseListOptions<Task>(navActions, tableColumns);

  return {
    ...useList<Task>(ns, store, opts),
  };
};

export default useTaskList;
