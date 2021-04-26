import {useRouter} from 'vue-router';
import {useStore} from 'vuex';
import {computed, h} from 'vue';
import {TABLE_COLUMN_NAME_ACTIONS} from '@/constants/table';
import useList from '@/layouts/list';
import NavLink from '@/components/nav/NavLink.vue';
import ColorPicker from '@/components/color/ColorPicker.vue';

const useTagList = () => {
  // router
  const router = useRouter();

  // store
  const ns = 'tag';
  const store = useStore<RootStoreState>();
  const {commit} = store;
  const state = store.state[ns];

  // nav actions
  const navActions = computed<ListActionGroup[]>(() => [
    {
      name: 'common',
      children: [
        {
          buttonType: 'label',
          label: 'New Tag',
          tooltip: 'New Tag',
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
  const tableColumns = computed<TableColumns<Tag>>(() => [
    {
      key: 'name',
      label: 'Name',
      icon: ['fa', 'font'],
      width: '160',
      align: 'left',
      value: (row: Tag) => h(NavLink, {
        path: `/tags/${row._id}`,
        label: row.name,
      }),
    },
    {
      key: 'color',
      label: 'Color',
      icon: ['fa', 'palette'],
      width: '120',
      value: ({color}: Tag) => {
        return h(ColorPicker, {
          modelValue: color,
          disabled: true,
        });
      }
    },
    {
      key: 'description',
      label: 'Description',
      icon: ['fa', 'comment-alt'],
      width: 'auto',
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
            router.push(`/tags/${row._id}`);
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

  // options
  const opts = {
    navActions,
    tableColumns,
  } as UseListOptions<Tag>;

  return {
    ...useList<Tag>(ns, store, opts),
  };
};

export default useTagList;
