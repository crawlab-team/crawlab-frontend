<template>
  <div class="list-layout">
    <div class="content">
      <!-- Nav Actions -->
      <NavActions ref="navActions" class="nav-actions">
        <NavActionGroup
            v-for="(grp, i) in navActions"
            :key="i"
        >
          <NavActionItem
              v-for="(btn, j) in grp.children"
              :key="j"
          >
            <NavActionButton
                :button-type="btn.buttonType"
                :disabled="btn.disabled"
                :icon="btn.icon"
                :label="btn.label"
                :size="btn.size"
                :tooltip="btn.tooltip"
                :type="btn.type"
                @click="btn.onClick"
            />
          </NavActionItem>
        </NavActionGroup>
      </NavActions>
      <!-- ./Nav Actions -->

      <!-- Table -->
      <Table
          :columns="tableColumns"
          :data="tableData"
          :total="tableTotal"
          :page="tablePagination.page"
          :page-size="tablePagination.size"
          selectable
          @selection-change="onSelect"
          @delete="onDelete"
          @edit="onEdit"
          @pagination-change="onPaginationChange"
      >
        <template #actions-prefix>
          <NavActionButton
              v-for="(btn, $index) in tableActionsPrefix"
              :key="$index"
              :button-type="btn.buttonType"
              :disabled="btn.disabled"
              :icon="btn.icon"
              :label="btn.label"
              :size="btn.size"
              :tooltip="btn.tooltip"
              :type="btn.type"
              @click="btn.onClick"
          />
        </template>
        <template #actions-suffix>
          <NavActionButton
              v-for="(btn, $index) in tableActionsSuffix"
              :key="$index"
              :button-type="btn.buttonType"
              :disabled="btn.disabled"
              :icon="btn.icon"
              :label="btn.label"
              :size="btn.size"
              :tooltip="btn.tooltip"
              :type="btn.type"
              @click="btn.onClick"
          />
        </template>
      </Table>
      <!-- ./Table -->
    </div>

    <slot name="extra"/>
  </div>
</template>

<script lang="ts">
import {defineComponent, onBeforeMount, PropType, provide, SetupContext, toRefs, watch} from 'vue';
import NavActionGroup from '@/components/nav/NavActionGroup.vue';
import NavActionItem from '@/components/nav/NavActionItem.vue';
import Table from '@/components/table/Table.vue';
import NavActionButton from '@/components/nav/NavActionButton.vue';
import NavActions from '@/components/nav/NavActions.vue';
import {voidFunc} from '@/utils/func';

export default defineComponent({
  name: 'ListLayout',
  components: {
    NavActions,
    NavActionGroup,
    NavActionItem,
    NavActionButton,
    Table,
  },
  props: {
    navActions: {
      type: Array as PropType<ListActionGroup[]>,
      default: () => {
        return [];
      }
    },
    tableColumns: {
      type: Array as PropType<TableColumns>,
      default: () => {
        return [];
      }
    },
    tableData: {
      type: Array as PropType<TableData>,
      default: () => {
        return [];
      }
    },
    tableTotal: {
      type: Number,
      default: 0,
    },
    tablePagination: {
      type: Object as PropType<TablePagination>,
      default: () => {
        return {
          page: 1,
          size: 10,
        };
      }
    },
    tableActionsPrefix: {
      type: Array as PropType<ListActionButton[]>,
      default: () => {
        return [];
      }
    },
    tableActionsSuffix: {
      type: Array as PropType<ListActionButton[]>,
      default: () => {
        return [];
      }
    },

    actionFunctions: {
      type: Object as PropType<ListLayoutActionFunctions>,
      default: () => {
        return {
          getList: voidFunc,
        };
      }
    }
  },
  emits: [
    'select',
    'edit',
    'delete',
  ],
  setup(props: ListLayoutProps, {emit}: SetupContext) {
    const {
      actionFunctions,
    } = toRefs(props);

    const {
      setPagination,
      getList,
    } = actionFunctions.value;

    const onSelect = (value: TableData) => {
      emit('select', value);
    };

    const onEdit = (value: TableData) => {
      emit('edit', value);
    };

    const onDelete = (value: TableData) => {
      emit('delete', value);
    };

    const onPaginationChange = (value: TablePagination) => {
      setPagination(value);
    };

    watch(() => props.tablePagination, getList);

    onBeforeMount(() => {
      getList();
    });

    provide<ListLayoutActionFunctions>('action-functions', actionFunctions.value);

    return {
      onSelect,
      onPaginationChange,
      onEdit,
      onDelete,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";

.list-layout {
  .nav-actions {
    background-color: $containerWhiteBg;
    border-bottom: none;
  }

  .content {
    background-color: $containerWhiteBg;
  }
}
</style>
