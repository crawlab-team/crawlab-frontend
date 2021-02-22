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
        @hide="onDialogHide"
    >
      <template #reference>
        <div class="actions">
          <TableHeaderAction
              v-for="{key, tooltip, icon, onClick} in actions"
              :key="key"
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
import {defineComponent, reactive, ref} from 'vue';
import TableHeaderDialog from '@/components/table/TableHeaderDialog.vue';
import TableHeaderAction from '@/components/table/TableHeaderAction.vue';

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

    const actions: TableHeaderActionProps[] = [
      {
        key: 'sort',
        tooltip: 'Sort',
        icon: ['fa', 'sort-amount-down'],
        onClick: () => {
          const {column} = props as TableHeaderProps;
          dialogVisible.value = true;
          // actionStatusMap.sort.active = true;
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
          // actionStatusMap.filter.active = true;
          actionStatusMap.filter.focused = true;
        }
      },
    ];

    const hideDialog = () => {
      dialogVisible.value = false;
      actionStatusMap.filter.focused = false;
      actionStatusMap.sort.focused = false;
    };

    const onDialogHide = () => {
      hideDialog();
    };

    const onDialogClear = () => {
      // TODO: implement
      actionStatusMap.filter.active = false;
      actionStatusMap.sort.active = false;
      hideDialog();
    };

    const onDialogApply = () => {
      // TODO: implement
      actionStatusMap.filter.active = true;
      actionStatusMap.sort.active = true;
      hideDialog();
    };

    return {
      dialogVisible,
      actionStatusMap,
      actions,
      onDialogHide,
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
