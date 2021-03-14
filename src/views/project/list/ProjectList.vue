<template>
  <div class="project-list">
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
import ProjectTag from '@/components/project/ProjectTag.vue';
import Table from '@/components/table/Table.vue';
import {COLUMN_NAME_ACTIONS} from '@/constants/table';

export default defineComponent({
  name: 'ProjectList',
  components: {
    Table,
  },
  setup(props, {emit}) {
    // TODO: implement with real data
    const types = [
      'primary',
      'success',
      'warning',
      'danger',
      'info',
    ];

    // table data
    const tableData: TableData<Project> = [
      {
        name: 'Alpha',
        description: 'Alpha Project',
        tags: ['test', 'dev'],
      },
      {
        name: 'Beta',
        description: 'Beta Project',
        tags: ['release', 'test'],
      },
    ];

    // TODO: implement with real data
    const tableTotal = computed(() => tableData.length);

    // table columns
    const tableColumns: TableColumns<Project> = [
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
        key: 'tags',
        label: 'Tags',
        icon: ['fa', 'hashtag'],
        value: (row: Project) => {
          if (!row.tags) return [];
          const tags = row.tags.map(tag => h(ProjectTag, {
            label: tag,
            type: types[Math.floor(Math.random() * types.length)],
          }));
          return h('div', tags);
        },
        width: '200',
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
