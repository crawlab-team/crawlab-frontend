<template>
  <CreateDialog
      v-model="dialogVisible.create"
  >
    <template #single>
    </template>
  </CreateDialog>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import CreateDialog from '@/components/dialog/CreateDialog.vue';
import {useStore} from 'vuex';

export default defineComponent({
  name: 'CreateProjectDialog',
  components: {CreateDialog},
  setup(props, {emit}) {
    // store
    const storeNamespace = 'project';
    const store = useStore();
    const {project: state} = store.state as RootStoreState;
    const {dialogVisible} = state;

    return {
      dialogVisible,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
