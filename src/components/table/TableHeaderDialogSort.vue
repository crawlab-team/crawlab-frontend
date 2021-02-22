<template>
  <div class="table-header-dialog-sort">
    <el-radio-group :model-value="value" size="mini" type="primary" @change="onChange">
      <el-radio-button label="ascending">
        <font-awesome-icon :icon="['fa', 'sort-alpha-down']"/>
        Ascending
      </el-radio-button>
      <el-radio-button label="descending">
        <font-awesome-icon :icon="['fa', 'sort-alpha-down-alt']"/>
        Descending
      </el-radio-button>
    </el-radio-group>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'TableHeaderDialogSort',
  props: {
    value: {
      type: String,
      required: false,
    },
  },
  emits: [
    'change'
  ],
  setup(props, {emit}) {
    const onChange = (value: string) => {
      emit('change', value);
    };

    return {
      onChange,
    };
  },
});
</script>

<style lang="scss" scoped>
.table-header-dialog-sort {
  .el-radio-group {
    width: 100%;
    display: flex;

    .el-radio-button {
      flex: 1;
    }
  }
}
</style>
<style scoped>
.table-header-dialog-sort >>> .el-radio-group .el-radio-button .el-radio-button__inner {
  width: 100%;
}
</style>
