<template>
  <div class="user-list">
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
import Table from '@/components/table/Table.vue';
import {TABLE_COLUMN_NAME_ACTIONS} from '@/constants/table';

export default defineComponent({
  name: 'UserList',
  components: {
    Table,
  },
  setup(props, {emit}) {
    // table data
    const tableData: TableData<User> = [
      {
        username: 'admin',
        role: 'admin',
        email: 'admin@crawlab.cn'
      },
      {
        username: 'Bob',
        role: 'cto',
        email: 'bob@crawlab.cn',
      }
    ];

    // TODO: implement with real data
    const tableTotal = computed(() => tableData.length);

    // table columns
    const tableColumns: TableColumns<User> = [
      {
        key: 'username',
        label: 'Username',
        icon: ['fa', 'font'],
        width: '200',
      },
      {
        key: 'role',
        label: 'Role',
        icon: ['fa', 'user-tag'],
        width: '200',
      },
      {
        key: 'email',
        label: 'email',
        icon: ['fa', 'at'],
        width: '200',
      },
      {
        key: TABLE_COLUMN_NAME_ACTIONS,
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
