<template>
  <ListLayout
      :nav-actions="navActions"
      :table-actions-prefix="tableActionsPrefix"
      :table-columns="tableColumns"
      :table-data="tableData"
      :table-total="tableTotal"
      class="spider-list"
      @select="onSelect"
  >
    <template #extra>
      <!-- Dialogs (handled by store) -->
      <CreateSpiderDialog/>
      <!-- ./Dialogs -->
    </template>
  </ListLayout>
</template>

<script lang="ts">
import {defineComponent, onMounted} from 'vue';
import CreateSpiderDialog from '@/components/spider/CreateSpiderDialog.vue';
import {
  TASK_STATUS_ABNORMAL,
  TASK_STATUS_CANCELLED,
  TASK_STATUS_ERROR,
  TASK_STATUS_FINISHED,
  TASK_STATUS_PENDING,
  TASK_STATUS_RUNNING
} from '@/constants/task';
import {SPIDER_TYPE_CONFIGURABLE, SPIDER_TYPE_CUSTOMIZED} from '@/constants/spider';
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
      tableActionsPrefix,
      selection,
      onSelect,
      onClickRun
    } = useSpiderList();

    // TODO: dummy data
    const projectNames = ['Project 1', 'Project 2', 'Project 3'];
    const spiderTypes = [
      SPIDER_TYPE_CUSTOMIZED,
      SPIDER_TYPE_CONFIGURABLE,
    ];
    const statuses = [
      TASK_STATUS_PENDING,
      TASK_STATUS_RUNNING,
      TASK_STATUS_FINISHED,
      TASK_STATUS_ERROR,
      TASK_STATUS_CANCELLED,
      TASK_STATUS_ABNORMAL,
    ];

    onMounted(() => {
      // TODO: dummy data
      tableData.value = (() => {
        const data: Spider[] = [];
        for (let i = 0; i < 10; i++) {
          const _id = (i + 1).toString();
          const name = `spider-${_id}`;
          const display_name = `Spider ${_id}`;
          const spider_type = spiderTypes[Math.floor(Math.random() * spiderTypes.length)];
          const project_name = projectNames[Math.floor(Math.random() * projectNames.length)];
          const last_status = statuses[Math.floor(Math.random() * statuses.length)];
          const last_run_ts = '10s';
          const update_ts = '3/11/2021, 10:20:29 PM';
          const create_ts = '3/11/2021, 10:20:29 PM';
          const create_username = 'admin';
          data.push({
            _id,
            name,
            display_name,
            spider_type,
            project_name,
            last_status,
            last_run_ts,
            update_ts,
            create_ts,
            create_username,
          });
        }
        return data;
      })();
    });
    return {
      navActions,
      tableColumns,
      tableData,
      tableTotal,
      tableActionsPrefix,
      selection,
      onSelect,
      onClickRun,
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
