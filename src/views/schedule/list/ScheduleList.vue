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
        width: '150',
      },
      {
        key: 'description',
        label: 'Description',
        width: '200',
      },
      {
        key: 'spider_name',
        label: 'Spider',
        width: '150',
      },
      {
        key: 'cron',
        label: 'Cron Expression',
        width: '120',
      },
      {
        key: 'param',
        label: 'Params',
        width: '120',
      },
      {
        key: 'mode',
        label: 'Mode',
        width: '120',
      },
      {
        key: 'node_names',
        label: 'Nodes',
        width: '150',
      },
      {
        key: 'enabled',
        label: 'Enabled',
        width: '80',
        value: (row: Schedule) => {
          return h(Switch, {value: row.enabled});
        }
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
