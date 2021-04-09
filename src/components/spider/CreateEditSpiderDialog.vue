<template>
  <CreateEditDialog
      :type="activeDialogKey"
      :visible="createEditDialogVisible"
      :confirm-disabled="confirmDisabled"
      :confirm-loading="confirmLoading"
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
    CreateEditDialog,
    SpiderForm,
  },
  setup() {
    // store
    const store = useStore();

    // tab name
    const tabName = ref<string>('single');

    return {
      ...useSpider(store),
      tabName,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
