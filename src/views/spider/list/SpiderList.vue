<template>
  <div class="spider-list">
    <div class="content">
      <NavActions ref="navActions" class="nav-actions">
        <NavActionGroup>
          <NavActionItem>
            <el-tooltip content="Spider Actions">
              <font-awesome-icon :icon="['fa', 'spider']" class="title"/>
            </el-tooltip>
          </NavActionItem>
        </NavActionGroup>
      </NavActions>
      <Table
          :columns="tableColumns"
          :data="tableData"
          :total="tableTotal"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, h} from 'vue';
import Table from '@/components/table/Table.vue';
import {ElTag} from 'element-plus';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import NavActions from '@/components/nav/NavActions.vue';
import NavActionGroup from '@/components/nav/NavActionGroup.vue';
import NavActionItem from '@/components/nav/NavActionItem.vue';

export default defineComponent({
  name: 'SpiderList',
  components: {NavActionGroup, NavActions, NavActionItem, Table},
  setup() {
    const tableData: Spider[] = (() => {
      const data: Spider[] = [];
      for (let i = 0; i < 10; i++) {
        const _id = (i + 1).toString();
        const name = `spider-${_id}`;
        const display_name = `Spider ${_id}`;
        data.push({
          _id,
          name,
          display_name,
        });
      }
      return data;
    })();

    const tableColumns: TableColumn<Spider>[] = [
      {
        key: 'display_name',
        label: 'Name',
        width: '160',
        align: 'left',
      },
      {
        key: 'type',
        label: 'Spider Type',
        width: '120',
      },
      {
        key: 'project_name',
        label: 'Project',
        width: '120',
      },
      {
        key: 'is_long_task',
        label: 'Is Long Task',
        width: '80',
      },
      {
        key: 'latest_tasks',
        label: 'Latest Tasks',
        width: '180',
      },
      {
        key: 'last_status',
        label: 'Last Status',
        width: '120',
      },
      {
        key: 'last_run_ts',
        label: 'Last Run',
        width: '140',
      },
      {
        key: 'update_ts',
        label: 'Update Time',
        width: '140',
      },
      {
        key: 'create_ts',
        label: 'Create Time',
        width: '140',
      },
      {
        key: 'create_username',
        label: 'Created By',
        width: '100',
      },
      {
        key: 'remark',
        label: 'Remark',
        width: '140',
      },
      {
        key: 'actions',
        label: 'Actions',
        width: '220',
        fixed: 'right',
        value: (row: Spider, column: TableColumn) => {
          return h(
              ElTag,
              {
                type: 'danger',
                size: 'small',
                onClick: () => {
                  console.log(row, column);
                }
              },
              () => [
                h(FontAwesomeIcon, {icon: ['fa', 'trash-alt']})
              ]
          );
        },
      },
    ];

    const tableTotal = 100;

    return {
      tableData,
      tableColumns,
      tableTotal,
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
