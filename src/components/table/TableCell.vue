<script lang="ts">
import {defineComponent, h} from 'vue';

export default defineComponent({
  name: 'TableCell',
  props: {
    column: {
      type: Object,
      required: true,
    },
    row: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const getChildren = () => {
      const {row, column} = props as TableCellProps;
      if (column.value !== undefined) {
        if (typeof column.value === 'function') {
          return [column.value(row, column)];
        } else {
          return column.value;
        }
      }
      return [row[column.key]];
    };

    return () => h('div', getChildren());
  },
});
</script>

<style lang="scss" scoped>

</style>
