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

export default defineComponent({
  name: 'CreateProjectDialog',
  components: {
    CreateDialog,
    ProjectForm,
  },
  setup() {
    // store
    const store = useStore();
    const {project: state} = store.state as RootStoreState;
    const {dialogVisible} = state;

    // methods
    const {
      onConfirm,
    } = useProject(store);

    return {
      dialogVisible,
      onConfirm,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
