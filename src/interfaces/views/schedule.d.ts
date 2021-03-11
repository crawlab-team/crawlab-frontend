interface Schedule {
  _id?: string;
  name?: string;
  description?: string;
  spider_id?: string;
  spider_name?: string;
  cron?: string;
  param?: string;
  mode?: TaskMode;
  node_ids?: string[];
  node_names?: string[];
  enabled?: boolean;
}
