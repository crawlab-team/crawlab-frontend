<template>
  <Dialog
      :title="title"
      :visible="visible"
      :width="width"
      :confirm-loading="confirmLoading"
      @close="onClose"
      @confirm="onConfirm"
  >
    <el-tabs v-model="tabName">
      <el-tab-pane label="Single" name="single">
        <slot name="single"/>
      </el-tab-pane>
      <el-tab-pane v-if="type === 'create'" label="Batch" name="batch">
        <CreateDialogContentBatch
            :columns="batchTableColumns"
        />
      </el-tab-pane>
    </el-tabs>
  </Dialog>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, ref} from 'vue';
import CreateDialogContentBatch from '@/components/dialog/CreateDialogContentBatch.vue';
import Dialog from '@/components/dialog/Dialog.vue';

export default defineComponent({
  name: 'CreateEditDialog',
  components: {
    Dialog,
    CreateDialogContentBatch,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String as PropType<CreateEditDialogType>,
      default: 'create',
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
    'close',
    'confirm',
  ],
  setup(props: CreateEditDialogProps, {emit}) {
    const tabName = ref<string>('single');

    const title = computed<string>(() => {
      const {type} = props;
      switch (type) {
        case 'create':
          return 'Create';
        case 'edit':
          return 'Edit';
        default:
          return 'Dialog';
      }
    });

    const onClose = () => {
      emit('close');
    };

    const onConfirm = () => {
      emit('confirm');
    };

    return {
      tabName,
      title,
      onClose,
      onConfirm,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
