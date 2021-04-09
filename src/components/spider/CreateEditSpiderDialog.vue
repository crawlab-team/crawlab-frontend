<template>
  <CreateEditDialog
      :type="activeDialogKey"
      :visible="createEditDialogVisible"
      @confirm="onConfirm"
      @close="onClose"
  >
    <template #default>
      <SpiderForm/>
    </template>
  </CreateEditDialog>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {useStore} from 'vuex';
import CreateEditDialog from '@/components/dialog/CreateEditDialog.vue';
import SpiderForm from '@/components/spider/SpiderForm.vue';
import useSpider from '@/components/spider/spider';

export default defineComponent({
  name: 'CreateSpiderDialog',
  components: {
    SpiderForm,
    CreateEditDialog,
  },
  setup() {
    // tab name
    const tabName = ref<string>('single');

    // store
    const store = useStore();

    // methods
    const {
      activeDialogKey,
      createEditDialogVisible,
      onConfirm,
      onClose,
    } = useSpider(store);

    return {
      tabName,
      activeDialogKey,
      createEditDialogVisible,
      onConfirm,
      onClose,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
