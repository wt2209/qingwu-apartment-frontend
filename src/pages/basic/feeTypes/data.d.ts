export interface FeeTypeListItem {
  id: number;
  title: string;
  turn_in: boolean;
  rate: number;
  remark: string;
  created_at: Date | null;
  updated_at: Date | null;
  deleted_at: Date | null;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: FeeTypeListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  sorter?: string;
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
}
