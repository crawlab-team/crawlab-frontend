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
import {defineComponent, ref} from 'vue';
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

    // loading status of confirm button
    const confirmLoading = ref<boolean>(false);

    // methods
    const {
      projectForm,
      validateProjectForm,
      dispatchGetProjectList,
    } = useProject(store);

    // services
    const {
      createProject,
    } = useProjectService(store);

    // confirm
    const onConfirm = async () => {
      // validate
      let valid = false;
      try {
        valid = await validateProjectForm();
      } catch (ex) {
        console.error(ex);
        return;
      }
      if (!projectForm.value) {
        console.error(new Error('project form is undefined'));
        return;
      }

      // start loading
      confirmLoading.value = true;

      // request
      const res = await createProject(projectForm.value);

      // stop loading
      confirmLoading.value = false;

      // hide
      if (valid) {
        store.commit(`${storeNamespace}/hideDialog`, 'create');
      }

      // request list
      await dispatchGetProjectList();
    };

    return {
      dialogVisible,
      confirmLoading,
      onConfirm,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
