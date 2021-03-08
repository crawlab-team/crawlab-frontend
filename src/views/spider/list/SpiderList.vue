<template>
  <div class="spider-list">
    <div class="content">
      <NavActions ref="navActions" class="nav-actions">
        <NavActionGroup>
          <NavActionItem>
            <Button size="mini" tooltip="New Spider" type="success">
              <font-awesome-icon :icon="['fa' ,'plus']"/>
              New Spider
            </Button>
          </NavActionItem>
        </NavActionGroup>
      </NavActions>
      <Table
          :columns="tableColumns"
          :data="tableData"
          :total="tableTotal"
          selectable
          @selection-change="onSelect"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import Table from '@/components/table/Table.vue';
import NavActions from '@/components/nav/NavActions.vue';
import NavActionGroup from '@/components/nav/NavActionGroup.vue';
import NavActionItem from '@/components/nav/NavActionItem.vue';
import {useRouter} from 'vue-router';
import {COLUMN_NAME_ACTIONS} from '@/constants/table';
import Button from '@/components/button/Button.vue';

export default defineComponent({
  name: 'SpiderList',
  components: {
    Button,
    NavActions,
    NavActionItem,
    NavActionGroup,
    Table,
  },
  setup(props, {emit}) {
    const router = useRouter();

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
        filterItems: [
          {label: 'Customized', value: 'customized'},
          {label: 'Configurable', value: 'configurable'},
        ],
      },
      {
        key: 'project_name',
        label: 'Project',
        width: '120',
        filterItems: () => {
          const arr: SelectOption[] = [];
          for (let i = 0; i < 20; i++) {
            arr.push({label: `Item ${i + 1}`, value: (i + 1).toString()});
          }
          return arr;
        },
      },
      // {
      //   key: 'is_long_task',
      //   label: 'Is Long Task',
      //   width: '80',
      // },
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
        label: 'Updated At',
        width: '140',
      },
      {
        key: 'create_ts',
        label: 'Created At',
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
        key: COLUMN_NAME_ACTIONS,
        label: 'Actions',
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
              console.log('view', row);
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

    return {
      tableData,
      tableColumns,
      tableTotal,
      selection,
      onSelect,
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
