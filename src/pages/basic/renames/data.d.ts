import { RecordListItem } from "../records/data";

export interface RenewListItem {
  id: number;
  record: RecordListItem;
  old_rent_end: Date;
  new_rent_end: Date;
  renewed_at: Date;
  created_at?: Date;
  updated_at: Date;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: RenewListItem[];
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
