<template>
  <div class="table-actions">
    <slot name="prefix"></slot>
    <!--    <FaIconButton-->
    <!--        v-if="showButton(TABLE_ACTION_ADD)"-->
    <!--        :icon="['fa', 'plus']"-->
    <!--        class="action-btn"-->
    <!--        size="mini"-->
    <!--        tooltip="Add"-->
    <!--        type="success"-->
    <!--        :disabled="selection.length === 0"-->
    <!--        @click="onAdd"-->
    <!--    />-->
    <FaIconButton
        v-if="showButton(TABLE_ACTION_EDIT)"
        :disabled="selection.length === 0"
        :icon="['fa', 'edit']"
        class="action-btn"
        size="mini"
        tooltip="Edit"
        type="warning"
        @click="onEdit"
    />
    <FaIconButton
        v-if="showButton(TABLE_ACTION_DELETE)"
        :disabled="selection.length === 0"
        :icon="['fa', 'trash-alt']"
        class="action-btn"
        size="mini"
        tooltip="Delete"
        type="danger"
        @click="onEdit"
    />
    <FaIconButton
        v-if="showButton(TABLE_ACTION_EXPORT)"
        :icon="['fa', 'file-export']"
        class="action-btn"
        size="mini"
        tooltip="Export"
        type="primary"
        @click="onExport"
    />
    <FaIconButton
        v-if="showButton(TABLE_ACTION_CUSTOMIZE_COLUMNS)"
        :icon="['fa', 'arrows-alt']"
        class="action-btn"
        size="mini"
        tooltip="Customize Columns"
        type="primary"
        @click="onShowColumnsTransfer"
    />
    <slot name="suffix"></slot>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import FaIconButton from '@/components/button/FaIconButton.vue';
import {
  TABLE_ACTION_ADD,
  TABLE_ACTION_CUSTOMIZE_COLUMNS,
  TABLE_ACTION_DELETE,
  TABLE_ACTION_EDIT,
  TABLE_ACTION_EXPORT
} from '@/constants/table';

export default defineComponent({
  name: 'TableActions',
  components: {
    FaIconButton,
  },
  emits: [
    'click-add',
    'click-edit',
    'click-delete',
    'click-export',
    'show-columns-transfer'
  ],
  props: {
    selection: {
      type: Array as PropType<TableData>,
      required: false,
      default: () => {
        return [];
      },
    },
    visibleButtons: {
      type: Array as PropType<BuiltInTableActionButtonName[]>,
      required: false,
      default: () => {
        return [];
      }
    }
  },
  setup(props: TableActionsProps, {emit}) {
    const onAdd = () => {
      emit('click-add');
    };

    const onEdit = () => {
      emit('click-edit');
    };

    const onDelete = () => {
      emit('click-delete');
    };

    const onExport = () => {
      emit('click-export');
    };

    const onShowColumnsTransfer = () => {
      emit('show-columns-transfer');
    };

    const showButton = (name: string): boolean => {
      const {visibleButtons} = props;
      if (visibleButtons.length === 0) return true;
      return visibleButtons.includes(name);
    };

    return {
      TABLE_ACTION_ADD,
      TABLE_ACTION_EDIT,
      TABLE_ACTION_DELETE,
      TABLE_ACTION_EXPORT,
      TABLE_ACTION_CUSTOMIZE_COLUMNS,
      onAdd,
      onEdit,
      onDelete,
      onExport,
      onShowColumnsTransfer,
      showButton,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
