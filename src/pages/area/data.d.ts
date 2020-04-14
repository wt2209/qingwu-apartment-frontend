export interface AreaListItem {
  id: number;
  title: string;
  description?: string;
  deleted_at?: Date;
  updated_at?: Date;
  created_at?: Date;
}

export interface AreaListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface AreaListData {
  list: AreaListItem[];
  pagination: Partial<AreaListPagination>;
}

export interface AreaListParams {
  sorter?: string;
  status?: string;
  title?: string;
  description?: string;
  id?: number;
  pageSize?: number;
  current?: number;
}
