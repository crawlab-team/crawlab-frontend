import useList from '@/layouts/list';
import {useStore} from 'vuex';
import {getDefaultUseListOptions} from '@/utils/list';
import {computed, h, onBeforeUnmount, onMounted} from 'vue';
import NodeType from '@/components/node/NodeType.vue';
import {TABLE_COLUMN_NAME_ACTIONS} from '@/constants/table';
import {ElMessageBox} from 'element-plus';
import useNodeService from '@/services/node/nodeService';
import NavLink from '@/components/nav/NavLink.vue';
import TagList from '@/components/tag/TagList.vue';
import {useRouter} from 'vue-router';
import NodeRunners from '@/components/node/NodeRunners.vue';
import Switch from '@/components/switch/Switch.vue';

type Node = CNode;

const useNodeList = () => {
  // router
  const router = useRouter();

  // store
  const ns = 'node';
  const store = useStore<RootStoreState>();
  const {commit} = store;

  // services
  const {
    getList,
    deleteById,
  } = useNodeService(store);

  // nav actions
  const navActions = computed<ListActionGroup[]>(() => [
    {
      name: 'common',
      children: [
        {
          buttonType: 'label',
          label: 'New Node',
          tooltip: 'New Node',
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
  const tableColumns = computed<TableColumns<Node>>(() => [
    {
      key: 'name',
      label: 'Name',
      icon: ['fa', 'font'],
      width: '150',
      value: (row: Node) => h(NavLink, {
        path: `/nodes/${row._id}`,
        label: row.name,
      }),
    },
    {
      key: 'type',
      label: 'Node Type',
      icon: ['fa', 'list'],
      width: '150',
      value: (row: Node) => {
        return h(NodeType, {isMaster: row.is_master} as NodeTypeProps);
      },
    },
    {
      key: 'ip',
      label: 'IP',
      icon: ['fa', 'map-marker-alt'],
      width: '150',
      defaultHidden: true,
    },
    {
      key: 'runners',
      label: 'Runners',
      icon: ['fa', 'play'],
      width: '160',
      value: (row: Node) => {
        if (row.max_runners === undefined) return;
        return h(NodeRunners, {available: row.available_runners, max: row.max_runners} as NodeRunnersProps);
      },
    },
    {
      key: 'enabled',
      label: 'Enabled',
      icon: ['fa', 'toggle-on'],
      width: '120',
      value: (row: Node) => {
        return h(Switch, {
          modelValue: row.enabled,
          'onUpdate:modelValue': async (value: boolean) => {
            row.enabled = value;
            await store.dispatch(`${ns}/updateById`, {id: row._id, form: row});
          },
        });
      },
    },
    {
      key: 'tags',
      label: 'Tags',
      icon: ['fa', 'hashtag'],
      value: ({tags}: Node) => {
        return h(TagList, {tags});
      },
      width: '150',
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
      fixed: 'right',
      width: '200',
      buttons: [
        {
          type: 'primary',
          icon: ['fa', 'search'],
          tooltip: 'View',
          onClick: (row) => {
            router.push(`/nodes/${row._id}`);
          },
        },
        // {
        //   type: 'info',
        //   size: 'mini',
        //   icon: ['fa', 'clone'],
        //   tooltip: 'Clone',
        //   onClick: (row) => {
        //     console.log('clone', row);
        //   }
        // },
        {
          type: 'danger',
          size: 'mini',
          icon: ['fa', 'trash-alt'],
          tooltip: 'Delete',
          disabled: (row: Node) => !row.active,
          onClick: async (row: Node) => {
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
  ]);

  // options
  const opts = getDefaultUseListOptions<Node>(navActions, tableColumns);

  // auto update
  let autoUpdateHandle: NodeJS.Timeout;
  onMounted(() => {
    autoUpdateHandle = setInterval(async () => {
      await store.dispatch(`${ns}/getList`);
    }, 5000);
  });
  onBeforeUnmount(() => {
    clearInterval(autoUpdateHandle);
  });

  return {
    ...useList<Node>(ns, store, opts)
  };
};

export default useNodeList;
