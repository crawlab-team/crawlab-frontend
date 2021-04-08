import {h} from 'vue';
import ProjectTag from '@/components/project/ProjectTag.vue';
import {COLUMN_NAME_ACTIONS} from '@/constants/table';
import {useStore} from 'vuex';
import {ElMessageBox} from 'element-plus';
import useList from '@/layouts/list';
import useProjectService from '@/services/project/projectService';

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

  // services
  const {
    deleteById,
    getList,
  } = useProjectService(store);

  // nav actions
  const navActions: ListActionGroup[] = [
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
  ];

  // table columns
  const tableColumns: TableColumns<Project> = [
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
          type: 'warning',
          icon: ['fa', 'edit'],
          tooltip: 'Edit',
          onClick: (row) => {
            store.commit('');
          },
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
              await deleteById(row._id as string);
            }
            await getList();
          },
        },
      ],
      disableTransfer: true,
    }
  ];

  // options
  const opts = {
    navActions,
    tableColumns,
  } as UseListOptions<Project>;

  return {
    ...useList<Project>(storeNamespace, store, opts),
  };
};

export default useProjectList;
