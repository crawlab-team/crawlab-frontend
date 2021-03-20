<template>
  <Table
      :columns="columns"
      :data="tableData"
  />
</template>

<script lang="ts">
import {defineComponent, PropType, ref} from 'vue';
import Table from '@/components/table/Table.vue';

export default defineComponent({
  name: 'CreateDialogContentBatch',
  components: {Table},
  props: {
    columns: {
      type: Array as PropType<TableColumns>,
      default: () => {
        return [];
      }
    }
  },
  setup(props: CreateDialogContentBatchProps, {emit}) {
    const tableData = ref<TableData>([]);

    return {
      tableData,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
