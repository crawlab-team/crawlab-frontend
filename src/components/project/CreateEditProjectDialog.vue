<template>
  <CreateEditDialog
      :type="isCreate ? 'create' : 'edit'"
      :visible="activeDialogKey === 'createEdit'"
      @confirm="onConfirm"
      @close="onClose"
  >
    <template #single>
      <ProjectForm :is-create="isCreate"/>
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
  props: {
    isCreate: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    // store
    const store = useStore();
    const {project: state} = store.state as RootStoreState;

    const {
      activeDialogKey,
    } = state;

    // methods
    const {
      onConfirm,
    } = useProject(store);

    return {
      activeDialogKey,
      onConfirm,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
