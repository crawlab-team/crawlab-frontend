<template>
  <Form label-width="150px">
    <FormItem :span="1" label="Name" required>
      <el-input placeholder="Name"/>
    </FormItem>
    <FormItem :span="2" label="Display Name" required>
      <el-input placeholder="Display Name"/>
    </FormItem>
    <FormItem :span="3" label="Command" required>
      <el-input placeholder="Command"/>
    </FormItem>
    <FormItem :span="3" label="Remark">
      <el-input placeholder="Remark" type="textarea"/>
    </FormItem>
  </Form>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Form from '@/components/form/Form.vue';
import FormItem from '@/components/form/FormItem.vue';

export default defineComponent({
  name: 'CreateSpiderDialogContentSingle',
  components: {
    Form,
    FormItem,
  },
  setup(props, {emit}) {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.create-spider-dialog-content-single {
  display: flex;
  flex-wrap: wrap;

  .el-form-item {
    & {
      margin-right: 0;
    }

    &,
    &.span-1 {
      flex-basis: calc(100% / 3);
    }

    &.span-2 {
      flex-basis: calc(100% / 3 * 2);
    }

    &.span-3 {
      flex-basis: 100%;
    }
  }
}
</style>

<style scoped>
.create-spider-dialog-content-single >>> .el-form-item > .el-form-item__content {
  width: calc(100% - 150px);
}
</style>
