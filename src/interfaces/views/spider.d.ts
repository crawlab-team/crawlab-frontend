// interface SpiderListProps {
//   // nothing
// }

interface Spider {
  _id?: string;
  name?: string;
  display_name?: string;
  spider_type?: string;
  project_name?: string;
  last_status?: string;
  last_run_ts?: string;
  update_ts?: string;
  create_ts?: string;
  create_username?: string;
  remark?: string;
}

type SpiderTabName = 'overview' | 'files' | 'tasks' | 'settings';

interface SpiderDialogVisible {
  create: boolean;
  clone: boolean;
  edit: boolean;
  run: boolean;
}

type SpiderDialogKey = DialogKey | 'run';
