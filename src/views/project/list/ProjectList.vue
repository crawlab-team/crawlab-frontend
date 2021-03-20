<template>
  <ListLayout
      :nav-actions="navActions"
      :table-columns="tableColumns"
      :table-data="tableData"
      :table-total="tableTotal"
      class="project-list"
      @select="onSelect"
  >
    <template #extra>
      <!-- Dialogs (handled by store) -->
      <CreateProjectDialog/>
      <!-- ./Dialogs -->
    </template>
  </ListLayout>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import ListLayout from '@/layouts/ListLayout.vue';
import useProjectList from './projectList';
import CreateProjectDialog from '@/components/project/CreateProjectDialog.vue';

export default defineComponent({
  name: 'ProjectList',
  components: {
    ListLayout,
    CreateProjectDialog,
  },
  setup() {
    const {
      navActions,
      tableData,
      tableTotal,
      tableColumns,
      onSelect,
    } = useProjectList();

    return {
      navActions,
      tableData,
      tableTotal,
      tableColumns,
      onSelect,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
