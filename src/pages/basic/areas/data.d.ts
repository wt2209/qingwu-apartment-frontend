export interface AreaListItem {
  id: string;
  title: string;
  description?: string;
  deleted_at?: Date;
  updated_at?: Date;
  created_at?: Date;
}

export interface AreaListParams {
  sorter?: string;
  status?: string;
  title?: string;
  description?: string;
  id?: string;
  pageSize?: number;
  current?: number;
  export?: number;
}
