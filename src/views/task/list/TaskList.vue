<template>
  <ListLayout
      :action-functions="actionFunctions"
      :nav-actions="navActions"
      :pagination="tablePagination"
      :table-columns="tableColumns"
      :table-data="tableData"
      :table-total="tableTotal"
      class="task-list"
  >
    <template #extra>
      <!-- Dialogs (handled by store) -->
      <CreateTaskDialog/>
      <!-- ./Dialogs -->
    </template>
  </ListLayout>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import ListLayout from '@/layouts/ListLayout.vue';
import useTaskList from '@/views/task/list/taskList';
import CreateTaskDialog from '@/components/task/CreateTaskDialog.vue';

export default defineComponent({
  name: 'TaskList',
  components: {
    ListLayout,
    CreateTaskDialog,
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
