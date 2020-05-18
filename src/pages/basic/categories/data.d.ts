export interface CategoryListItem {
  id: number;
  title: string;
  type: 'person' | 'company' | 'functional';
  utility_type: string;
  remark: string;
  updated_at: Date | null;
  created_at: Date | null;
  deleted_at: Date | null;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  sorter?: string;
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  current?: number;
}
