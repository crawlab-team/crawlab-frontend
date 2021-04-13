<template>
  <Dialog
      :title="title"
      :visible="visible"
      :width="width"
      :confirm-loading="confirmLoading"
      :confirm-disabled="confirmDisabled"
      @close="onClose"
      @confirm="onConfirm"
  >
    <el-tabs
        v-model="internalTabName"
        :class="[type, visible ? 'visible' : '']"
        class="create-edit-dialog-tabs"
        @tab-click="onTabChange"
    >
      <el-tab-pane label="Single" name="single">
        <slot/>
      </el-tab-pane>
      <el-tab-pane label="Batch" name="batch">
        <CreateDialogContentBatch
            :data="batchFormData"
            :fields="batchFormFields"
        />
      </el-tab-pane>
    </el-tabs>
  </Dialog>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, provide, ref, SetupContext} from 'vue';
import CreateDialogContentBatch from '@/components/dialog/CreateDialogContentBatch.vue';
import Dialog from '@/components/dialog/Dialog.vue';
import {emptyArrayFunc, emptyObjectFunc} from '@/utils/func';
import {Pane} from 'element-plus/lib/el-tabs/src/tabs.vue';

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
      default: '80vw',
    },
    batchFormData: {
      type: Array as PropType<TableData>,
      default: emptyArrayFunc,
    },
    batchFormFields: {
      type: Array as PropType<FormTableField[]>,
      default: emptyArrayFunc,
    },
    confirmDisabled: {
      type: Boolean,
      default: false,
    },
    confirmLoading: {
      type: Boolean,
      default: false,
    },
    actionFunctions: {
      type: Object as PropType<CreateEditDialogActionFunctions>,
      default: emptyObjectFunc,
    },
  },
  setup(props: CreateEditDialogProps, ctx: SetupContext) {
    const title = computed<string>(() => {
      const {visible, type} = props;
      if (!visible) return '';
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
      const {actionFunctions} = props;
      actionFunctions?.onClose?.();
    };

    const onConfirm = () => {
      const {actionFunctions} = props;
      actionFunctions?.onConfirm?.();
    };

    const internalTabName = ref<CreateEditTabName>('single');
    const onTabChange = (tab: Pane) => {
      const tabName = tab.paneName as unknown as CreateEditTabName;
      const {actionFunctions} = props;
      actionFunctions?.onTabChange?.(tabName);
    };

    provide<CreateEditDialogActionFunctions | undefined>('action-functions', props.actionFunctions);

    return {
      title,
      onClose,
      onConfirm,
      internalTabName,
      onTabChange,
    };
  },
});
</script>

<style lang="scss">
.create-edit-dialog-tabs {
  &.edit,
  &:not(.visible) {
    .el-tabs__header {
      display: none;
    }
  }
}
</style>
