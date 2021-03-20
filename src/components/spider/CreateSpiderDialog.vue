<template>
  <CreateDialog v-model="dialogVisible.create">
    <template #single>
      <SpiderForm is-create/>
    </template>
  </CreateDialog>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {useStore} from 'vuex';
import CreateDialog from '@/components/dialog/CreateDialog.vue';
import SpiderForm from '@/components/spider/SpiderForm.vue';

export default defineComponent({
  name: 'CreateSpiderDialog',
  components: {
    SpiderForm,
    CreateDialog,
  },
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
