export interface PersonListItem {
  id: number;
  name: string;
  gender?: '男' | '女';
  education?: string;
  serial?: string;
  identify?: string;
  phone?: string;
  department?: string;
  hired_at?: Date;
  contract_start: Date;
  contract_end: Date | string;
  remark?: string;
  created_at?: Date;
  updated_at: Date;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: PersonListItem[];
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
