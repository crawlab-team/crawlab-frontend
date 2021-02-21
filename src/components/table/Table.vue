<template>
  <div class="table">
    <el-table
        :data="data"
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
        <template #default="scope">
          <table-cell
              :column="c"
              :row="scope.row"
          />
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
import {defineComponent} from 'vue';
import TableCell from '@/components/table/TableCell.vue';

export default defineComponent({
  name: 'Table',
  components: {TableCell},
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
      default: 20,
    },
    rowKey: {
      type: String,
      default: '_id',
    },
  },
  setup(props, {emit}) {
    return {};
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
