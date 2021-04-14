<template>
  <ListLayout
      :action-functions="actionFunctions"
      :nav-actions="navActions"
      :pagination="tablePagination"
      :table-actions-prefix="tableActionsPrefix"
      :table-columns="tableColumns"
      :table-data="tableData"
      :table-total="tableTotal"
      class="spider-list"
  >
    <template #extra>
      <!-- Dialogs (handled by store) -->
      <CreateSpiderDialog/>
      <!-- ./Dialogs -->
    </template>
  </ListLayout>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import ListLayout from '@/layouts/ListLayout.vue';
import useTaskList from '@/views/task/list/taskList';

export default defineComponent({
  name: 'TaskList',
  components: {
    ListLayout,
  },
  setup(props, {emit}) {
    return {
      ...useTaskList(),
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
