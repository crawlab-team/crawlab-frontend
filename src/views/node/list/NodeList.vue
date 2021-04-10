<template>
  <div class="node-list">
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
import Table from '@/components/table/Table.vue';
import NodeType from '@/components/node/NodeType.vue';
import {Node} from '@/interfaces/views/node.d';
import {TABLE_COLUMN_NAME_ACTIONS} from '@/constants/table';
import Switch from '@/components/switch/Switch.vue';
import NodeActive from '@/components/node/NodeActive.vue';

export default defineComponent({
  name: 'NodeList',
  components: {Table},
  setup() {
    // table data
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

    // TODO: implement with real data
    const tableTotal = computed(() => tableData.length);

    // table columns
    const tableColumns: TableColumns<Node> = [
      {
        key: 'name',
        label: 'Name',
        icon: ['fa', 'font'],
        width: '150',
        hasFilter: true,
      },
      {
        key: 'ip',
        label: 'Ip',
        icon: ['fa', 'map-marker-alt'],
        width: '120',
        hasFilter: true,
      },
      {
        key: 'mac',
        label: 'MAC',
        icon: ['fa', 'hdd'],
        width: '150',
        hasFilter: true,
      },
      {
        key: 'hostname',
        label: 'Hostname',
        icon: ['fa', 'location-arrow'],
        width: '150',
        hasFilter: true,
      },
      {
        key: 'description',
        label: 'Description',
        icon: ['fa', 'comment-alt'],
        width: '200',
      },
      {
        key: 'type',
        label: 'Type',
        icon: ['fa', 'list'],
        width: '120',
        value: (row: Node, column: TableColumn<Node>) => {
          return h(NodeType, {isMaster: row.is_master});
        },
        hasFilter: true,
      },
      {
        key: 'active',
        label: 'Active',
        icon: ['fa', 'signal'],
        width: '80',
        value: (row: Node, column: TableColumn<Node>) => {
          return h(NodeActive, {active: row.active});
        },
        hasFilter: true,
      },
      {
        key: 'enabled',
        label: 'Enabled',
        icon: ['fa', 'toggle-on'],
        width: '80',
        value: (row: Node, column: TableColumn<Node>) => {
          return h(Switch, {value: row.enabled});
        },
        hasFilter: true,
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
