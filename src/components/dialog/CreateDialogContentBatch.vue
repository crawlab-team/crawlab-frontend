<template>
  <FormTable
      :data="data"
      :fields="fields"
      @add="onAdd"
      @clone="onClone"
      @delete="onDelete"
      @field-change="onFieldChange"
  />
</template>

<script lang="ts">
import {defineComponent, inject, PropType} from 'vue';
import FormTable from '@/components/form/FormTable.vue';
import {emptyArrayFunc} from '@/utils/func';

export default defineComponent({
  name: 'CreateDialogContentBatch',
  components: {
    FormTable,
  },
  props: {
    data: {
      type: Array as PropType<TableData>,
      required: true,
      default: emptyArrayFunc,
    },
    fields: {
      type: Array as PropType<FormTableField[]>,
      required: true,
      default: emptyArrayFunc,
    }
  },
  setup(props: CreateDialogContentBatchProps) {
    const actionFunctions = inject('action-functions') as CreateEditDialogActionFunctions;

    const onAdd = (rowIndex: number) => {
      actionFunctions?.onAdd?.(rowIndex);
    };

    const onClone = (rowIndex: number) => {
      actionFunctions?.onClone?.(rowIndex);
    };

    const onDelete = (rowIndex: number) => {
      actionFunctions?.onDelete?.(rowIndex);
    };

    const onFieldChange = (rowIndex: number, prop: string, value: any) => {
      actionFunctions?.onFieldChange?.(rowIndex, prop, value);
    };

    return {
      onAdd,
      onClone,
      onDelete,
      onFieldChange,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
