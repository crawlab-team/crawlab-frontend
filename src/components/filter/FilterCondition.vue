<template>
  <div class="filter-condition">
    <el-select
        :model-value="type"
        :popper-append-to-body="false"
        class="type"
        size="mini"
        @change="onTypeChange"
    >

    </el-select>
    <el-input
        :model-value="value"
        class="value"
        size="mini"
        @change="onValueChange"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'FilterCondition',
  props: {
    type: {
      type: String,
      required: false,
    },
    value: {
      type: String,
      required: false,
    },
  },
  emits: [
    'type-change',
    'value-change',
  ],
  setup(props, {emit}) {
    const onTypeChange = (type: string) => {
      emit('type-change', type);
    };

    const onTypeClose = () => {
      console.log('onTypeClose');
    };

    const onValueChange = (value: string) => {
      emit('value-change', value);
    };

    return {
      onTypeChange,
      onTypeClose,
      onValueChange,
    };
  },
});
</script>

<style lang="scss" scoped>
.filter-condition {
  display: flex;

  &:last-child {
    flex: 1;
  }
}
</style>
<style scoped>
.filter-condition >>> .type.el-select .el-input__inner {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right-color: transparent;
}

.filter-condition >>> .value.el-input .el-input__inner {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
