<template>
  <ListLayout
      :nav-actions="navActions"
      :table-columns="tableColumns"
      :table-data="tableData"
      :table-total="tableTotal"
      :action-functions="actionFunctions"
      :pagination="paginationData"
      class="project-list"
      @select="onSelect"
      @pagination-change="onPaginationChange"
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
      tableColumns,
      tableTotal,
      paginationData,
      actionFunctions,
      onSelect,
      onPaginationChange,
    } = useProjectList();

    return {
      navActions,
      tableData,
      tableTotal,
      tableColumns,
      paginationData,
      actionFunctions,
      onSelect,
      onPaginationChange,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
