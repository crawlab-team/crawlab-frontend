// interface SpiderListProps {
//   // nothing
// }

interface Spider {
  _id?: string;
  name?: string;
  display_name?: string;
}

type SpiderTabName = 'overview' | 'files' | 'tasks' | 'settings';

interface SpiderDialogVisible {
  create: boolean;
  clone: boolean;
  edit: boolean;
  run: boolean;
}

type SpiderDialogKey = DialogKey | 'run';
