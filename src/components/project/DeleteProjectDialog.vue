<template>
  <Dialog
      :visible="dialogVisible.delete"
      @confirm="onConfirm"
  >
  </Dialog>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import Dialog from '@/components/dialog/Dialog.vue';
import {useStore} from 'vuex';
import useProject from '@/components/project/project';

export default defineComponent({
  name: 'DeleteProjectDialog',
  components: {Dialog},
  props: {
    model: {
      type: Object as PropType<Project>,
    }
  },
  setup(props, {emit}) {
    // store
    const storeNamespace = 'project';
    const store = useStore();
    const {project: state} = store.state as RootStoreState;
    const {dialogVisible} = state;

    // project
    const {
      deleteProject,
    } = useProject(store);

    const onConfirm = async () => {
      await deleteProject();
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
