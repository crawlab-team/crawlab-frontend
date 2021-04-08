<template>
  <CreateEditDialog
      :type="activeDialogKey"
      :visible="createEditDialogVisible"
      @confirm="onConfirm"
      @close="onClose"
  >
    <template #single>
      <SpiderForm :is-create="isCreate"/>
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
    const {spider: state} = store.state as RootStoreState;

    const {
      activeDialogKey,
    } = state;

    // methods
    const {
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
