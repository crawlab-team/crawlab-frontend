<template>
  <div class="task-list">
    <div class="content">
      <Table
          :columns="tableColumns"
          :data="tableData"
          :total="tableTotal"
          selectable
      />
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, h} from 'vue';
import {COLUMN_NAME_ACTIONS} from '@/constants/table';
import {
  TASK_MODE_ALL,
  TASK_MODE_RANDOM,
  TASK_MODE_SELECTED_NODE_TAGS,
  TASK_MODE_SELECTED_NODES,
  TASK_STATUS_ABNORMAL,
  TASK_STATUS_CANCELLED,
  TASK_STATUS_ERROR,
  TASK_STATUS_FINISHED,
  TASK_STATUS_PENDING,
  TASK_STATUS_RUNNING
} from '@/constants/task';
import Table from '@/components/table/Table.vue';
import TaskStatus from '@/components/task/TaskStatus.vue';
import TaskMode from '@/components/task/TaskMode.vue';

export default defineComponent({
  name: 'TaskList',
  components: {
    Table,
  },
  setup(props, {emit}) {
    // table data
    const tableData: TableData<Task> = [
      {
        spider_name: 'Spider 1',
        node_name: 'Master',
        status: TASK_STATUS_PENDING,
        pid: 1,
        mode: TASK_MODE_RANDOM,
      },
      {
        spider_name: 'Spider 2',
        node_name: 'Worker 1',
        status: TASK_STATUS_RUNNING,
        pid: 1,
        mode: TASK_MODE_ALL,
      },
      {
        spider_name: 'Spider 2',
        node_name: 'Worker 1',
        status: TASK_STATUS_FINISHED,
        pid: 1,
        mode: TASK_MODE_SELECTED_NODES,
      },
      {
        spider_name: 'Spider 2',
        node_name: 'Worker 1',
        status: TASK_STATUS_ERROR,
        pid: 1,
        mode: TASK_MODE_SELECTED_NODE_TAGS,
      },
      {
        spider_name: 'Spider 2',
        node_name: 'Worker 1',
        status: TASK_STATUS_CANCELLED,
        pid: 1,
      },
      {
        spider_name: 'Spider 2',
        node_name: 'Worker 1',
        status: TASK_STATUS_ABNORMAL,
        pid: 1,
      },
      {
        spider_name: 'Spider 2',
        node_name: 'Worker 1',
        pid: 1,
      }
    ];

    // TODO: implement with real data
    const tableTotal = computed(() => tableData.length);

    // table columns
    const tableColumns: TableColumns<Task> = [
      {
        key: 'spider_name',
        label: 'Spider',
        icon: ['fa', 'spider'],
        width: '150',
        hasFilter: true,
      },
      {
        key: 'node_name',
        label: 'Node',
        icon: ['fa', 'server'],
        width: '150',
        hasFilter: true,
      },
      {
        key: 'status',
        label: 'Status',
        icon: ['fa', 'heartbeat'],
        width: '100',
        value: (row: Task) => {
          return h(TaskStatus, {status: row.status});
        },
        hasFilter: true,
      },
      {
        key: 'mode',
        label: 'Mode',
        icon: ['fa', 'list-ul'],
        width: '100',
        hasFilter: true,
        value: (row: Task) => {
          return h(TaskMode, {mode: row.mode});
        }
      },
      {
        key: 'pid',
        label: 'PID',
        icon: ['fa', 'list-ol'],
        width: '100',
      },
      {
        key: 'schedule_name',
        label: 'Schedule',
        icon: ['fa', 'clock'],
        width: '150',
      },
      {
        key: 'cmd',
        label: 'Command',
        icon: ['fa', 'terminal'],
        width: '120',
      },
      {
        key: 'param',
        label: 'Params',
        icon: ['fa', 'bars'],
        width: '120',
      },
      {
        key: 'error',
        label: 'Error',
        icon: ['fa', 'exclamation-circle'],
        width: '120',
      },
      {
        key: COLUMN_NAME_ACTIONS,
        label: 'Actions',
        icon: ['fa', 'tools'],
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
    ];

    return {
      tableData,
      tableTotal,
      tableColumns,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
