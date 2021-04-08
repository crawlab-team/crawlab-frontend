<template>
  <CreateDialog
      v-model="dialogVisible.create"
      :confirm-loading="confirmLoading"
      @confirm="onConfirm"
  >
    <template #single>
      <SpiderForm is-create/>
    </template>
  </CreateDialog>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {useStore} from 'vuex';
import CreateDialog from '@/components/dialog/CreateEditDialog.vue';
import SpiderForm from '@/components/spider/SpiderForm.vue';
import useSpider from '@/components/spider/spider';

export default defineComponent({
  name: 'CreateSpiderDialog',
  components: {
    SpiderForm,
    CreateDialog,
  },
  setup() {
    // tab name
    const tabName = ref<string>('single');

    // store
    const storeNamespace = 'spider';
    const store = useStore();
    const {commit} = store;
    const {dialogVisible} = store.state.spider as SpiderStoreState;

    // methods
    const {
      confirmLoading,
      onConfirm,
    } = useSpider(store);

    const close = () => {
      commit(`${storeNamespace}/hideDialog`, 'create');
    };

    const onClose = () => {
      close();
    };

    return {
      tabName,
      dialogVisible,
      onClose,
      confirmLoading,
      onConfirm,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
