<script lang="ts">
import {defineComponent, h} from 'vue';
import FaIconButton from '@/components/button/FaIconButton.vue';

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
  emits: [
    'click',
  ],
  setup: function (props) {
    const getChildren = () => {
      const {row, column} = props as TableCellProps;

      // value
      if (column.value !== undefined) {
        if (typeof column.value === 'function') {
          return [column.value(row, column)];
        } else {
          return column.value;
        }
      }

      // buttons
      if (column.buttons !== undefined && column.buttons?.length > 0) {
        return column.buttons.map(btn => {
          const {tooltip, type, size, icon, onClick} = btn;
          const props = {
            tooltip,
            type,
            size,
            icon,
            onClick: () => {
              onClick?.(row);
            },
          };
          // FIXME: use "as any" to fix type errors temporarily
          return h(FaIconButton, props as any);
        });
      }

      // plain text
      return [row[column.key]];
    };

    return () => h('div', getChildren());
  },
});
</script>

<style lang="scss" scoped>

</style>
