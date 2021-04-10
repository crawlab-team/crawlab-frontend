<template>
  <div class="form-table">
    <Table
        :columns="columns"
        :data="data"
        hide-footer
    />
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, h, PropType} from 'vue';
import {emptyArrayFunc} from '@/utils/func';
import Table from '@/components/table/Table.vue';
import FormTableField from '@/components/form/FormTableField.vue';
import {TABLE_COLUMN_NAME_ACTIONS} from '@/constants/table';

export default defineComponent({
  name: 'FormTable',
  components: {
    Table,
  },
  props: {
    data: {
      type: Array as PropType<TableData>,
      required: false,
      default: emptyArrayFunc,
    },
    fields: {
      type: Array as PropType<FormTableField[]>,
      required: false,
      default: emptyArrayFunc,
    }
  },
  emits: [
    'add',
    'clone',
    'delete',
    'field-change',
  ],
  setup(props: FormTableProps, {emit}) {
    const columns = computed<TableColumns>(() => {
      const {fields} = props;
      const columns = fields.map(f => {
        const {
          prop,
          label,
          width,
          fieldType,
        } = f;
        return {
          key: prop,
          label,
          width,
          value: (row: BaseModel, rowIndex: number) => h(FormTableField, {
            form: row,
            prop,
            fieldType,
            'onUpdate:model-value': (value: any) => {
              emit('field-change', rowIndex, prop, value);
            },
          } as FormTableFieldProps, []),
        } as TableColumn;
      }) as TableColumns;
      columns.push({
        key: TABLE_COLUMN_NAME_ACTIONS,
        label: 'Actions',
        width: '200',
        buttons: [
          {
            type: 'primary',
            icon: ['fa', 'plus'],
            tooltip: 'Add',
            onClick: (_, rowIndex) => {
              emit('add', rowIndex);
            },
          },
          {
            type: 'info',
            icon: ['fa', 'plus'],
            tooltip: 'Clone',
            onClick: (_, rowIndex) => {
              emit('clone', rowIndex);
            },
          },
          {
            type: 'danger',
            icon: ['fa', 'trash-alt'],
            tooltip: 'Delete',
            onClick: (_, rowIndex) => {
              emit('delete', rowIndex);
            },
          }
        ]
      });
      return columns;
    });

    return {
      columns,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
