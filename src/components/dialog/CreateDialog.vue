<template>
  <Dialog
      :title="title"
      :visible="modelValue"
      :width="width"
      :confirm-loading="confirmLoading"
      @close="onClose"
      @confirm="onConfirm"
  >
    <el-tabs v-model="tabName">
      <el-tab-pane label="Single" name="single">
        <slot name="single"/>
      </el-tab-pane>
      <el-tab-pane label="Batch" name="batch">
        <CreateDialogContentBatch
            :columns="batchTableColumns"
        />
      </el-tab-pane>
    </el-tabs>
  </Dialog>
</template>

<script lang="ts">
import {defineComponent, PropType, ref} from 'vue';
import CreateDialogContentBatch from '@/components/dialog/CreateDialogContentBatch.vue';
import Dialog from '@/components/dialog/Dialog.vue';

export default defineComponent({
  name: 'CreateDialog',
  components: {
    Dialog,
    CreateDialogContentBatch,
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'Create',
    },
    width: {
      type: String,
      default: '960px',
    },
    batchTableColumns: {
      type: Array as PropType<TableColumns>,
      default: () => {
        return [];
      }
    },
    confirmLoading: {
      type: Boolean,
      default: false,
    }
  },
  emits: [
    'update:model-value',
    'close',
    'confirm',
  ],
  setup(props: CreateDialogProps, {emit}) {
    const tabName = ref<string>('single');

    const onClose = () => {
      emit('update:model-value', false);
      emit('close');
    };

    const onConfirm = () => {
      emit('confirm');
    };

    return {
      tabName,
      onClose,
      onConfirm,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
