<template>
  <ListLayout
      :nav-actions="navActions"
      :action-functions="actionFunctions"
      :pagination="tablePagination"
      :table-columns="tableColumns"
      :table-data="tableData"
      :table-total="tableTotal"
      :table-actions-prefix="tableActionsPrefix"
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
import CreateSpiderDialog from '@/components/spider/CreateSpiderDialog.vue';
import ListLayout from '@/layouts/ListLayout.vue';
import useSpiderList from '@/views/spider/list/spiderList';

export default defineComponent({
  name: 'SpiderList',
  components: {
    ListLayout,
    CreateSpiderDialog,
  },
  setup() {
    const {
      navActions,
      tableColumns,
      tableData,
      tableTotal,
      tablePagination,
      actionFunctions,
      tableActionsPrefix,
    } = useSpiderList();

    return {
      navActions,
      tableColumns,
      tableData,
      tableTotal,
      tablePagination,
      actionFunctions,
      tableActionsPrefix,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../../../styles/variables.scss";

.spider-list {
  .nav-actions {
    border-bottom: none;
  }

  .content {
    background-color: $containerWhiteBg;
  }
}
</style>
