<template>
  <Dialog
      :visible="dialogVisible.create"
      title="Create Spider"
      width="960px"
      @close="onClose"
      @confirm="onConfirm"
  >
    <el-tabs v-model="tabName">
      <el-tab-pane label="Single" name="single">
        <CreateSpiderDialogContentSingle/>
      </el-tab-pane>
      <el-tab-pane label="Batch" name="batch">
        <CreateSpiderDialogContentBatch/>
      </el-tab-pane>
    </el-tabs>
  </Dialog>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import Dialog from '@/components/dialog/Dialog.vue';
import {useStore} from 'vuex';
import CreateSpiderDialogContentSingle from '@/components/spider/CreateSpiderDialogContentSingle.vue';
import CreateSpiderDialogContentBatch from '@/components/spider/CreateSpiderDialogContentBatch.vue';

export default defineComponent({
  name: 'CreateSpiderDialog',
  components: {
    CreateSpiderDialogContentSingle,
    CreateSpiderDialogContentBatch,
    Dialog,
  },
  emits: [
    'close',
  ],
  setup() {
    const tabName = ref<string>('single');

    const storeNamespace = 'spider';
    const store = useStore();
    const {commit} = store;
    const {dialogVisible} = store.state.spider as SpiderStoreState;

    const close = () => {
      commit(`${storeNamespace}/hideDialog`, 'create');
    };

    const onClose = () => {
      close();
    };

    const onConfirm = () => {
      // TODO: implement
      close();
    };

    return {
      tabName,
      dialogVisible,
      onClose,
      onConfirm,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
