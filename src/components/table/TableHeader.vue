<template>
  <div class="table-header">
    <span class="label">
      {{ column.label }}
    </span>

    <TableHeaderDialog
        :action-status-map="actionStatusMap"
        :column="column"
        :visible="dialogVisible"
        @apply="onDialogApply"
        @clear="onDialogClear"
        @cancel="onDialogCancel"
    >
      <template #reference>
        <div class="actions">
          <TableHeaderAction
              v-for="{key, tooltip, icon, onClick} in actions"
              :key="key + JSON.stringify(icon)"
              :icon="icon"
              :status="actionStatusMap[key]"
              :tooltip="tooltip"
              @click="onClick"
          />
        </div>
      </template>
    </TableHeaderDialog>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, reactive, ref} from 'vue';
import TableHeaderDialog from '@/components/table/TableHeaderDialog.vue';
import TableHeaderAction from '@/components/table/TableHeaderAction.vue';
import {ASCENDING, DESCENDING} from '@/constants/sort';

export default defineComponent({
  name: 'TableHeader',
  components: {
    TableHeaderAction,
    TableHeaderDialog,
  },
  props: {
    column: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: false,
    },
  },
  emits: [
    'search',
    'filter',
    'sort',
  ],
  setup(props) {
    const dialogVisible = ref<boolean>(false);

    const actionStatusMap = reactive<TableHeaderActionStatusMap>({
      filter: {active: false, focused: false},
      sort: {active: false, focused: false},
    });

    const sortData = ref<string>();
    const filterData = ref<TableColumnFilter>();

    const actions = computed<TableColumnButton[]>(() => {
      let sortIcon = ['fa', 'sort-amount-down-alt'];
      let sortTooltip = 'Sort';
      if (sortData.value === ASCENDING) {
        sortIcon = ['fa', 'sort-amount-up'];
        sortTooltip = 'Sorted Ascending';
      } else if (sortData.value === DESCENDING) {
        sortIcon = ['fa', 'sort-amount-down-alt'];
        sortTooltip = 'Sorted Descending';
      }
      return [
        {
          key: 'sort',
          tooltip: sortTooltip,
          icon: sortIcon,
          onClick: () => {
            const {column} = props as TableHeaderProps;
            dialogVisible.value = true;
            actionStatusMap.sort.focused = true;
          }
        },
        {
          key: 'filter',
          tooltip: 'Filter',
          icon: ['fa', 'filter'],
          onClick: () => {
            const {column} = props as TableHeaderProps;
            dialogVisible.value = true;
            actionStatusMap.filter.focused = true;
          }
        },
      ];
    });

    const hideDialog = () => {
      dialogVisible.value = false;
      actionStatusMap.filter.focused = false;
      actionStatusMap.sort.focused = false;
    };

    const clearDialog = () => {
      actionStatusMap.filter.active = false;
      actionStatusMap.sort.active = false;
      sortData.value = undefined;
      filterData.value = undefined;
      hideDialog();
    };

    const onDialogCancel = () => {
      hideDialog();
    };

    const onDialogClear = () => {
      clearDialog();
    };

    const onDialogApply = (value: TableHeaderDialogValue) => {
      const {sort, filter} = value;

      // set action status
      if (sort) actionStatusMap.sort.active = true;
      if (filter) actionStatusMap.filter.active = true;

      // set action data
      sortData.value = sort;
      filterData.value = filter;

      // if no data set, clear
      if (!sortData.value && !filterData.value) {
        clearDialog();
        return;
      }

      // hide
      hideDialog();
    };

    return {
      dialogVisible,
      actionStatusMap,
      actions,
      onDialogCancel,
      onDialogClear,
      onDialogApply,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";

.table-header {
  display: flex;
  position: relative;

  .actions {
    position: absolute;
    right: 0;
    height: 100%;
    align-items: center;
    cursor: pointer;
  }
}
</style>
<style scoped>
.table-header:hover .actions >>> .action {
  display: inline;
}

.table-header .actions >>> .action {
  display: none;
}
</style>
