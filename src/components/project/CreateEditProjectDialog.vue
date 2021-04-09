<template>
  <CreateEditDialog
      :type="activeDialogKey"
      :visible="createEditDialogVisible"
      @confirm="onConfirm"
      @close="onClose"
  >
    <template #default>
      <ProjectForm/>
    </template>
  </CreateEditDialog>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import CreateEditDialog from '@/components/dialog/CreateEditDialog.vue';
import {useStore} from 'vuex';
import ProjectForm from '@/components/project/ProjectForm.vue';
import useProject from '@/components/project/project';

export default defineComponent({
  name: 'CreateEditProjectDialog',
  components: {
    CreateEditDialog,
    ProjectForm,
  },
  setup() {
    // store
    const store = useStore();

    // methods
    const {
      activeDialogKey,
      createEditDialogVisible,
      onConfirm,
      onClose,
    } = useProject(store);

    return {
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
