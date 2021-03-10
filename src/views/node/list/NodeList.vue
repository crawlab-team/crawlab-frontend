<template>
  <div class="node-list">
    <div class="content">
      <Table
          :columns="tableColumns"
          :data="tableData"
          selectable
      />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, h} from 'vue';
import Table from '@/components/table/Table.vue';
import NodeType from '@/components/node/NodeType.vue';
import {Node} from '@/interfaces/views/node.d';
import {COLUMN_NAME_ACTIONS} from '@/constants/table';
import Switch from '@/components/switch/Switch.vue';
import NodeActive from '@/components/node/NodeActive.vue';

export default defineComponent({
  name: 'NodeList',
  components: {Table},
  setup() {
    const tableData: TableData<Node> = [
      {
        name: 'Master Node',
        is_master: true,
        ip: '192.168.100.101',
        mac: 'a4:83:e7:60:4d:00',
        hostname: 'master.crawlab.cn',
        active: true,
        enabled: true,
      },
      {
        name: 'Worker Node 1',
        is_master: false,
        ip: '192.168.100.102',
        mac: 'a4:83:e7:60:4d:00',
        hostname: 'worker1.crawlab.cn',
        active: true,
        enabled: false,
      },
      {
        name: 'Worker Node 2',
        is_master: false,
        ip: '192.168.100.103',
        mac: 'a4:83:e7:60:4d:00',
        hostname: 'worker2.crawlab.cn',
        active: false,
        enabled: false,
      },
    ];

    const tableColumns: TableColumn<Node>[] = [
      {
        key: 'name',
        label: 'Name',
        width: '150',
      },
      {
        key: 'ip',
        label: 'Ip',
        width: '120',
      },
      {
        key: 'mac',
        label: 'MAC',
        width: '150',
        defaultHidden: true,
      },
      {
        key: 'hostname',
        label: 'Hostname',
        width: '150',
        defaultHidden: true,
      },
      {
        key: 'description',
        label: 'Description',
        width: '200',
        defaultHidden: true,
      },
      {
        key: 'type',
        label: 'Type',
        width: '120',
        value: (row: Node, column: TableColumn<Node>) => {
          return h(NodeType, {isMaster: row.is_master});
        },
      },
      {
        key: 'active',
        label: 'Active',
        width: '80',
        value: (row: Node, column: TableColumn<Node>) => {
          return h(NodeActive, {active: row.active});
        },
      },
      {
        key: 'enabled',
        label: 'Enabled',
        width: '80',
        value: (row: Node, column: TableColumn<Node>) => {
          return h(Switch, {value: row.enabled});
        },
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
      tableColumns,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
