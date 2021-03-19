<template>
  <div class="spider-list">
    <div class="content">
      <NavActions ref="navActions" class="nav-actions">
        <NavActionGroup>
          <NavActionItem>
            <LabelButton
                :icon="['fa', 'plus']"
                label="New Spider"
                size="mini"
                tooltip="New Spider"
                type="success"
                @click="onClickCreate"
            />
          </NavActionItem>
        </NavActionGroup>
      </NavActions>
      <Table
          :columns="tableColumns"
          :data="tableData"
          :total="tableTotal"
          selectable
          @selection-change="onSelect"
      >
        <template #actions-prefix>
          <FaIconButton
              :disabled="selection.length === 0"
              :icon="['fa', 'play']"
              class="action-btn"
              size="mini"
              tooltip="Run"
              type="success"
              @click="onClickRun"
          />
        </template>
      </Table>
    </div>
  </div>

  <!-- Dialogs (handled by store) -->
  <CreateSpiderDialog/>
  <!-- ./Dialogs -->
</template>

<script lang="ts">
import {defineComponent, h, ref} from 'vue';
import Table from '@/components/table/Table.vue';
import NavActions from '@/components/nav/NavActions.vue';
import NavActionGroup from '@/components/nav/NavActionGroup.vue';
import NavActionItem from '@/components/nav/NavActionItem.vue';
import {useRouter} from 'vue-router';
import {COLUMN_NAME_ACTIONS} from '@/constants/table';
import FaIconButton from '@/components/button/FaIconButton.vue';
import CreateSpiderDialog from '@/components/spider/CreateSpiderDialog.vue';
import {useStore} from 'vuex';
import TaskStatus from '@/components/task/TaskStatus.vue';
import {
  TASK_STATUS_ABNORMAL,
  TASK_STATUS_CANCELLED,
  TASK_STATUS_ERROR,
  TASK_STATUS_FINISHED,
  TASK_STATUS_PENDING,
  TASK_STATUS_RUNNING
} from '@/constants/task';
import SpiderType from '@/components/spider/SpiderType.vue';
import {SPIDER_TYPE_CONFIGURABLE, SPIDER_TYPE_CUSTOMIZED} from '@/constants/spider';
import LabelButton from '@/components/button/LabelButton.vue';

export default defineComponent({
  name: 'SpiderList',
  components: {
    LabelButton,
    CreateSpiderDialog,
    FaIconButton,
    NavActions,
    NavActionItem,
    NavActionGroup,
    Table,
  },
  setup() {
    // router
    const router = useRouter();

    // store
    const storeNamespace = 'spider';
    const store = useStore<RootStoreState>();
    const {commit} = store;
    const {dialogVisible} = store.state.spider as SpiderStoreState;

    // TODO: dummy data
    const spiderTypes = [
      SPIDER_TYPE_CUSTOMIZED,
      SPIDER_TYPE_CONFIGURABLE,
    ];
    const projectNames = ['Project 1', 'Project 2', 'Project 3'];
    const statuses = [
      TASK_STATUS_PENDING,
      TASK_STATUS_RUNNING,
      TASK_STATUS_FINISHED,
      TASK_STATUS_ERROR,
      TASK_STATUS_CANCELLED,
      TASK_STATUS_ABNORMAL,
    ];

    // table data
    const tableData: Spider[] = (() => {
      const data: Spider[] = [];
      for (let i = 0; i < 10; i++) {
        const _id = (i + 1).toString();
        const name = `spider-${_id}`;
        const display_name = `Spider ${_id}`;
        const spider_type = spiderTypes[Math.floor(Math.random() * spiderTypes.length)];
        const project_name = projectNames[Math.floor(Math.random() * projectNames.length)];
        const last_status = statuses[Math.floor(Math.random() * statuses.length)];
        const last_run_ts = '10s';
        const update_ts = '3/11/2021, 10:20:29 PM';
        const create_ts = '3/11/2021, 10:20:29 PM';
        const create_username = 'admin';
        data.push({
          _id,
          name,
          display_name,
          spider_type,
          project_name,
          last_status,
          last_run_ts,
          update_ts,
          create_ts,
          create_username,
        });
      }
      return data;
    })();

    // table columns
    const tableColumns: TableColumns<Spider> = [
      {
        key: 'display_name',
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
        key: 'project_name',
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
          return h(TaskStatus, {status: row.last_status});
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
        key: COLUMN_NAME_ACTIONS,
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
    ];
    const tableTotal = 100;

    const selection = ref<Spider[]>([]);
    const onSelect = (value: Spider[]) => {
      selection.value = value;
    };

    const onClickCreate = () => {
      commit(`${storeNamespace}/showDialog`, 'create');
    };

    const onClickEdit = () => {
      commit(`${storeNamespace}/showDialog`, 'edit');
    };

    const onClickClone = () => {
      commit(`${storeNamespace}/showDialog`, 'clone');
    };

    const onClickRun = () => {
      commit(`${storeNamespace}/showDialog`, 'run');
    };

    return {
      dialogVisible,
      tableData,
      tableColumns,
      tableTotal,
      selection,
      onSelect,
      onClickCreate,
      onClickEdit,
      onClickClone,
      onClickRun,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../../../styles/variables.scss";

.spider-list {
  .nav-actions {
    border-bottom: none;
  }

  .content {
    background-color: $containerWhiteBg;
  }
}
</style>
