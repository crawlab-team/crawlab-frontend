interface CNode {
  _id?: string;
  name?: string;
  ip?: string;
  mac?: string;
  hostname?: string;
  description?: string;
  key?: string;
  is_master?: boolean;
  enabled?: boolean;
  active?: boolean;
}

export type Node = CNode;

declare global {
  type Node = CNode;
}
