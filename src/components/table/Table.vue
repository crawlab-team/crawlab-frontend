<template>
  <div class="table">
    <el-table
        :data="tableData"
        :fit="false"
        :row-key="rowKey"
        border
        size="small"
    >
      <el-table-column
          v-for="c in columns"
          :key="c.key"
          :align="c.align"
          :fixed="c.fixed ? c.fixed : false"
          :label="c.label"
          :min-width="c.minWidth"
          :sortable="c.sortable"
          :width="c.width"
      >
        <template #header="scope">
          <TableHeader :column="c" :index="scope.$index" @filter="onFilter"/>
        </template>
        <template #default="scope">
          <TableCell :column="c" :row="scope.row"/>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        :current-page="page"
        :page-size="pageSize"
        :total="total"
        class="pagination"
        layout="total, sizes, prev, pager, next"
    />
  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import TableCell from '@/components/table/TableCell.vue';
import TableHeader from '@/components/table/TableHeader.vue';

export default defineComponent({
  name: 'Table',
  components: {TableCell, TableHeader},
  props: {
    data: {
      type: Array,
      required: true,
      default: () => {
        return [];
      },
    },
    columns: {
      type: Array,
      required: true,
      default: () => {
        return [];
      },
    },
    total: {
      type: Number,
      default: 0,
    },
    page: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    rowKey: {
      type: String,
      default: '_id',
    },
  },
  setup(props, {emit}) {
    const tableData = computed(() => {
      const {data} = props as TableProps;
      return data;
    });

    const onFilter = (column: TableColumn, filter: any) => {
      console.log('onFilter', column, filter);
    };

    return {
      tableData,
      onFilter,
    };
  },
});
</script>

<style lang="scss" scoped>
.table {
  .el-table {
    width: 100%;
  }

  .pagination {
    text-align: right;
  }
}
</style>
<style scoped>
.el-table >>> th > .cell {
  line-height: 1.5;
  word-break: normal;
}
</style>
