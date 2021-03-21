import {computed, h, readonly, ref} from 'vue';
import ProjectTag from '@/components/project/ProjectTag.vue';
import {COLUMN_NAME_ACTIONS} from '@/constants/table';
import {useStore} from 'vuex';

const useProjectList = () => {
  // TODO: dummy data
  const types = [
    'primary',
    'success',
    'warning',
    'danger',
    'info',
  ];

  // store
  const storeNamespace = 'project';
  const store = useStore<RootStoreState>();
  const {commit} = store;

  // nav actions
  const navActions = readonly<ListActionGroup[]>([
    {
      name: 'common',
      children: [
        {
          buttonType: 'label',
          label: 'New Project',
          tooltip: 'New Project',
          icon: ['fa', 'plus'],
          type: 'success',
          onClick: () => {
            commit(`${storeNamespace}/showDialog`, 'create');
          }
        }
      ]
    }
  ]);

  // table columns
  const tableColumns = readonly<TableColumns<Project>>([
    {
      key: 'name',
      label: 'Name',
      icon: ['fa', 'font'],
      width: '150',
    },
    {
      key: 'tags',
      label: 'Tags',
      icon: ['fa', 'hashtag'],
      value: (row: Project) => {
        if (!row.tags) return [];
        const tags = row.tags.map(tag => h(ProjectTag, {
          label: tag,
          type: types[Math.floor(Math.random() * types.length)],
        } as ProjectTagProps));
        return h('div', tags);
      },
      width: '200',
    },
    {
      key: 'description',
      label: 'Description',
      icon: ['fa', 'comment-alt'],
      width: '300',
    },
    {
      key: COLUMN_NAME_ACTIONS,
      label: 'Actions',
      fixed: 'right',
      width: '200',
      buttons: [
        {
          type: 'primary',
          icon: ['fa', 'search'],
          tooltip: 'View',
        },
      ],
      disableTransfer: true,
    }
  ]);

  // table data
  const tableData = ref<TableData<Project>>([
    {
      name: 'Alpha',
      description: 'Alpha Project',
      tags: ['test', 'dev'],
    },
    {
      name: 'Beta',
      description: 'Beta Project',
      tags: ['release', 'test'],
    },
  ]);

  // table total
  // TODO: dummy data
  const tableTotal = computed(() => tableData.value.length);

  // selection
  const selection = ref<TableData<Project>>([]);
  const onSelect = (value: TableData<Project>) => {
    selection.value = value;
  };

  return {
    navActions,
    tableData,
    tableTotal,
    tableColumns,
    onSelect,
  };
};

export default useProjectList;
