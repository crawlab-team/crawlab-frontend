<template>
  <el-tooltip :content="tooltip">
    <el-tag :type="type" class="task-status" size="mini">
      <font-awesome-icon :class="spinning ? 'fa-spin' : ''" :icon="icon" class="icon"/>
      <span>{{ label }}</span>
    </el-tag>
  </el-tooltip>
</template>

<script lang="ts">
import {computed, defineComponent, PropType} from 'vue';
import {
  TASK_STATUS_ABNORMAL,
  TASK_STATUS_CANCELLED,
  TASK_STATUS_ERROR,
  TASK_STATUS_FINISHED,
  TASK_STATUS_PENDING,
  TASK_STATUS_RUNNING
} from '@/constants/task';

export default defineComponent({
  name: 'TaskStatus',
  props: {
    status: {
      type: String as PropType<TaskStatus>,
      required: false,
    }
  },
  setup(props: TaskStatusProps, {emit}) {
    const type = computed<string>(() => {
      const {status} = props;
      switch (status) {
        case TASK_STATUS_PENDING:
          return 'primary';
        case TASK_STATUS_RUNNING:
          return 'warning';
        case TASK_STATUS_FINISHED:
          return 'success';
        case TASK_STATUS_ERROR:
          return 'danger';
        case TASK_STATUS_CANCELLED:
          return 'info';
        case TASK_STATUS_ABNORMAL:
          return 'danger';
        default:
          return 'info';
      }
    });

    const label = computed<string>(() => {
      const {status} = props;
      switch (status) {
        case TASK_STATUS_PENDING:
          return 'Pending';
        case TASK_STATUS_RUNNING:
          return 'Running';
        case TASK_STATUS_FINISHED:
          return 'Finished';
        case TASK_STATUS_ERROR:
          return 'Error';
        case TASK_STATUS_CANCELLED:
          return 'Cancelled';
        case TASK_STATUS_ABNORMAL:
          return 'Abnormal';
        default:
          return 'Unknown';
      }
    });

    const icon = computed<string[]>(() => {
      const {status} = props;
      switch (status) {
        case TASK_STATUS_PENDING:
          return ['fa', 'hourglass-start'];
        case TASK_STATUS_RUNNING:
          return ['fa', 'spinner'];
        case TASK_STATUS_FINISHED:
          return ['fa', 'check'];
        case TASK_STATUS_ERROR:
          return ['fa', 'times'];
        case TASK_STATUS_CANCELLED:
          return ['fa', 'ban'];
        case TASK_STATUS_ABNORMAL:
          return ['fa', 'exclamation'];
        default:
          return ['fa', 'question'];
      }
    });

    const tooltip = computed<string>(() => {
      const {status} = props;
      switch (status) {
        case TASK_STATUS_PENDING:
          return 'Task is pending in the queue';
        case TASK_STATUS_RUNNING:
          return 'Task is currently running';
        case TASK_STATUS_FINISHED:
          return 'Task finished successfully';
        case TASK_STATUS_ERROR:
          return 'Task ended with an error';
        case TASK_STATUS_CANCELLED:
          return 'Task has been cancelled';
        case TASK_STATUS_ABNORMAL:
          return 'Task ended abnormally';
        default:
          return 'Unknown task status';
      }
    });

    const spinning = computed<boolean>(() => {
      const {status} = props;
      return status === TASK_STATUS_RUNNING;
    });

    return {
      type,
      label,
      icon,
      tooltip,
      spinning,
    };
  },
});
</script>

<style lang="scss" scoped>
.task-status {
  width: 80px;
  cursor: default;

  .icon {
    width: 10px;
    margin-right: 5px;
  }
}
</style>
