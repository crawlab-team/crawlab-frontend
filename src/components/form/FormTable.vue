<template>
  <div class="form-table">
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {emptyArrayFunc} from '@/utils/func';

export default defineComponent({
  name: 'FormTable',
  props: {
    data: {
      type: Array as PropType<TableData>,
      required: false,
      default: emptyArrayFunc,
    },
    columns: {
      type: Array as PropType<TableColumns>,
      required: false,
      default: emptyArrayFunc,
    }
  },
  setup(props: FormTableProps, {emit}) {
    return {};
  },
});
</script>

<style lang="scss" scoped>

</style>
