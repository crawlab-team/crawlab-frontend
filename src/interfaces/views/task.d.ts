import {
  TASK_MODE_ALL,
  TASK_MODE_RANDOM,
  TASK_MODE_SELECTED_NODE_TAGS,
  TASK_MODE_SELECTED_NODES,
  TASK_STATUS_ABNORMAL,
  TASK_STATUS_CANCELLED,
  TASK_STATUS_ERROR,
  TASK_STATUS_FINISHED,
  TASK_STATUS_PENDING,
  TASK_STATUS_RUNNING,
} from '@/constants/task';

declare global {
  interface Task {
    _id?: string;
    spider_id?: string;
    spider_name?: string;
    status?: TaskStatus;
    node_id?: string;
    node_name?: string;
    pid?: number;
    schedule_id?: string;
    schedule_name?: string;
    type?: string;
    mode?: TaskMode;
    parent_id?: string;
    cmd?: string;
    param?: string;
    error?: string;
    stats?: TaskStats;
  }

  type TaskStatus =
    TASK_STATUS_PENDING
    | TASK_STATUS_RUNNING
    | TASK_STATUS_FINISHED
    | TASK_STATUS_ERROR
    | TASK_STATUS_CANCELLED
    | TASK_STATUS_ABNORMAL;

  interface TaskStats {
    result_count?: number;
    error_log_count?: number;
    wait_duration?: number;
    runtime_duration?: number;
    total_duration?: number;
  }

  type TaskMode =
    TASK_MODE_RANDOM
    | TASK_MODE_ALL
    | TASK_MODE_SELECTED_NODES
    | TASK_MODE_SELECTED_NODE_TAGS;
}
