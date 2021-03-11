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
import {computed, defineComponent} from 'vue';
import {COLUMN_NAME_ACTIONS} from '@/constants/table';
import {TASK_STATUS_FINISHED} from '@/constants/task';
import Table from '@/components/table/Table.vue';

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
        status: TASK_STATUS_FINISHED,
        pid: 1,
      },
      {
        spider_name: 'Spider 2',
        node_name: 'Worker 1',
        status: TASK_STATUS_FINISHED,
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
        width: '150',
      },
      {
        key: 'node_name',
        label: 'Node',
        width: '150',
      },
      {
        key: 'status',
        label: 'Status',
        width: '100',
      },
      {
        key: 'pid',
        label: 'PID',
        width: '100',
      },
      {
        key: 'mode',
        label: 'Mode',
        width: '100',
      },
      {
        key: 'schedule_name',
        label: 'Schedule',
        width: '150',
      },
      {
        key: 'cmd',
        label: 'Command',
        width: '120',
      },
      {
        key: 'param',
        label: 'Params',
        width: '120',
      },
      {
        key: 'error',
        label: 'Error',
        width: '120',
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
