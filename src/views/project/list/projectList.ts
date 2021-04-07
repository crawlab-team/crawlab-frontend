import {h, readonly, ref} from 'vue';
import ProjectTag from '@/components/project/ProjectTag.vue';
import {COLUMN_NAME_ACTIONS} from '@/constants/table';
import {useStore} from 'vuex';
import useProject from '@/components/project/project';
import {ElMessageBox} from 'element-plus';
import {voidFunc} from '@/utils/func';

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

  // project
  const {
    projectList: tableData,
    projectListTotal: tableTotal,
    projectListPagination: paginationData,
    setProjectListPagination,
    dispatchGetProjectList,
    deleteProject,
    deleteProjectList,
  } = useProject(store);

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
          onClick: async (row: Project) => {
            const res = await ElMessageBox.confirm('Are you sure to delete?', 'Delete');
            if (res) {
              await deleteProject(row._id as string);
            }
            await dispatchGetProjectList();
          },
        },
      ],
      disableTransfer: true,
    }
  ]);

  // selection
  const selection = ref<TableData<Project>>([]);
  const onSelect = (value: TableData<Project>) => {
    selection.value = value;
  };

  // action functions
  const actionFunctions: ListLayoutActionFunctions = {
    getList: dispatchGetProjectList,
    editList: voidFunc,
    deleteList: deleteProjectList,
  };

  // pagination
  const onPaginationChange = (value: TablePagination) => {
    setProjectListPagination(value);
  };

  return {
    navActions,
    tableData,
    tableTotal,
    tableColumns,
    paginationData,
    actionFunctions,
    onSelect,
    onPaginationChange,
  };
};

export default useProjectList;
