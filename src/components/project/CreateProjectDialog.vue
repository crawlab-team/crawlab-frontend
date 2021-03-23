<template>
  <CreateDialog
      v-model="dialogVisible.create"
      title="Create Project"
      @confirm="onConfirm"
  >
    <template #single>
      <ProjectForm is-create/>
    </template>
  </CreateDialog>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import CreateDialog from '@/components/dialog/CreateDialog.vue';
import {useStore} from 'vuex';
import ProjectForm from '@/components/project/ProjectForm.vue';
import useProject from '@/components/project/project';
import useProjectService from '@/services/project/projectService';

export default defineComponent({
  name: 'CreateProjectDialog',
  components: {
    CreateDialog,
    ProjectForm,
  },
  setup() {
    // store
    const storeNamespace = 'project';
    const store = useStore();
    const {project: state} = store.state as RootStoreState;
    const {dialogVisible} = state;

    // methods
    const {
      projectForm,
      validateProjectForm,
    } = useProject(store);

    // services
    const {} = useProjectService(store);

    // confirm
    const onConfirm = async () => {
      let valid = false;
      try {
        valid = await validateProjectForm();
      } catch (ex) {
        console.error(ex);
        return;
      }
      if (valid) {
        store.commit(`${storeNamespace}/hideDialog`, 'create');
      }
    };

    return {
      dialogVisible,
      onConfirm,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
