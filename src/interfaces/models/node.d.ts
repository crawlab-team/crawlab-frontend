interface CNode extends BaseModel {
  name?: string;
  ip?: string;
  mac?: string;
  hostname?: string;
  description?: string;
  key?: string;
  is_master?: boolean;
  enabled?: boolean;
  active?: boolean;
  tags?: string[];
}
