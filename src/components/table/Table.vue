<template>
  <div class="table">
    <!-- Table Body -->
    <el-table
        v-if="selectedColumns.length > 0"
        :data="tableData"
        :fit="false"
        :row-key="rowKey"
        border
        size="small"
    >
      <el-table-column
          v-for="c in selectedColumns"
          :key="c.key"
          :align="c.align"
          :fixed="c.fixed ? c.fixed : false"
          :label="c.label"
          :min-width="c.minWidth"
          :sortable="c.sortable"
          :width="c.width"
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
      <div class="actions">
        <FaIconButton
            :icon="['fa', 'file-export']"
            class="action-btn"
            size="mini"
            tooltip="Export"
            type="primary"
            @click="onExport"
        />
        <FaIconButton
            :icon="['fa', 'arrows-alt']"
            class="action-btn"
            size="mini"
            tooltip="Customize Columns"
            type="primary"
            @click="onShowCustomizeColumns"
        />
      </div>
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
import {computed, defineComponent, onBeforeMount, ref} from 'vue';
import TableCell from '@/components/table/TableCell.vue';
import TableHeader from '@/components/table/TableHeader.vue';
import FaIconButton from '@/components/button/FaIconButton.vue';
import TableColumnsTransfer from '@/components/table/TableColumnsTransfer.vue';
import {cloneArray, plainClone} from '@/utils/object';

export default defineComponent({
  name: 'Table',
  components: {
    TableColumnsTransfer,
    FaIconButton,
    TableCell,
    TableHeader,
  },
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
    selectedColumnKeys: {
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
    const internalSelectedColumnKeys = ref<string[]>([]);
    const columnsTransferVisible = ref<boolean>(false);

    const tableData = computed(() => {
      const {data} = props as TableProps;
      return data;
    });

    const selectedColumns = computed<TableColumn[]>(() => {
      const {columns} = props as TableProps;
      return columns.filter(d => internalSelectedColumnKeys.value.includes(d.key));
    });

    const onHeaderChange = (column: TableColumn, sort: SortDirection, filter: FilterConditionData[]) => {
      // console.log(column, sort, filter);
    };

    const onExport = () => {
      emit('export');
    };

    const onShowCustomizeColumns = () => {
      columnsTransferVisible.value = true;
    };

    const onHideColumnsTransfer = () => {
      columnsTransferVisible.value = false;
    };

    const onColumnsChange = (value: string[]) => {
      internalSelectedColumnKeys.value = value;
    };

    onBeforeMount(() => {
      const {columns, selectedColumnKeys} = props as TableProps;
      if (selectedColumnKeys.length > 0) {
        internalSelectedColumnKeys.value = plainClone(selectedColumnKeys);
      } else {
        internalSelectedColumnKeys.value = cloneArray(columns.map(d => d.key));
      }
    });

    return {
      internalSelectedColumnKeys,
      columnsTransferVisible,
      tableData,
      selectedColumns,
      onHeaderChange,
      onShowCustomizeColumns,
      onHideColumnsTransfer,
      onColumnsChange,
      onExport,
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

    .actions {
    }

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
