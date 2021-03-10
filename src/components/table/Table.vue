<template>
  <div class="table">
    <!-- Table Body -->
    <el-table
        v-if="selectedColumns.length > 0"
        ref="table"
        :data="tableData"
        :fit="false"
        :row-key="rowKey"
        border
        size="small"
        @selection-change="onSelectionChange"
    >
      <el-table-column
          v-if="selectable"
          align="center"
          reserve-selection
          type="selection"
          width="40"
          fixed="left"
      />
      <el-table-column
          v-for="c in selectedColumns"
          :key="c.key"
          :column-key="c.key"
          :align="c.align"
          :fixed="c.fixed ? c.fixed : false"
          :label="c.label"
          :min-width="c.minWidth"
          :sortable="c.sortable"
          :width="c.width"
          :index="c.index"
          :resizable="c.resizable === undefined ? true : c.resizable"
      >
        <template #header="scope">
          <TableHeader :column="c" :index="scope.$index" @change="onHeaderChange"/>
        </template>
        <template #default="scope">
          <TableCell :column="c" :row="scope.row"/>
        </template>
      </el-table-column>
    </el-table>
    <!-- ./Table Body-->

    <!-- Table Footer-->
    <div class="table-footer">
      <TableActions
          :selection="internalSelection"
          @delete="onDelete"
          @edit="onEdit"
          @export="onExport"
          @customize-columns="onShowColumnsTransfer"
      >
        <template #prefix>
          <slot name="actions-prefix"></slot>
        </template>
        <template #suffix>
          <slot name="actions-suffix"></slot>
        </template>
      </TableActions>
      <el-pagination
          :current-page="page"
          :page-size="pageSize"
          :total="total"
          class="pagination"
          layout="total, sizes, prev, pager, next"
      />
    </div>
    <!-- ./Table Footer-->

    <!-- Table Columns Transfer -->
    <TableColumnsTransfer
        :columns="columns"
        :selected-column-keys="internalSelectedColumnKeys"
        :visible="columnsTransferVisible"
        @apply="onColumnsChange"
        @close="onHideColumnsTransfer"
    />
    <!-- ./Table Columns Transfer -->
  </div>
</template>

<script lang="ts">
import {defineComponent, onBeforeMount, PropType, ref, SetupContext} from 'vue';
import {Table} from 'element-plus/lib/el-table/src/table.type';
import TableCell from '@/components/table/TableCell.vue';
import TableHeader from '@/components/table/TableHeader.vue';
import TableColumnsTransfer from '@/components/table/TableColumnsTransfer.vue';
import useColumn from '@/components/table/column';
import useHeader from '@/components/table/header';
import useData from '@/components/table/data';
import useSelection from '@/components/table/selection';
import TableActions from '@/components/table/TableActions.vue';
import useAction from '@/components/table/action';

export default defineComponent({
  name: 'Table',
  components: {
    TableActions,
    TableColumnsTransfer,
    TableCell,
    TableHeader,
  },
  props: {
    data: {
      type: Array as PropType<TableData>,
      required: true,
      default: () => {
        return [];
      },
    },
    columns: {
      type: Array as PropType<TableColumn[]>,
      required: true,
      default: () => {
        return [];
      },
    },
    selectedColumnKeys: {
      type: Array as PropType<string[]>,
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
    selectable: {
      type: Boolean,
      default: false,
    },
    visibleButtons: {
      type: Array as PropType<BuiltInTableActionButtonName[]>,
      required: false,
      default: () => {
        return [];
      }
    }
  },
  emits: [
    'edit',
    'delete',
    'export',
    'header-change',
    'pagination-change',
    'selection-change',
  ],
  setup(props: TableProps, ctx: SetupContext) {
    const table = ref<Table>();

    const {
      tableData,
    } = useData(props, ctx);

    const {
      internalSelectedColumnKeys,
      columnsTransferVisible,
      selectedColumns,
      onShowColumnsTransfer,
      onHideColumnsTransfer,
      onColumnsChange,
      initColumns,
    } = useColumn(props, ctx, table);

    const {
      onHeaderChange,
    } = useHeader(props, ctx);

    const {
      selection: internalSelection,
      onSelectionChange,
    } = useSelection(props, ctx);

    const {
      onAdd,
      onEdit,
      onDelete,
      onExport,
    } = useAction(props, ctx);

    onBeforeMount(() => {
      initColumns();
    });

    return {
      table,
      tableData,
      internalSelectedColumnKeys,
      columnsTransferVisible,
      selectedColumns,
      onHeaderChange,
      onShowColumnsTransfer,
      onHideColumnsTransfer,
      onColumnsChange,
      onExport,
      internalSelection,
      onSelectionChange,
      onAdd,
      onEdit,
      onDelete,
    };
  },
});
</script>

<style lang="scss" scoped>
.table {
  .el-table {
    width: 100%;
  }

  .table-footer {
    display: flex;
    justify-content: space-between;
    padding: 10px;

    .pagination {
      text-align: right;
    }
  }
}
</style>
<style scoped>
.el-table >>> th > .cell {
  line-height: 1.5;
  word-break: normal;
}
</style>
