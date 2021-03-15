<template>
  <div class="schedule-list">
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
import Switch from '@/components/switch/Switch.vue';
import {TASK_MODE_RANDOM, TASK_MODE_SELECTED_NODES} from '@/constants/task';
import Table from '@/components/table/Table.vue';
import {COLUMN_NAME_ACTIONS} from '@/constants/table';
import TaskMode from '@/components/task/TaskMode.vue';

export default defineComponent({
  name: 'ScheduleList',
  components: {
    Table,
  },
  setup(props, {emit}) {
    // table data
    const tableData: TableData<Schedule> = [
      {
        name: 'Schedule Daily',
        description: 'This is a scheduled task running everyday',
        spider_name: 'Spider 1',
        cron: '0 0 * * *',
        param: '--level DEBUG',
        mode: TASK_MODE_RANDOM,
        enabled: true,
      },
      {
        name: 'Schedule Hourly',
        description: 'This is a scheduled task running every hour',
        spider_name: 'Spider 2',
        cron: '0 * * * *',
        param: '--level DEBUG',
        mode: TASK_MODE_SELECTED_NODES,
        node_names: ['Worker 1'],
        enabled: true,
      },
    ];

    // TODO: implement with real data
    const tableTotal = computed(() => tableData.length);

    // table columns
    const tableColumns: TableColumns<Schedule> = [
      {
        key: 'name',
        label: 'Name',
        icon: ['fa', 'font'],
        width: '150',
      },
      {
        key: 'description',
        label: 'Description',
        icon: ['fa', 'comment-alt'],
        width: '200',
      },
      {
        key: 'spider_name',
        label: 'Spider',
        icon: ['fa', 'spider'],
        width: '150',
      },
      {
        key: 'cron',
        label: 'Cron Expression',
        icon: ['fa', 'clock'],
        width: '150',
      },
      {
        key: 'param',
        label: 'Params',
        icon: ['fa', 'bars'],
        width: '120',
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
        key: 'node_names',
        label: 'Nodes',
        icon: ['fa', 'server'],
        width: '150',
      },
      {
        key: 'enabled',
        label: 'Enabled',
        icon: ['fa', 'toggle-on'],
        width: '80',
        value: (row: Schedule) => {
          return h(Switch, {value: row.enabled});
        }
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
