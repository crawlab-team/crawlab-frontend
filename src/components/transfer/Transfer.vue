<template>
  {{ computedData.length }}
  <el-transfer
      :button-texts="buttonTexts"
      :data="computedData"
      :model-value="computedValue"
      :titles="titles"
      class="transfer"
      filterable
      @change="onChange"
      @left-check-change="onLeftCheckChange"
      @right-check-change="onRightCheckChange"
  >
    <template #default="{option}">
      {{ option.label }}
    </template>
  </el-transfer>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue';
import {DataItem, Key} from 'element-plus/lib/el-transfer/src/transfer';
import {UNUSED_KEY_LEFT, UNUSED_KEY_RIGHT} from '@/constants/transfer';
import {cloneArray} from '@/utils/object';

export default defineComponent({
  name: 'Transfer',
  props: {
    value: {
      type: Array,
      required: false,
      default: () => {
        return [];
      }
    },
    data: {
      type: Array,
      required: false,
      default: () => {
        return [];
      }
    },
    titles: {
      type: Array,
      required: false,
    },
    buttonTexts: {
      type: Array,
      required: false,
    },
  },
  emits: [
    'change',
  ],
  setup(props, {emit}) {
    const leftChecked = ref<Key[]>([]);
    const rightChecked = ref<Key[]>([]);

    // temporary workaround for el-transfer bug: https://github.com/element-plus/element-plus/issues/1539
    const computedValue = computed<Key[]>(() => {
      const {value} = props as TransferProps;
      if (!value) return [UNUSED_KEY_RIGHT];
      const computedValue = cloneArray(value);
      computedValue.push(UNUSED_KEY_RIGHT);
      return computedValue;
    });

    // temporary workaround for el-transfer bug: https://github.com/element-plus/element-plus/issues/1539
    const computedData = computed<DataItem[]>(() => {
      const {data} = props as TransferProps;
      if (!data) {
        return [
          {
            key: UNUSED_KEY_LEFT,
            label: '',
            disabled: true,
          },
          {
            key: UNUSED_KEY_RIGHT,
            label: '',
            disabled: true,
          },
        ];
      }
      const computedData = cloneArray(data) as DataItem[];
      computedData.push({
        key: UNUSED_KEY_LEFT,
        label: '',
        disabled: true,
      });
      computedData.push({
        key: UNUSED_KEY_RIGHT,
        label: '',
        disabled: true,
      });
      return computedData;
    });

    // temporary workaround for el-transfer bug: https://github.com/element-plus/element-plus/issues/1539
    const afterCheck = () => {
      // TODO: implement
      const {value, data} = props as TransferProps;
      const rightTotal = value.length;
      const leftTotal = data.length - rightTotal;
      return;
    };

    const onChange = (value: string[]) => {
      console.log(value);
      // temporary workaround for el-transfer bug: https://github.com/element-plus/element-plus/issues/1539
      value = value.filter(d => ![UNUSED_KEY_LEFT, UNUSED_KEY_RIGHT].includes(d));

      emit('change', value);
    };

    const onLeftCheckChange = (value: Key[]) => {
      leftChecked.value = value;
      setTimeout(afterCheck, 10);
    };

    const onRightCheckChange = (value: Key[]) => {
      rightChecked.value = value;
      setTimeout(afterCheck, 10);
    };

    return {
      computedValue,
      computedData,
      onChange,
      onLeftCheckChange,
      onRightCheckChange,
    };
  },
});
</script>

<style lang="scss" scoped>
.transfer {
  min-height: 480px;
}
</style>
<style scoped>
.transfer >>> .el-transfer-panel {
  width: 240px;
}

.transfer >>> .el-transfer-panel,
.transfer >>> .el-transfer-panel .el-transfer-panel__body,
.transfer >>> .el-transfer-panel .el-transfer-panel__body .el-transfer-panel__list {
  height: 480px;
}

/* temporary workaround for el-transfer bug: https://github.com/element-plus/element-plus/issues/1539 */
.transfer >>> .el-transfer-panel .el-transfer-panel__list > .el-checkbox:last-child {
  display: none !important;
}
</style>
